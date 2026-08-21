/**
 * Sticky Notes Block
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
	AlignmentToolbar,
	RichText,
} = wp.blockEditor;
const {
	PanelBody,
	RangeControl,
	SelectControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-stickynotes-block', {
	title:       __( 'Sticky Notes', 'blocks-kit' ),
	icon:        icons.Snotes,
	description: __( 'Highlight notes, important points of your post or page with sticky note presentation.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'note', 'blocks-kit' ), __( 'sticky', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		alignment: {
			type:    'string',
			default: 'left',
		},
		bkhead: {
			type:     'string',
			source:   'html',
			selector: 'h3',
		},
		body: {
			type:     'string',
			source:   'html',
			selector: 'p',
		},
		tsize: {
			type:    'number',
			default: 0,
		},
		fsize: {
			type:    'number',
			default: 1.5,
		},
		fontColor: {
			type:    'string',
			default: '#000000',
		},
		swidth: {
			type:    'number',
			default: 50,
		},
		notpos: {
			type:    'string',
			default: 'bk-default',
		},
		bgColor: {
			type:    'string',
			default: '#f8de59',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			body, fsize, fontColor, bgColor, alignment,
			notpos, tsize, swidth, bkhead,
		} = attributes;

		const notesPosition = [
			{ value: 'bk-default', label: __( 'Default', 'blocks-kit' ) },
			{ value: 'bk-center',  label: __( 'Center', 'blocks-kit' ) },
			{ value: 'bk-right',   label: __( 'Left', 'blocks-kit' ) },
		];

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
				</BlockControls>

				<InspectorControls>
					<PanelBody title={ __( 'Font Settings', 'blocks-kit' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Note Position', 'blocks-kit' ) }
							value={ notpos }
							options={ notesPosition }
							onChange={ ( val ) => setAttributes( { notpos: val } ) }
						/>
						<p>{ __( 'Title Font Size (rem)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 5 }
							value={ tsize }
							onChange={ ( val ) => setAttributes( { tsize: val } ) }
						/>
						<p>{ __( 'Content Font Size (rem)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 5 }
							value={ fsize }
							onChange={ ( val ) => setAttributes( { fsize: val } ) }
						/>
						<p>{ __( 'Custom Width (%)', 'blocks-kit' ) }</p>
						<RangeControl
							max={ 100 }
							value={ swidth }
							onChange={ ( val ) => setAttributes( { swidth: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Color Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p><strong>{ __( 'Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ bgColor }
							onChange={ ( val ) => setAttributes( { bgColor: val } ) }
						/>
						<p><strong>{ __( 'Font Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ `bk-sticky ${ notpos }` }>
					<div className="bk-sticky-wrapper" style={ { width: swidth + '%', backgroundColor: bgColor } }>
						<div className="pin"></div>
						<div className="bk-sticky-head">
							<RichText
								tagName="h3"
								value={ bkhead }
								placeholder={ __( 'Blocks Kit', 'blocks-kit' ) }
								onChange={ ( val ) => setAttributes( { bkhead: val } ) }
								style={ { fontSize: tsize + 'rem', color: fontColor, textAlign: alignment } }
							/>
						</div>
						<RichText
							tagName="p"
							value={ body }
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers with advanced styles and options.', 'blocks-kit' ) }
							className="bk-sticky-body"
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { fontSize: fsize + 'rem', color: fontColor, textAlign: alignment } }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			body, fsize, fontColor, bgColor, swidth,
			alignment, notpos, tsize, bkhead,
		} = attributes;

		return (
			<div className={ `bk-sticky ${ notpos }` }>
				<div className="bk-sticky-wrapper" style={ { width: swidth + '%', backgroundColor: bgColor } }>
					<div className="pin"></div>
					<div className="bk-sticky-head">
						<h3 style={ { fontSize: tsize + 'rem', color: fontColor, textAlign: alignment } }>
							<RichText.Content value={ bkhead } />
						</h3>
					</div>
					<p className="bk-sticky-body" style={ { color: fontColor, fontSize: fsize + 'rem', textAlign: alignment } }>
						<RichText.Content value={ body } />
					</p>
				</div>
			</div>
		);
	},
} );
