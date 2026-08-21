<?php
/**
 * Plugin Name: Blocks Kit - Gutenberg Blocks for Freelancers
 * Plugin URI:  https://wordpress.org/plugins/blocks-kit/
 * Description: Additional Gutenberg Blocks for Editors, Content Writers and freelancers with advanced styles and options.
 * Version:     1.2.2
 * Author:      Techeshta
 * Author URI:  https://www.techeshta.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: blocks-kit
 *
 * @package BlocksKit
 * @since   1.0.0
 */

/**
 * Exit if accessed directly.
 *
 * Prevents direct access to this file from outside WordPress.
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Current plugin version.
 * Update this version number for releases.
 *
 * @var string BK_VERSION
 */
define( 'BK_VERSION', '1.2.2' );

/**
 * Plugin directory path.
 * Used for requiring files and locating plugin resources.
 *
 * @var string BK_PLUGIN_DIR
 */
define( 'BK_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Plugin URL path.
 * Used for enqueuing CSS, JavaScript, and other resources.
 *
 * @var string BK_PLUGIN_URL
 */
define( 'BK_PLUGIN_URL', plugins_url( '/', __FILE__ ) );

/**
 * Plugin text domain for translations.
 * Used for i18n and localization.
 *
 * @var string BK_DOMAIN
 */
define( 'BK_DOMAIN', 'blocks-kit' );

/**
 * Block Initializer
 *
 * Loads the main initialization file which handles:
 * - Block asset enqueueing (CSS, JavaScript)
 * - Block category registration
 * - Admin review notice functionality
 *
 * @since 1.0.0
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
