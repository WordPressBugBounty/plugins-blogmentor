/**
 * Button Block
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
	URLInput,
} = wp.blockEditor;
const {
	PanelBody,
	SelectControl,
	ToggleControl,
	ColorPalette,
} = wp.components;

registerBlockType( 'bk/block-button-block', {
	title:       __( 'Button', 'blocks-kit' ),
	icon:        icons.Button,
	category:    'bk-blocks',
	description: __( 'Advance button with different style options like Size, Shape etc.', 'blocks-kit' ),
	keywords:    [ __( 'button', 'blocks-kit' ), __( 'Blocks Kit', 'blocks-kit' ) ],

	attributes: {
		alignment: {
			type:    'string',
			default: 'left',
		},
		texbktring: {
			type:     'string',
			source:   'html',
			selector: 'span.bk-button-plus',
		},
		fontColor: {
			type:    'string',
			default: '#fff',
		},
		backgroundColor: {
			type: 'string',
		},
		buttonSize: {
			type:    'string',
			default: 'bk-normal',
		},
		buttonShape: {
			type:    'string',
			default: 'bk-rounded',
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
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const {
			alignment, fontColor, buttonUrl, buttonSize,
			buttonShape, backgroundColor, buttonTarget, texbktring,
		} = attributes;

		const buttonSizeOptions = [
			{ value: 'bk-small',       label: __( 'Small', 'blocks-kit' ) },
			{ value: 'bk-normal',      label: __( 'Normal', 'blocks-kit' ) },
			{ value: 'bk-medium',      label: __( 'Medium', 'blocks-kit' ) },
			{ value: 'bk-large',       label: __( 'Large', 'blocks-kit' ) },
			{ value: 'bk-extra-large', label: __( 'Extra Large', 'blocks-kit' ) },
		];

		const buttonShapeOptions = [
			{ value: 'bk-square',        label: __( 'Square', 'blocks-kit' ) },
			{ value: 'bk-rounded',       label: __( 'Rounded Square', 'blocks-kit' ) },
			{ value: 'bk-circular',      label: __( 'Circular', 'blocks-kit' ) },
			{ value: 'bk-extra-circular', label: __( 'Extra Circular', 'blocks-kit' ) },
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
					<PanelBody title={ __( 'Button Style', 'blocks-kit' ) } initialOpen={ false }>
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
					</PanelBody>

					<PanelBody title={ __( 'Button Text Color', 'blocks-kit' ) } initialOpen={ false }>
						<ColorPalette
							value={ fontColor }
							onChange={ ( val ) => setAttributes( { fontColor: val } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Background Color', 'blocks-kit' ) } initialOpen={ false }>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="bk-button-wrapper" style={ { textAlign: alignment } }>
					<RichText
						tagName="span"
						className={ `bk-button-plus ${ buttonSize } ${ buttonShape }` }
						value={ texbktring }
						placeholder={ __( 'Button Text', 'blocks-kit' ) }
						onChange={ ( val ) => setAttributes( { texbktring: val } ) }
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
			</Fragment>
		);
	},

	save( { attributes } ) {
		const {
			alignment, fontColor, buttonUrl, texbktring,
			buttonSize, buttonShape, buttonTarget, backgroundColor,
		} = attributes;

		return (
			<div className="bk-button-wrapper" style={ { textAlign: alignment } }>
				<a
					style={ { color: fontColor, backgroundColor: backgroundColor } }
					rel="noopener noreferrer"
					className={ `bk-button-plus ${ buttonSize } ${ buttonShape }` }
					target={ buttonTarget ? '_blank' : '_self' }
					href={ buttonUrl }
				>
					<RichText.Content value={ texbktring } />
				</a>
			</div>
		);
	},
} );
