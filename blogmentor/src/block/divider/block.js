/**
 * Section Divider Block
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
	BlockControls,
	RichText,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-devider-block', {
	title:       __( 'Section Divider', 'blocks-kit' ),
	icon:        icons.Divider,
	description: __( 'Differentiate sections, decorate headings and much more in such beautiful way via horizontal line with text.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'divider', 'blocks-kit' ), __( 'separator', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		divborderpos: {
			type:    'string',
			default: 'bk-default',
		},
		divbordertype: {
			type:    'string',
			default: 'bk-solid',
		},
		divborderwidth: {
			type:    'number',
			default: 1,
		},
		body: {
			type:     'string',
			source:   'html',
			selector: 'h1,h2,h3,h4,h5,h6',
		},
		fsize: {
			type: 'number',
		},
		divborderColor: {
			type:    'string',
			default: '#000000',
		},
		fontColor: {
			type:    'string',
			default: '#000000',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			body, fsize, fontColor, divborderwidth,
			divbordertype, divborderpos, divborderColor,
		} = attributes;

		const divbordertypeOptions = [
			{ value: 'bk-default', label: __( 'Default', 'blocks-kit' ) },
			{ value: 'bk-left',    label: __( 'Left', 'blocks-kit' ) },
			{ value: 'bk-right',   label: __( 'Right', 'blocks-kit' ) },
		];

		const divborderOptions = [
			{ value: 'bk-dotted', label: __( 'Dotted', 'blocks-kit' ) },
			{ value: 'bk-solid',  label: __( 'Solid', 'blocks-kit' ) },
			{ value: 'bk-double', label: __( 'Double', 'blocks-kit' ) },
			{ value: 'bk-ridge',  label: __( 'Ridge', 'blocks-kit' ) },
		];

		return (
			<Fragment>
				<BlockControls />

				<InspectorControls>
					<PanelBody title={ __( 'Font Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p>{ __( 'Custom Font Size (px)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 5 }
							value={ fsize }
							onChange={ ( val ) => setAttributes( { fsize: val } ) }
						/>
						<p><strong>{ __( 'Font Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Border Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p>{ __( 'Border Width (px)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 10 }
							value={ divborderwidth }
							onChange={ ( val ) => setAttributes( { divborderwidth: val } ) }
						/>
						<SelectControl
							label={ __( 'Border Position', 'blocks-kit' ) }
							value={ divborderpos }
							options={ divbordertypeOptions }
							onChange={ ( val ) => setAttributes( { divborderpos: val } ) }
						/>
						<SelectControl
							label={ __( 'Border Type', 'blocks-kit' ) }
							value={ divbordertype }
							options={ divborderOptions }
							onChange={ ( val ) => setAttributes( { divbordertype: val } ) }
						/>
						<p><strong>{ __( 'Border Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ divborderColor }
							onChange={ ( val ) => setAttributes( { divborderColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-divider">
					<div className={ `bk-divider-wrapper ${ divborderpos }` }>
						<span
							className={ `bk-divider-left ${ divbordertype }` }
							style={ { borderColor: divborderColor, borderWidth: divborderwidth + 'px' } }
						/>
						<RichText
							tagName="h3"
							value={ body }
							placeholder={ __( 'Blocks Kit Divider', 'blocks-kit' ) }
							className="bk-heading-body"
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { fontSize: fsize + 'rem', color: fontColor } }
						/>
						<span
							className={ `bk-divider-right ${ divbordertype }` }
							style={ { borderColor: divborderColor, borderWidth: divborderwidth + 'px' } }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			body, fsize, fontColor, divborderwidth,
			divbordertype, divborderpos, divborderColor,
		} = attributes;

		return (
			<div className="bk-divider">
				<div className={ `bk-divider-wrapper ${ divborderpos }` }>
					<span
						className={ `bk-divider-left ${ divbordertype }` }
						style={ { borderColor: divborderColor, borderWidth: divborderwidth + 'px' } }
					/>
					<h3 className="bk-devider-body" style={ { color: fontColor, fontSize: fsize + 'rem' } }>
						<RichText.Content value={ body } />
					</h3>
					<span
						className={ `bk-divider-right ${ divbordertype }` }
						style={ { borderColor: divborderColor, borderWidth: divborderwidth + 'px' } }
					/>
				</div>
			</div>
		);
	},
} );
