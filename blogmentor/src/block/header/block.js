/**
 * Advanced Heading Block
 *
 * @package BlocksKit
 */

import './editor.scss';
import './style.scss';
import HeadingToolbar from './hedtool.js';
import icons from '../../icons/icons';

const { __ }                = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment }          = wp.element;
const {
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
	RichText,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-heading-block', {
	title:       __( 'Advance Heading', 'blocks-kit' ),
	icon:        icons.Heading,
	description: __( 'Advanced heading blocks to beautify title of your sections, topics and much more.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'heading', 'blocks-kit' ), __( 'title', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		level: {
			type:    'number',
			default: 2,
		},
		body: {
			type:     'string',
			source:   'html',
			selector: 'h1,h2,h3,h4,h5,h6',
		},
		fsize: {
			type: 'number',
		},
		hedborderColor: {
			type: 'string',
		},
		fontColor: {
			type: 'string',
		},
		bgColor: {
			type:    'string',
			default: '#ddf1ff',
		},
		hedpadding: {
			type:    'number',
			default: 20,
		},
		hedbordertype: {
			type:    'string',
			default: 'bk-double',
		},
		alignment: {
			type:    'string',
			default: 'center',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			level, alignment, body, fsize, fontColor, bgColor,
			hedpadding, hedbordertype, hedborderColor,
		} = attributes;

		const tagName = 'h' + level;

		const hedbordertypeOptions = [
			{ value: 'bk-dotted', label: __( 'Dotted', 'blocks-kit' ) },
			{ value: 'bk-dashed', label: __( 'Dashed', 'blocks-kit' ) },
			{ value: 'bk-double', label: __( 'Double', 'blocks-kit' ) },
			{ value: 'bk-solid',  label: __( 'Solid', 'blocks-kit' ) },
			{ value: 'bk-groove', label: __( 'Groove', 'blocks-kit' ) },
			{ value: 'bk-ridge',  label: __( 'Ridge', 'blocks-kit' ) },
			{ value: 'bk-inset',  label: __( 'Inset', 'blocks-kit' ) },
			{ value: 'bk-outset', label: __( 'Outset', 'blocks-kit' ) },
			{ value: 'bk-none',   label: __( 'None', 'blocks-kit' ) },
		];

		return (
			<Fragment>
				<BlockControls>
					<HeadingToolbar
						minLevel={ 1 }
						maxLevel={ 7 }
						selectedLevel={ level }
						onChange={ ( val ) => setAttributes( { level: val } ) }
					/>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody>
						<HeadingToolbar
							minLevel={ 1 }
							maxLevel={ 7 }
							selectedLevel={ level }
							onChange={ ( val ) => setAttributes( { level: val } ) }
						/>
						<h3>{ __( 'Text Align', 'blocks-kit' ) }</h3>
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( val ) => setAttributes( { alignment: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Font Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p>{ __( 'Custom Font Size (rem)', 'blocks-kit' ) }</p>
						<RangeControl
							max={ 5 }
							value={ fsize }
							onChange={ ( val ) => setAttributes( { fsize: val } ) }
						/>
						<p>{ __( 'Padding (px)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 0 }
							max={ 100 }
							value={ hedpadding }
							onChange={ ( val ) => setAttributes( { hedpadding: val } ) }
						/>
						<p><strong>{ __( 'Font Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Background Color', 'blocks-kit' ) } initialOpen={ false }>
						<ColorPalette
							value={ bgColor }
							onChange={ ( val ) => setAttributes( { bgColor: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Border Settings', 'blocks-kit' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Border Type', 'blocks-kit' ) }
							value={ hedbordertype }
							options={ hedbordertypeOptions }
							onChange={ ( val ) => setAttributes( { hedbordertype: val } ) }
						/>
						<p><strong>{ __( 'Border Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ hedborderColor }
							onChange={ ( val ) => setAttributes( { hedborderColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-heading" style={ { padding: hedpadding + 'px', backgroundColor: bgColor } }>
					<div className={ `bk-heading-wrapper ${ hedbordertype }` } style={ { textAlign: alignment, borderColor: hedborderColor } }>
						<RichText
							tagName={ tagName }
							value={ body }
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers.', 'blocks-kit' ) }
							className="bk-heading-body"
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { textAlign: alignment, fontSize: fsize + 'rem', color: fontColor } }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			level, alignment, body, fsize, fontColor, bgColor,
			hedpadding, hedbordertype, hedborderColor,
		} = attributes;

		const tagName = 'h' + level;

		return (
			<div className="bk-heading" style={ { padding: hedpadding + 'px', backgroundColor: bgColor } }>
				<div className={ `bk-heading-wrapper ${ hedbordertype }` } style={ { textAlign: alignment, borderColor: hedborderColor } }>
					<RichText.Content
						tagName={ tagName }
						className="bk-heading-body"
						value={ body }
						style={ { textAlign: alignment, fontSize: fsize + 'rem', color: fontColor } }
					/>
				</div>
			</div>
		);
	},
} );
