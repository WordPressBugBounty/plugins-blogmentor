/**
 * Info Box Block
 *
 * @package BlocksKit
 */

import './style.scss';
import icons from './components/icons';

const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const {
	InspectorControls,
	AlignmentToolbar,
	RichText,
	MediaUpload,
} = wp.blockEditor;
const {
	SelectControl,
	PanelBody,
	Button,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-info-block', {
	title:       __( 'Info Box', 'blocks-kit' ),
	icon:        'info',
	description: __( 'Showcase your Products, Services or Features of the products.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'info', 'blocks-kit' ), __( 'feature', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		mediaURL:     { type: 'string', source: 'attribute', attribute: 'src', selector: '.bk-infobox-col-one .infobox-image' },
		mediaURLTwo:  { type: 'string', source: 'attribute', selector: '.bk-infobox-col-two .infobox-image', attribute: 'src' },
		mediaURLThree:{ type: 'string', source: 'attribute', selector: '.bk-infobox-col-three .infobox-image', attribute: 'src' },
		mediaURLFour: { type: 'string', source: 'attribute', selector: '.bk-infobox-col-four .infobox-image', attribute: 'src' },
		mediaURLFive: { type: 'string', source: 'attribute', selector: '.bk-infobox-col-five .infobox-image', attribute: 'src' },
		mediaURLSix:  { type: 'string', source: 'attribute', selector: '.bk-infobox-col-six .infobox-image', attribute: 'src' },
		mediaID:      { type: 'number' },
		mediaIDTwo:   { type: 'number' },
		mediaIDThree: { type: 'number' },
		mediaIDFour:  { type: 'number' },
		mediaIDFive:  { type: 'number' },
		mediaIDSix:   { type: 'number' },
		name:      { type: 'string', source: 'html', selector: '.bk-infobox-col-one h4' },
		nameTwo:   { type: 'string', source: 'html', selector: '.bk-infobox-col-two h4' },
		nameThree: { type: 'string', source: 'html', selector: '.bk-infobox-col-three h4' },
		nameFour:  { type: 'string', source: 'html', selector: '.bk-infobox-col-four h4' },
		nameFive:  { type: 'string', source: 'html', selector: '.bk-infobox-col-five h4' },
		nameSix:   { type: 'string', source: 'html', selector: '.bk-infobox-col-six h4' },
		desc:      { type: 'string', source: 'html', selector: '.bk-infobox-desc' },
		descTwo:   { type: 'string', source: 'html', selector: '.bk-infobox-descTwo' },
		descThree: { type: 'string', source: 'html', selector: '.bk-infobox-descThree' },
		descFour:  { type: 'string', source: 'html', selector: '.bk-infobox-descFour' },
		descFive:  { type: 'string', source: 'html', selector: '.bk-infobox-descFive' },
		descSix:   { type: 'string', source: 'html', selector: '.bk-infobox-descSix' },
		nameColor: { type: 'string' },
		descColor: { type: 'string' },
		columns: {
			type:    'string',
			default: '3',
		},
		alignment: {
			type:    'string',
			default: 'left',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			alignment, mediaID, mediaIDTwo, mediaIDThree, mediaIDFour, mediaIDFive, mediaIDSix,
			mediaURL, mediaURLTwo, mediaURLThree, mediaURLFour, mediaURLFive, mediaURLSix,
			desc, descTwo, descThree, descFour, descFive, descSix,
			name, nameTwo, nameThree, nameFour, nameFive, nameSix,
			nameColor, descColor, columns,
		} = attributes;

		const columnOptions = [
			{ value: '1', label: __( 'One Column', 'blocks-kit' ) },
			{ value: '2', label: __( 'Two Column', 'blocks-kit' ) },
			{ value: '3', label: __( 'Three Column', 'blocks-kit' ) },
			{ value: '4', label: __( 'Four Column', 'blocks-kit' ) },
			{ value: '5', label: __( 'Five Column', 'blocks-kit' ) },
			{ value: '6', label: __( 'Six Column', 'blocks-kit' ) },
		];

		const mediaUpload = ( mediaIDKey, mediaURLKey ) => (
			<MediaUpload
				onSelect={ ( media ) => setAttributes( { [ mediaIDKey ]: media.id, [ mediaURLKey ]: media.url } ) }
				allowedTypes={ [ 'image' ] }
				value={ attributes[ mediaIDKey ] }
				render={ ( { open } ) => (
					<Button onClick={ open }>
						{ ! attributes[ mediaIDKey ]
							? icons.upload
							: <img className="infobox-image" src={ attributes[ mediaURLKey ] } alt="avatar" />
						}
					</Button>
				) }
			/>
		);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'InfoBox Settings', 'blocks-kit' ) }>
						<h3>{ __( 'Text Alignment', 'blocks-kit' ) }</h3>
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( val ) => setAttributes( { alignment: val } ) }
						/>
						<SelectControl
							label={ __( 'Column Number', 'blocks-kit' ) }
							value={ columns }
							options={ columnOptions }
							onChange={ ( val ) => setAttributes( { columns: val } ) }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ __( 'Color Settings', 'blocks-kit' ) }>
						<p><strong>{ __( 'Title Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ nameColor }
							onChange={ ( val ) => setAttributes( { nameColor: val } ) }
						/>
						<p><strong>{ __( 'Description Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ descColor }
							onChange={ ( val ) => setAttributes( { descColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ `bk-infobox column-${ columns }` } style={ { textAlign: alignment } }>
					{ /* Column 1 - always visible */ }
					<div className="box-item bk-infobox-col-one">
						{ mediaUpload( 'mediaID', 'mediaURL' ) }
						<RichText tagName="h4" value={ name } onChange={ ( val ) => setAttributes( { name: val } ) } placeholder={ __( '1st Title', 'blocks-kit' ) } style={ { color: nameColor } } />
						<RichText tagName="p" value={ desc } className="bk-infobox-desc" onChange={ ( val ) => setAttributes( { desc: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
					</div>

					{ ( columns >= 2 ) && (
						<div className="box-item bk-infobox-col-two">
							{ mediaUpload( 'mediaIDTwo', 'mediaURLTwo' ) }
							<RichText tagName="h4" value={ nameTwo } onChange={ ( val ) => setAttributes( { nameTwo: val } ) } placeholder={ __( '2nd Title', 'blocks-kit' ) } style={ { color: nameColor } } />
							<RichText tagName="p" value={ descTwo } className="bk-infobox-descTwo" onChange={ ( val ) => setAttributes( { descTwo: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
						</div>
					) }

					{ ( columns >= 3 ) && (
						<div className="box-item bk-infobox-col-three">
							{ mediaUpload( 'mediaIDThree', 'mediaURLThree' ) }
							<RichText tagName="h4" value={ nameThree } onChange={ ( val ) => setAttributes( { nameThree: val } ) } placeholder={ __( '3rd Title', 'blocks-kit' ) } style={ { color: nameColor } } />
							<RichText tagName="p" value={ descThree } className="bk-infobox-descThree" onChange={ ( val ) => setAttributes( { descThree: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
						</div>
					) }

					{ ( columns >= 4 ) && (
						<div className="box-item bk-infobox-col-four">
							{ mediaUpload( 'mediaIDFour', 'mediaURLFour' ) }
							<RichText tagName="h4" value={ nameFour } onChange={ ( val ) => setAttributes( { nameFour: val } ) } placeholder={ __( '4th Title', 'blocks-kit' ) } style={ { color: nameColor } } />
							<RichText tagName="p" value={ descFour } className="bk-infobox-descFour" onChange={ ( val ) => setAttributes( { descFour: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
						</div>
					) }

					{ ( columns >= 5 ) && (
						<div className="box-item bk-infobox-col-five">
							{ mediaUpload( 'mediaIDFive', 'mediaURLFive' ) }
							<RichText tagName="h4" value={ nameFive } onChange={ ( val ) => setAttributes( { nameFive: val } ) } placeholder={ __( '5th Title', 'blocks-kit' ) } style={ { color: nameColor } } />
							<RichText tagName="p" value={ descFive } className="bk-infobox-descFive" onChange={ ( val ) => setAttributes( { descFive: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
						</div>
					) }

					{ ( columns >= 6 ) && (
						<div className="box-item bk-infobox-col-six">
							{ mediaUpload( 'mediaIDSix', 'mediaURLSix' ) }
							<RichText tagName="h4" value={ nameSix } onChange={ ( val ) => setAttributes( { nameSix: val } ) } placeholder={ __( '6th Title', 'blocks-kit' ) } style={ { color: nameColor } } />
							<RichText tagName="p" value={ descSix } className="bk-infobox-descSix" onChange={ ( val ) => setAttributes( { descSix: val } ) } placeholder={ __( 'Description...', 'blocks-kit' ) } style={ { color: descColor } } />
						</div>
					) }
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			alignment,
			mediaURL, mediaURLTwo, mediaURLThree, mediaURLFour, mediaURLFive, mediaURLSix,
			name, nameTwo, nameThree, nameFour, nameFive, nameSix,
			desc, descTwo, descThree, descFour, descFive, descSix,
			nameColor, descColor, columns,
		} = attributes;

		return (
			<div className={ `bk-infobox column-${ columns }` } style={ { textAlign: alignment } }>
				<div className="box-item bk-infobox-col-one">
					{ mediaURL && <img className="infobox-image" src={ mediaURL } alt="avatar" /> }
					{ name && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ name } /> }
					{ desc && <RichText.Content tagName="p" className="bk-infobox-desc" style={ { color: descColor } } value={ desc } /> }
				</div>

				{ ( columns >= 2 ) && (
					<div className="box-item bk-infobox-col-two">
						{ mediaURLTwo && <img className="infobox-image" src={ mediaURLTwo } alt="avatar" /> }
						{ nameTwo && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameTwo } /> }
						{ descTwo && <RichText.Content tagName="p" className="bk-infobox-descTwo" style={ { color: descColor } } value={ descTwo } /> }
					</div>
				) }

				{ ( columns >= 3 ) && (
					<div className="box-item bk-infobox-col-three">
						{ mediaURLThree && <img className="infobox-image" src={ mediaURLThree } alt="avatar" /> }
						{ nameThree && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameThree } /> }
						{ descThree && <RichText.Content tagName="p" className="bk-infobox-descThree" style={ { color: descColor } } value={ descThree } /> }
					</div>
				) }

				{ ( columns >= 4 ) && (
					<div className="box-item bk-infobox-col-four">
						{ mediaURLFour && <img className="infobox-image" src={ mediaURLFour } alt="avatar" /> }
						{ nameFour && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameFour } /> }
						{ descFour && <RichText.Content tagName="p" className="bk-infobox-descFour" style={ { color: descColor } } value={ descFour } /> }
					</div>
				) }

				{ ( columns >= 5 ) && (
					<div className="box-item bk-infobox-col-five">
						{ mediaURLFive && <img className="infobox-image" src={ mediaURLFive } alt="avatar" /> }
						{ nameFive && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameFive } /> }
						{ descFive && <RichText.Content tagName="p" className="bk-infobox-descFive" style={ { color: descColor } } value={ descFive } /> }
					</div>
				) }

				{ ( columns >= 6 ) && (
					<div className="box-item bk-infobox-col-six">
						{ mediaURLSix && <img className="infobox-image" src={ mediaURLSix } alt="avatar" /> }
						{ nameSix && <RichText.Content tagName="h4" style={ { color: nameColor } } value={ nameSix } /> }
						{ descSix && <RichText.Content tagName="p" className="bk-infobox-descSix" style={ { color: descColor } } value={ descSix } /> }
					</div>
				) }
			</div>
		);
	},
} );
