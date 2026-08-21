/**
 * External dependencies
 */
import { range } from 'lodash';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
// const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Component } = wp.element;
const { registerBlockType } = wp.blocks;
const {
	withState,
    PanelColor,
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl,
    Dashicon,
    IconButton,
    Button,
    Toolbar,
    ServerSideRender,
    Panel, 
    PanelBody, 
} = wp.components;

const {
	InspectorControls,
    BlockControls,
    ColorPalette,
    AlignmentToolbar,
    RichText,
    URLInput,
    MediaUpload,
} = wp.editor.InspectorControls ? wp.editor : wp.blocks;

class HeadingToolbar extends Component {
	createLevelControl( targetLevel, selectedLevel, onChange ) {
		return {
			icon: 'heading',
			// translators: %s: heading level e.g: "1", "2", "3"
			title: ( __( 'Heading %d' ), targetLevel ),
			isActive: targetLevel === selectedLevel,
			onClick: () => onChange( targetLevel ),
			subscript: String( targetLevel ),
		};
	}

	render() {
		const { minLevel, maxLevel, selectedLevel, onChange } = this.props;
		return (
			<Toolbar controls={ range( minLevel, maxLevel ).map( ( index ) => this.createLevelControl( index, selectedLevel, onChange ) ) } />
		);
	}
}

export default HeadingToolbar;