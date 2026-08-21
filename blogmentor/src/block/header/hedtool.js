/**
 * Heading Toolbar Component
 *
 * Renders heading level picker buttons for use inside BlockControls.
 *
 * @package BlocksKit
 */

import { range } from 'lodash';

const { __, sprintf } = wp.i18n;
const { Toolbar }     = wp.components;

/**
 * HeadingToolbar renders a set of heading-level buttons.
 *
 * @param {Object} props
 * @param {number} props.minLevel     Minimum heading level (inclusive).
 * @param {number} props.maxLevel     Maximum heading level (exclusive).
 * @param {number} props.selectedLevel Currently active level.
 * @param {Function} props.onChange   Called with the new level on click.
 */
function HeadingToolbar( { minLevel, maxLevel, selectedLevel, onChange } ) {
	const controls = range( minLevel, maxLevel ).map( ( level ) => ( {
		icon:       'heading',
		/* translators: %s: heading level e.g: "1", "2", "3" */
		title:      sprintf( __( 'Heading %s', 'blocks-kit' ), level ),
		isActive:   level === selectedLevel,
		onClick:    () => onChange( level ),
		subscript:  String( level ),
	} ) );

	return <Toolbar controls={ controls } />;
}

export default HeadingToolbar;
