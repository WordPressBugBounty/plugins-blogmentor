<?php
/**
 * Blocks Initializer
 *
 * Handles all initialization for the Blocks Kit Gutenberg blocks plugin.
 * Responsible for:
 * - Enqueueing block assets (CSS and JavaScript)
 * - Registering custom block categories
 * - Loading admin feedback/review notice functionality
 *
 * @since   1.0.0
 * @package BlocksKit
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for the frontend.
 *
 * Loads the compiled block styles and font assets that are visible
 * to site visitors on the frontend.
 *
 * @since 1.0.0
 * @return void
 */
function blocks_kit_assets() {
	wp_enqueue_style(
		'blocks-kit-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array(),
		BK_VERSION
	);

	wp_enqueue_style(
		'blocks-kit-all-css',
		plugins_url( 'dist/webfonts/css/all.css', dirname( __FILE__ ) ),
		array(),
		BK_VERSION
	);
}
add_action( 'enqueue_block_assets', 'blocks_kit_assets' );

/**
 * Enqueue Gutenberg block assets for the block editor only.
 *
 * Loads the block JavaScript and editor-specific styles that are only
 * visible within the WordPress block editor admin interface.
 *
 * @since 1.0.0
 * @return void
 */
function blocks_kit_editor_assets() {
	$asset_file = plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js';
	$version    = file_exists( $asset_file ) ? (string) filemtime( $asset_file ) : BK_VERSION;

	wp_enqueue_script(
		'blocks-kit-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-components', 'wp-element', 'wp-block-editor', 'lodash' ),
		$version,
		true
	);

	wp_enqueue_style(
		'blocks-kit-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		BK_VERSION
	);

	// Set up translations for the block JavaScript.
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'blocks-kit-block-js', 'blocks-kit' );
	}
}
add_action( 'enqueue_block_editor_assets', 'blocks_kit_editor_assets' );

/**
 * Register Gutenberg block category.
 *
 * Registers a custom block category 'bk-blocks' to group all Blocks Kit
 * blocks together in the block editor's block inserter.
 *
 * @since 1.0.0
 * @param array $categories Existing block categories.
 * @return array Modified block categories with Blocks Kit category added.
 */
function blocks_kit_block_categories( $categories ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'bk-blocks',
				'title' => __( 'Blocks Kit - Gutenberg Blocks for Freelancers', 'blocks-kit' ),
				'icon'  => null,
			),
		)
	);
}
add_filter( 'block_categories_all', 'blocks_kit_block_categories', 10, 1 );

/**
 * Load admin review notice.
 *
 * Includes the feedback/review notice functionality that prompts users
 * to review the plugin on WordPress.org after a period of usage.
 *
 * @since 1.0.0
 */
if ( is_admin() ) {
	require_once plugin_dir_path( __FILE__ ) . '../includes/feedback.php';
}
