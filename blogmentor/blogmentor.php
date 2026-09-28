<?php
/**
 * Plugin Name: Blogmentor - Blog Layouts for Elementor
 * Description: Showcase WordPress posts in beautiful ways with Elementor page builder.
 * Plugin URI: https://wordpress.org/plugins/blogmentor/
 * Version: 2.0
 * Requires at least: 4.4
 * Requires PHP: 7.4
 * Tested up to: 7.1.2
 * Author: AuburnForest
 * Author URI: https://auburnforest.com
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Elementor tested up to: 4.2.4
 *
 * Text Domain: blogmentor
 * Domain Path: /languages/
 *
 * @package Blogmentor
 */

/*
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Define Plugin URL and Directory Path
 */
define( 'BLOGMENTOR_URL', plugins_url( '/', __FILE__ ) );  // Define Plugin URL.
define( 'BLOGMENTOR_PATH', plugin_dir_path( __FILE__ ) );  // Define Plugin Directory Path.
define( 'BLOGMENTOR_VERSION', '2.0' );  // Define Plugin Version.

/**
 * Minimum Elementor version: 3.5.0 introduced the elementor/widgets/register
 * hook and Widgets_Manager::register() used below.
 */
define( 'BLOGMENTOR_MINIMUM_ELEMENTOR_VERSION', '3.5.0' );

/**
 * Require files.
 *
 * Blogmentor Elementor Elements Register Elements ( Widgets).
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'blogmentor_elements_widget_register' ) ) {

	/**
	 * Load the widget and helper function files, and register the widget.
	 *
	 * Hooked to elementor/widgets/register, which replaced the
	 * elementor/widgets/widgets_registered hook (and register_widget_type())
	 * deprecated in Elementor 3.5.
	 *
	 * @since 1.0.0
	 * @since 2.0 Registers through Widgets_Manager::register().
	 *
	 * @param \Elementor\Widgets_Manager $widgets_manager Elementor widgets manager.
	 */
	function blogmentor_elements_widget_register( $widgets_manager ) {
		if ( ! defined( 'ELEMENTOR_VERSION' ) || ! version_compare( ELEMENTOR_VERSION, BLOGMENTOR_MINIMUM_ELEMENTOR_VERSION, '>=' ) ) {
			return;
		}

		require_once BLOGMENTOR_PATH . 'includes/blogmentor-functions.php';
		require_once BLOGMENTOR_PATH . 'includes/elements/blogmentor-blog-posts.php';

		$widgets_manager->register( new \Elementor\Blogmentor_Blog_Posts_Widget() );
	}

}
add_action( 'elementor/widgets/register', 'blogmentor_elements_widget_register' );

/**
 * Blogmentor Elementor Elements Register Categories.
 *
 * @since 1.0.0
 *
 * @param \Elementor\Elements_Manager $elements_manager Elementor elements manager instance.
 */
function blogmentor_elementor_elements_categories_registered( $elements_manager ) {

	$elements_manager->add_category(
		'blogmentor',
		array(
			'title' => __( 'Blogmentor', 'blogmentor' ),
			'icon'  => 'fa fa-plug',
		)
	);
}

add_action( 'elementor/elements/categories_registered', 'blogmentor_elementor_elements_categories_registered' );

/**
 * Enqueue scripts and styles.
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'blogmentor_elements_widget_script_register' ) ) {

	/**
	 * Enqueue Blogmentor front-end scripts and styles.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_elements_widget_script_register() {
		wp_enqueue_style( 'blogmentor-fontawesome-style', BLOGMENTOR_URL . 'assets/css/fontawesome-v7.3.1.min.css', array(), BLOGMENTOR_VERSION );

		wp_register_style( 'blogmentor-common-layout-style', BLOGMENTOR_URL . 'assets/css/common-layout-style.css', array(), BLOGMENTOR_VERSION );
		wp_enqueue_style( 'blogmentor-common-layout-style' );

		wp_register_style( 'blogmentor-grid-layout-style', BLOGMENTOR_URL . 'assets/css/grid-layout-style.css', array(), BLOGMENTOR_VERSION );
		wp_enqueue_style( 'blogmentor-grid-layout-style' );

		wp_register_style( 'blogmentor-masonry-layout-style', BLOGMENTOR_URL . 'assets/css/masonry-layout-style.css', array(), BLOGMENTOR_VERSION );
		wp_enqueue_style( 'blogmentor-masonry-layout-style' );

		wp_register_style( 'blogmentor-metro-layout-style', BLOGMENTOR_URL . 'assets/css/metro-layout-style.css', array(), BLOGMENTOR_VERSION );
		wp_enqueue_style( 'blogmentor-metro-layout-style' );

		wp_enqueue_script( 'masonry' ); // WordPress core's bundled Masonry.js handle -- do not prefix, this is not our own handle.

		wp_register_script( 'blogmentor-custom-script', BLOGMENTOR_URL . 'assets/js/custom.js', array( 'jquery' ), BLOGMENTOR_VERSION, true );
		wp_enqueue_script( 'blogmentor-custom-script' );
	}

}
add_action( 'wp_enqueue_scripts', 'blogmentor_elements_widget_script_register' );

/**
 * Check current version of Elementor
 */
if ( ! function_exists( 'blogmentor_elements_plugin_load' ) ) {

	/**
	 * Register image sizes and verify the active Elementor version.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_elements_plugin_load() {

		// Add image size for post card.
		add_image_size( 'bm-post-thumb', 250, 250, true );
		add_image_size( 'bm-post-medium', 480, 250, true );

		if ( ! did_action( 'elementor/loaded' ) ) {
			add_action( 'admin_notices', 'blogmentor_elements_widget_fail_load' );
			return;
		}
		if ( ! version_compare( ELEMENTOR_VERSION, BLOGMENTOR_MINIMUM_ELEMENTOR_VERSION, '>=' ) ) {
			add_action( 'admin_notices', 'blogmentor_elements_elementor_update_notice' );
			return;
		}
	}

}
add_action( 'plugins_loaded', 'blogmentor_elements_plugin_load' );

/**
 * This notice will appear if Elementor is not installed or activated or both
 */
if ( ! function_exists( 'blogmentor_elements_widget_fail_load' ) ) {

	/**
	 * Display an admin notice when Elementor is not installed or activated.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_elements_widget_fail_load() {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		$plugin = 'elementor/elementor.php';

		if ( blogmentor_elements_elementor_installed() ) {
			if ( ! current_user_can( 'activate_plugins' ) ) {
				return;
			}
			$activation_url = wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=' . rawurlencode( $plugin ) . '&plugin_status=all&paged=1' ), 'activate-plugin_' . $plugin );

			$message  = '<p><strong>' . esc_html__( 'Blogmentor', 'blogmentor' ) . '</strong>' . esc_html__( ' widgets not working because you need to activate the Elementor plugin.', 'blogmentor' ) . '</p>';
			$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', esc_url( $activation_url ), esc_html__( 'Activate Elementor Now', 'blogmentor' ) ) . '</p>';
		} else {
			if ( ! current_user_can( 'install_plugins' ) ) {
				return;
			}

			$install_url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );

			$message  = '<p><strong>' . esc_html__( 'Blogmentor', 'blogmentor' ) . '</strong>' . esc_html__( ' widgets not working because you need to install the Elementor plugin', 'blogmentor' ) . '</p>';
			$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', esc_url( $install_url ), esc_html__( 'Install Elementor Now', 'blogmentor' ) ) . '</p>';
		}

		echo '<div class="notice notice-error">' . wp_kses_post( $message ) . '</div>';
	}

}

/**
 * Display admin notice for Elementor update if Elementor version is old
 */
if ( ! function_exists( 'blogmentor_elements_elementor_update_notice' ) ) {

	/**
	 * Display an admin notice when the active Elementor version is outdated.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_elements_elementor_update_notice() {
		if ( ! current_user_can( 'update_plugins' ) ) {
			return;
		}

		$file_path = 'elementor/elementor.php';

		$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
		$message      = '<p><strong>' . esc_html__( 'Blogmentor', 'blogmentor' ) . '</strong>' . esc_html__( ' widgets not working because you are using an old version of Elementor.', 'blogmentor' ) . '</p>';
		$message     .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', esc_url( $upgrade_link ), esc_html__( 'Update Elementor Now', 'blogmentor' ) ) . '</p>';
		echo '<div class="notice notice-error">' . wp_kses_post( $message ) . '</div>';
	}

}

/**
 * Action when plugin installed
 */
if ( ! function_exists( 'blogmentor_elements_elementor_installed' ) ) {

	/**
	 * Determine whether the Elementor plugin is installed.
	 *
	 * @since 1.0.0
	 *
	 * @return bool True if Elementor is installed, false otherwise.
	 */
	function blogmentor_elements_elementor_installed() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		$file_path         = 'elementor/elementor.php';
		$installed_plugins = get_plugins();

		return isset( $installed_plugins[ $file_path ] );
	}

}

/**
 * Record the activation time on plugin activation.
 */
if ( ! function_exists( 'blogmentor_elements_plugin_activation' ) ) {

	/**
	 * Record when the plugin was activated, so the review notice can wait
	 * until the site owner has had meaningful time to use the plugin.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_elements_plugin_activation() {
		add_option( 'blogmentor_activated_time', time(), '', false );
	}

}
register_activation_hook( __FILE__, 'blogmentor_elements_plugin_activation' );

/**
 * Display a one-time review request, no sooner than a week after activation.
 */
if ( ! function_exists( 'blogmentor_elements_reviews_notice' ) ) {

	/**
	 * Display the review admin notice once the site has used the plugin for a week.
	 *
	 * @since 1.6
	 */
	function blogmentor_elements_reviews_notice() {
		if ( ! current_user_can( 'manage_options' ) || get_option( 'blogmentor_reviews_dismissed' ) ) {
			return;
		}

		$activated_time = (int) get_option( 'blogmentor_activated_time' );
		if ( ! $activated_time || ( time() - $activated_time ) < 7 * DAY_IN_SECONDS ) {
			return;
		}

		$dismiss_url = wp_nonce_url( add_query_arg( 'blogmentor_dismiss_review_notice', '1' ), 'blogmentor_dismiss_review_notice' );
		?>
		<div class="notice notice-success is-dismissible">
			<p>
				<?php
				printf(
					/* translators: 1: Plugin name. 2: Link to leave a review. */
					esc_html__( 'Hi, you have been using %1$s for a week now. If it has been useful, I would really appreciate it if you could leave a review. %2$s', 'blogmentor' ),
					'<strong>' . esc_html__( 'Blogmentor', 'blogmentor' ) . '</strong>',
					'<a href="' . esc_url( 'https://wordpress.org/support/plugin/blogmentor/reviews/#new-post' ) . '" target="_blank" rel="noopener noreferrer" class="rating-link"><strong>' . esc_html__( 'Leave a review', 'blogmentor' ) . '</strong></a>'
				);
				?>
			</p>
			<p><a href="<?php echo esc_url( $dismiss_url ); ?>"><?php esc_html_e( 'Dismiss', 'blogmentor' ); ?></a></p>
		</div>
		<?php
	}

	add_action( 'admin_notices', 'blogmentor_elements_reviews_notice' );
}

/**
 * Permanently dismiss the review notice.
 */
if ( ! function_exists( 'blogmentor_elements_dismiss_review_notice' ) ) {

	/**
	 * Handle the review notice dismiss link.
	 *
	 * @since 1.6
	 */
	function blogmentor_elements_dismiss_review_notice() {
		if ( ! isset( $_GET['blogmentor_dismiss_review_notice'] ) || ! current_user_can( 'manage_options' ) ) {
			return;
		}
		check_admin_referer( 'blogmentor_dismiss_review_notice' );

		update_option( 'blogmentor_reviews_dismissed', 1, false );
		wp_safe_redirect( remove_query_arg( array( 'blogmentor_dismiss_review_notice', '_wpnonce' ) ) );
		exit;
	}

	add_action( 'admin_init', 'blogmentor_elements_dismiss_review_notice' );
}
