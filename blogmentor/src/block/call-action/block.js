/**
 * Call to Action Block
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
	URLInput,
} = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/bk-cta-block', {
	title:       __( 'Call To Action', 'blocks-kit' ),
	icon:        icons.callAction,
	description: __( 'Create a user-centric call-to-action to convince clients and users.', 'blocks-kit' ),
	category:    'bk-blocks',
	keywords:    [ __( 'landing', 'blocks-kit' ), __( 'comparison', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		ctaTitle: {
			type:     'string',
			source:   'html',
			selector: '.bk-cta-wrapper h2',
		},
		body: {
			type:     'string',
			source:   'html',
			selector: '.bk-cta-body',
		},
		titleColor: {
			type: 'string',
		},
		bodyTextColor: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		btntext: {
			type:     'string',
			source:   'html',
			selector: '.bk-button-plus',
		},
		ctaBackground: {
			type:    'string',
			default: '#f5f5f5',
		},
		buttonSize: {
			type:    'string',
			default: 'bk-normal',
		},
		buttonShape: {
			type:    'string',
			default: 'bk-square',
		},
		buttonUrl: {
			type:      'string',
			source:    'attribute',
			selector:  'a',
			attribute: 'href',
		},
		buttonTarget: {
			type:    'boolean',
			default: false,
		},
		fontColor: {
			type: 'string',
		},
		alignment: {
			type:    'string',
			default: 'center',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const {
			alignment, backgroundColor, buttonSize, buttonUrl, buttonShape,
			btntext, ctaBackground, ctaTitle, body, titleColor, fontColor,
			bodyTextColor, buttonTarget,
		} = attributes;

		const buttonSizeOptions = [
			{ value: 'bk-small',        label: __( 'Small', 'blocks-kit' ) },
			{ value: 'bk-normal',       label: __( 'Normal', 'blocks-kit' ) },
			{ value: 'bk-medium',       label: __( 'Medium', 'blocks-kit' ) },
			{ value: 'bk-large',        label: __( 'Large', 'blocks-kit' ) },
			{ value: 'bk-extra-large',  label: __( 'Extra Large', 'blocks-kit' ) },
		];

		const buttonShapeOptions = [
			{ value: 'bk-square',         label: __( 'Square', 'blocks-kit' ) },
			{ value: 'bk-rounded',        label: __( 'Rounded Square', 'blocks-kit' ) },
			{ value: 'bk-circular',       label: __( 'Circular', 'blocks-kit' ) },
			{ value: 'bk-extra-circular', label: __( 'Extra Circular', 'blocks-kit' ) },
		];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody>
						<h3>{ __( 'Alignment', 'blocks-kit' ) }</h3>
						<AlignmentToolbar
							value={ alignment }
							onChange={ ( val ) => setAttributes( { alignment: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Text Settings', 'blocks-kit' ) } initialOpen={ false }>
						<p><strong>{ __( 'Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ ctaBackground }
							onChange={ ( val ) => setAttributes( { ctaBackground: val } ) }
						/>
						<p><strong>{ __( 'Title Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ titleColor }
							onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						/>
						<p><strong>{ __( 'Description Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ bodyTextColor }
							onChange={ ( val ) => setAttributes( { bodyTextColor: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Button Settings', 'blocks-kit' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Open link in new window', 'blocks-kit' ) }
							checked={ buttonTarget }
							onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
						/>
						<SelectControl
							label={ __( 'Button Size', 'blocks-kit' ) }
							value={ buttonSize }
							options={ buttonSizeOptions }
							onChange={ ( val ) => setAttributes( { buttonSize: val } ) }
						/>
						<SelectControl
							label={ __( 'Button Shape', 'blocks-kit' ) }
							value={ buttonShape }
							options={ buttonShapeOptions }
							onChange={ ( val ) => setAttributes( { buttonShape: val } ) }
						/>
						<p><strong>{ __( 'Button Text Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
						<p><strong>{ __( 'Button Background Color', 'blocks-kit' ) }</strong></p>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-cta" style={ { backgroundColor: ctaBackground } }>
					<div className="bk-cta-wrapper" style={ { textAlign: alignment } }>
						<RichText
							tagName="h2"
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks', 'blocks-kit' ) }
							value={ ctaTitle }
							className="bk-cta-title"
							onChange={ ( val ) => setAttributes( { ctaTitle: val } ) }
							style={ { color: titleColor } }
						/>
						<RichText
							tagName="p"
							placeholder={ __( 'Blocks Kit is an additional Gutenberg Blocks for Freelancers with advanced styles and options.', 'blocks-kit' ) }
							value={ body }
							onChange={ ( val ) => setAttributes( { body: val } ) }
							style={ { color: bodyTextColor } }
						/>
						<div className="bk-button-wrapper" style={ { textAlign: alignment } }>
							<RichText
								tagName="span"
								className={ `bk-button-plus ${ buttonSize } ${ buttonShape }` }
								value={ btntext }
								onChange={ ( val ) => setAttributes( { btntext: val } ) }
								placeholder={ __( 'Blocks Kit', 'blocks-kit' ) }
								style={ { color: fontColor, backgroundColor: backgroundColor, textAlign: alignment } }
							/>
							<div className="bk-btn-form">
								{ isSelected && (
									<URLInput
										className="button-url"
										value={ buttonUrl }
										onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			alignment, backgroundColor, buttonSize, buttonUrl, buttonShape,
			btntext, ctaBackground, ctaTitle, body, titleColor, fontColor,
			bodyTextColor, buttonTarget,
		} = attributes;

		return (
			<div className="bk-cta" style={ { backgroundColor: ctaBackground } }>
				<div className="bk-cta-wrapper" style={ { textAlign: alignment } }>
					{ ctaTitle && (
						<RichText.Content tagName="h2" style={ { color: titleColor } } value={ ctaTitle } />
					) }
					{ body && (
						<RichText.Content tagName="p" className="bk-cta-body" style={ { color: bodyTextColor } } value={ body } />
					) }
					<div className="bk-button-wrapper" style={ { textAlign: alignment } }>
						<a
							style={ { color: fontColor, backgroundColor: backgroundColor } }
							rel="noopener noreferrer"
							className={ `bk-button-plus ${ buttonSize } ${ buttonShape }` }
							target={ buttonTarget ? '_blank' : '_self' }
							href={ buttonUrl }
						>
							<RichText.Content value={ btntext } />
						</a>
					</div>
				</div>
			</div>
		);
	},
} );
