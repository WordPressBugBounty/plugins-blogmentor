/**
 * Pricing Table Block
 *
 * @package BlocksKit
 */

import './editor.scss';
import './style.scss';
import icons from '../../icons/icons';

const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const {
	InspectorControls,
	RichText,
	URLInput,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-pricing-block', {
	title:       __( 'Pricing Table', 'blocks-kit' ),
	icon:        icons.pricetableIcon,
	description: __( 'Showcase a Pricing Table or Service Plans.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'pricing', 'blocks-kit' ), __( 'comparison', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		url:  { type: 'string', source: 'attribute', selector: '.bk-pricing-box-column-one a',   attribute: 'href' },
		url2: { type: 'string', source: 'attribute', selector: '.bk-pricing-box-column-two a',   attribute: 'href' },
		url3: { type: 'string', source: 'attribute', selector: '.bk-pricing-box-column-three a', attribute: 'href' },

		pricingBoxTitle:  { type: 'string', source: 'html', selector: '.bk-pricing-box-column-one h3' },
		pricingBoxTitle2: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-two h3' },
		pricingBoxTitle3: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-three h3' },

		price:  { type: 'string', source: 'html', selector: '.bk-pricing-box-column-one .bk-pricing-box-pricing' },
		price2: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-two .bk-pricing-box-pricing' },
		price3: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-three .bk-pricing-box-pricing' },

		perMonthLabel:  { type: 'string', source: 'html', selector: '.bk-pricing-box-column-one .bk-pricing-box-per-month-label' },
		perMonthLabel2: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-two .bk-pricing-box-per-month-label' },
		perMonthLabel3: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-three .bk-pricing-box-per-month-label' },

		buttonText:  { type: 'string', source: 'html', selector: '.bk-pricing-box-column-one a' },
		buttonText2: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-two a' },
		buttonText3: { type: 'string', source: 'html', selector: '.bk-pricing-box-column-three a' },

		features:      { type: 'string', source: 'html', selector: '.bk-pricing-box-feature-list-one', default: '' },
		featurestwo:   { type: 'string', source: 'html', selector: '.bk-pricing-box-feature-list-two', default: '' },
		featuresthree: { type: 'string', source: 'html', selector: '.bk-pricing-box-feature-list-three', default: '' },

		pricingBoxColor: { type: 'string' },
		buttonColor:     { type: 'string', default: '#3c48d5' },
		buttonTextColor: { type: 'string', default: '#fff' },
		columns:         { type: 'string', default: '2' },
		size:            { type: 'string', default: 'normal' },
		hedbgclr:        { type: 'string', default: '#ddf1ff' },
		cornerButtonRadius: { type: 'number', default: 25 },
		buttonTarget:    { type: 'boolean', default: false },
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const {
			url, url2, url3, pricingBoxTitle, pricingBoxTitle2, pricingBoxTitle3,
			price, price2, price3, buttonTarget, features, featurestwo, featuresthree,
			hedbgclr, perMonthLabel, perMonthLabel2, perMonthLabel3,
			buttonText, buttonText2, buttonText3, pricingBoxColor,
			buttonColor, buttonTextColor, columns, size, cornerButtonRadius,
		} = attributes;

		const columnOptions = [
			{ value: '1', label: __( 'One Column', 'blocks-kit' ) },
			{ value: '2', label: __( 'Two Column', 'blocks-kit' ) },
			{ value: '3', label: __( 'Three Column', 'blocks-kit' ) },
		];

		const richTextHead = ( valueKey, placeholder ) => (
			<RichText
				tagName="h3"
				value={ attributes[ valueKey ] }
				placeholder={ __( placeholder, 'blocks-kit' ) }
				onChange={ ( val ) => setAttributes( { [ valueKey ]: val } ) }
				style={ { color: pricingBoxColor } }
			/>
		);

		const richTextField = ( valueKey, className, placeholder, tagName = 'p' ) => (
			<RichText
				tagName={ tagName }
				value={ attributes[ valueKey ] }
				placeholder={ __( placeholder, 'blocks-kit' ) }
				className={ className }
				onChange={ ( val ) => setAttributes( { [ valueKey ]: val } ) }
				style={ { color: pricingBoxColor } }
			/>
		);

		const urlField = ( urlKey ) => isSelected && (
			<URLInput
				value={ attributes[ urlKey ] }
				onChange={ ( val ) => setAttributes( { [ urlKey ]: val } ) }
			/>
		);

		const pricingColumn = ( col ) => {
			const keys = {
				1: { title: 'pricingBoxTitle', price: 'price', label: 'perMonthLabel', btn: 'buttonText', features: 'features', url: 'url', placeholder: { title: 'Basic', price: '$29' } },
				2: { title: 'pricingBoxTitle2', price: 'price2', label: 'perMonthLabel2', btn: 'buttonText2', features: 'featurestwo', url: 'url2', placeholder: { title: 'Standard', price: '$49' } },
				3: { title: 'pricingBoxTitle3', price: 'price3', label: 'perMonthLabel3', btn: 'buttonText3', features: 'featuresthree', url: 'url3', placeholder: { title: 'Ultimate', price: '$69' } },
			};
			const k = keys[ col ];
			const colClass = [ 'one', 'two', 'three' ][ col - 1 ];

			return (
				<div className={ `box-item bk-pricing-box-column-${ colClass }` } style={ { backgroundColor: hedbgclr } }>
					<div className="box-head">
						{ richTextHead( k.title, k.placeholder.title ) }
						{ richTextField( k.price, 'bk-pricing-box-pricing', k.placeholder.price ) }
						{ richTextField( k.label, 'bk-pricing-box-per-month-label', 'PER MONTH' ) }
					</div>
					<div className="features-list-item">
						<RichText
							tagName="ul"
							multiline="li"
							placeholder={ __( 'Add features', 'blocks-kit' ) }
							value={ attributes[ k.features ] }
							className={ `bk-pricing-box-feature-list-${ colClass }` }
							onChange={ ( val ) => setAttributes( { [ k.features ]: val } ) }
							style={ { color: pricingBoxColor } }
						/>
					</div>
					<div className="box-button">
						<span className="wp-block-button">
							<RichText
								tagName="div"
								value={ attributes[ k.btn ] }
								placeholder={ __( 'Buy Now', 'blocks-kit' ) }
								onChange={ ( val ) => setAttributes( { [ k.btn ]: val } ) }
								className={ `wp-bk-button bk-button-${ size }` }
								style={ { backgroundColor: buttonColor, color: buttonTextColor, borderRadius: cornerButtonRadius + 'px' } }
							/>
						</span>
						<div>{ urlField( k.url ) }</div>
					</div>
				</div>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<SelectControl
							label={ __( 'Column Number', 'blocks-kit' ) }
							value={ columns }
							options={ columnOptions }
							onChange={ ( val ) => setAttributes( { columns: val } ) }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ __( 'Color Settings', 'blocks-kit' ) }>
						<p><strong>{ __( 'Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ hedbgclr } onChange={ ( val ) => setAttributes( { hedbgclr: val } ) } />
						<p><strong>{ __( 'Content Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ pricingBoxColor } onChange={ ( val ) => setAttributes( { pricingBoxColor: val } ) } />
						<p><strong>{ __( 'Button Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ buttonColor } onChange={ ( val ) => setAttributes( { buttonColor: val } ) } />
						<p><strong>{ __( 'Button Text Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette value={ buttonTextColor } onChange={ ( val ) => setAttributes( { buttonTextColor: val } ) } />
						<RangeControl
							label={ __( 'Border Radius', 'blocks-kit' ) }
							value={ cornerButtonRadius }
							min={ 1 }
							max={ 50 }
							onChange={ ( val ) => setAttributes( { cornerButtonRadius: val } ) }
						/>
						<ToggleControl
							label={ __( 'Open link in new window', 'blocks-kit' ) }
							checked={ buttonTarget }
							onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ `bk-pricing-box column-${ columns }` }>
					{ pricingColumn( 1 ) }
					{ ( columns >= 2 ) && pricingColumn( 2 ) }
					{ ( columns >= 3 ) && pricingColumn( 3 ) }
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			url, url2, url3, pricingBoxTitle, pricingBoxTitle2, pricingBoxTitle3,
			price, price2, price3, features, featurestwo, featuresthree, hedbgclr,
			perMonthLabel, perMonthLabel2, perMonthLabel3,
			buttonText, buttonText2, buttonText3, pricingBoxColor,
			buttonColor, buttonTarget, buttonTextColor, columns, size, cornerButtonRadius,
		} = attributes;

		const btnStyle = { backgroundColor: buttonColor, color: buttonTextColor, borderRadius: cornerButtonRadius + 'px' };

		const pricingColumnSave = ( title, price, label, featureList, btnText, href, colClass, featureListClass ) => (
			<div className={ `box-item bk-pricing-box-column-${ colClass }` } style={ { backgroundColor: hedbgclr } }>
				<div className="box-head">
					<h3 style={ { color: pricingBoxColor } }>{ title }</h3>
					<p className="bk-pricing-box-pricing" style={ { color: pricingBoxColor } }>{ price }</p>
					<p className="bk-pricing-box-per-month-label" style={ { color: pricingBoxColor } }>{ label }</p>
				</div>
				<div className="features-list-item">
					<RichText.Content tagName="ul" className={ featureListClass } style={ { color: pricingBoxColor } } value={ featureList } />
				</div>
				<div className="bk-box-btn">
					<a
						rel="noopener noreferrer"
						href={ href }
						className={ `wp-bk-button bk-button-${ size } box-button` }
						target={ buttonTarget ? '_blank' : '_self' }
						style={ btnStyle }
					>
						{ btnText }
					</a>
				</div>
			</div>
		);

		return (
			<div className={ `bk-pricing-box column-${ columns }` }>
				{ pricingColumnSave( pricingBoxTitle, price, perMonthLabel, features, buttonText, url, 'one', 'bk-pricing-box-feature-list-one' ) }
				{ ( columns >= 2 ) && pricingColumnSave( pricingBoxTitle2, price2, perMonthLabel2, featurestwo, buttonText2, url2, 'two', 'bk-pricing-box-feature-list-two' ) }
				{ ( columns >= 3 ) && pricingColumnSave( pricingBoxTitle3, price3, perMonthLabel3, featuresthree, buttonText3, url3, 'three', 'bk-pricing-box-feature-list-three' ) }
			</div>
		);
	},
} );
