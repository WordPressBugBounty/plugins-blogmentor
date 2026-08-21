/**
 * Pull Quotes Block
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
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-pquotes-block', {
	title:       __( 'Pull Quotes', 'blocks-kit' ),
	icon:        icons.Pquotes,
	description: __( 'Showcase useful notes or highlight quote to present great words beautifully.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'quotes', 'blocks-kit' ), __( 'pull quote', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		qborderpos: {
			type:    'string',
			default: 'bk-default',
		},
		qauthorname: {
			type:     'string',
			source:   'html',
			selector: '.bk-qauth-name',
		},
		body: {
			type:     'string',
			source:   'html',
			selector: '.bk-pquotes-body p',
		},
		fsize: {
			type:    'number',
			default: 1.2,
		},
		atsize: {
			type:    'number',
			default: 0.8,
		},
		fontColor: {
			type:    'string',
			default: '#000000',
		},
		brColor: {
			type:    'string',
			default: '#333',
		},
		alignment: {
			type:    'string',
			default: 'left',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			body, fsize, fontColor, qauthorname, alignment,
			atsize, brColor, qborderpos,
		} = attributes;

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
						<p>{ __( 'Quotes Font Size (rem)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 5 }
							value={ fsize }
							onChange={ ( val ) => setAttributes( { fsize: val } ) }
						/>
						<p>{ __( 'Author Font Size (rem)', 'blocks-kit' ) }</p>
						<RangeControl
							min={ 1 }
							max={ 5 }
							value={ atsize }
							onChange={ ( val ) => setAttributes( { atsize: val } ) }
						/>
						<p><strong>{ __( 'Font Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
						<p><strong>{ __( 'Border Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ brColor }
							onChange={ ( val ) => setAttributes( { brColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-pquotes">
					<div className={ `bk-pquotes-wrapper ${ qborderpos }` } style={ { borderColor: brColor } }>
						<RichText
							tagName="p"
							value={ body }
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers with advanced styles and options.', 'blocks-kit' ) }
							className="bk-pquotes-body"
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { fontSize: fsize + 'rem', color: fontColor, textAlign: alignment } }
						/>
						<div className="bk-pquotes-au">
							<RichText
								tagName="p"
								value={ qauthorname }
								placeholder={ __( 'Blocks Kit Team', 'blocks-kit' ) }
								className="bk-qauth-name"
								onChange={ ( val ) => setAttributes( { qauthorname: val } ) }
								style={ { fontSize: atsize + 'rem', color: fontColor, textAlign: alignment } }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			body, fsize, fontColor, qauthorname, brColor,
			atsize, qborderpos,
		} = attributes;

		return (
			<div className="bk-pquotes">
				<div className={ `bk-pquotes-wrapper ${ qborderpos }` } style={ { borderColor: brColor } }>
					<div className="bk-pquotes-body">
						<p style={ { color: fontColor, fontSize: fsize + 'rem' } }>
							<RichText.Content value={ body } />
						</p>
					</div>
					<div className="bk-pquotes-au">
						<RichText.Content
							tagName="p"
							className="bk-qauth-name"
							style={ { fontSize: atsize + 'rem', color: fontColor } }
							value={ qauthorname }
						/>
					</div>
				</div>
			</div>
		);
	},
} );
