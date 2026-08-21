/**
 * Testimonial Block
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
	AlignmentToolbar,
	RichText,
	MediaUpload,
} = wp.blockEditor;
const {
	PanelBody,
	Button,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-testimonial-block', {
	title:       __( 'Testimonial', 'blocks-kit' ),
	icon:        icons.Testimonial,
	description: __( 'Add a testimonial with reviewer name, designation and review text.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'landing', 'blocks-kit' ), __( 'comparison', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		mediaURL: {
			type:      'string',
			source:    'attribute',
			attribute: 'src',
			selector:  '.testimonial-image-one',
		},
		mediaID: {
			type: 'number',
		},
		testimonialTitle: {
			type:     'string',
			source:   'html',
			selector: '.bk-testimonial-column-one h4',
		},
		position: {
			type:     'string',
			source:   'html',
			selector: '.bk-testimonial-position',
		},
		body: {
			type:     'string',
			source:   'html',
			selector: '.bk-testimonial-body',
		},
		titleColor: {
			type: 'string',
		},
		tsbackground: {
			type:    'string',
			default: '#f5f5f5',
		},
		posColor: {
			type: 'string',
		},
		bodyTextColor: {
			type: 'string',
		},
		alignment: {
			type:    'string',
			default: 'center',
		},
	},

	edit( { attributes, setAttributes } ) {
		const {
			alignment, mediaID, mediaURL, tsbackground,
			testimonialTitle, position, body, titleColor, posColor, bodyTextColor,
		} = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<h3>{ __( 'Text Align', 'blocks-kit' ) }</h3>
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( val ) => setAttributes( { alignment: val } ) }
						/>
					</PanelBody>

					<PanelBody initialOpen={ false } title={ __( 'Color Settings', 'blocks-kit' ) }>
						<p><strong>{ __( 'Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ tsbackground }
							onChange={ ( val ) => setAttributes( { tsbackground: val } ) }
						/>
						<p><strong>{ __( 'Description Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ bodyTextColor }
							onChange={ ( val ) => setAttributes( { bodyTextColor: val } ) }
						/>
						<p><strong>{ __( 'Title Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ titleColor }
							onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						/>
						<p><strong>{ __( 'Position Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ posColor }
							onChange={ ( val ) => setAttributes( { posColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-testimonial" style={ { backgroundColor: tsbackground } }>
					<div className="bk-testimonial-column-one" style={ { textAlign: alignment } }>
						<RichText
							tagName="p"
							value={ body }
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers with advanced styles and options.', 'blocks-kit' ) }
							className="bk-testimonial-body"
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { color: bodyTextColor } }
						/>
						<div className="testimonial-inner">
							<div className="testimonial-img">
								<MediaUpload
									onSelect={ ( img ) => setAttributes( { mediaID: img.id, mediaURL: img.url } ) }
									allowedTypes={ [ 'image' ] }
									value={ mediaID }
									render={ ( { open } ) => (
										<Button onClick={ open }>
											{ ! mediaID
												? icons.upload
												: <img className="testimonial-image-one" src={ mediaURL } alt="avatar" />
											}
										</Button>
									) }
								/>
							</div>
							<div className="testimonial-detail">
								<RichText
									tagName="h4"
									placeholder={ __( 'Blocks Kit', 'blocks-kit' ) }
									value={ testimonialTitle }
									onChange={ ( val ) => setAttributes( { testimonialTitle: val } ) }
									style={ { color: titleColor } }
								/>
								<RichText
									tagName="p"
									placeholder={ __( 'Founder', 'blocks-kit' ) }
									value={ position }
									className="bk-testimonial-position"
									onChange={ ( val ) => setAttributes( { position: val } ) }
									style={ { color: posColor } }
								/>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			alignment, mediaURL, testimonialTitle, tsbackground,
			position, body, titleColor, posColor, bodyTextColor,
		} = attributes;

		return (
			<div className="bk-testimonial" style={ { backgroundColor: tsbackground } }>
				<div className="bk-testimonial-column-one" style={ { textAlign: alignment } }>
					{ body && (
						<RichText.Content tagName="p" className="bk-testimonial-body" style={ { color: bodyTextColor } } value={ body } />
					) }
					<div className="testimonial-inner">
						<div className="testimonial-img">
							<img className="testimonial-image-one" src={ mediaURL } alt="avatar" />
						</div>
						<div className="testimonial-detail">
							{ testimonialTitle && (
								<RichText.Content tagName="h4" style={ { color: titleColor } } value={ testimonialTitle } />
							) }
							{ position && (
								<RichText.Content tagName="small" className="bk-testimonial-position" style={ { color: posColor } } value={ position } />
							) }
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
