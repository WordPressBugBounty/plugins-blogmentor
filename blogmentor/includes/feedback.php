<?php
/**
 * Plugin review notice class.
 *
 * Prompts users to review the plugin on WordPress.org after a period of usage.
 *
 * @package BlocksKit
 * @since   1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Blockskit_Plugin_Review' ) ) :

	/**
	 * Handles the admin review prompt.
	 *
	 * @since 1.0.0
	 */
	class Blockskit_Plugin_Review {

		/**
		 * Plugin slug.
		 *
		 * @var string
		 */
		private $slug;

		/**
		 * Plugin name.
		 *
		 * @var string
		 */
		private $name;

		/**
		 * Minimum seconds before showing the notice.
		 *
		 * @var int
		 */
		private $time_limit;

		/**
		 * Option name used to suppress the notice permanently.
		 *
		 * @var string
		 */
		public $nobug_option;

		/**
		 * Constructor.
		 *
		 * @param array $args Plugin configuration args (slug, name, time_limit).
		 */
		public function __construct( $args ) {
			$this->slug       = $args['slug'];
			$this->name       = $args['name'];
			$this->time_limit = isset( $args['time_limit'] ) ? $args['time_limit'] : WEEK_IN_SECONDS;

			$this->nobug_option = $this->slug . '-no-bug';

			add_action( 'admin_init', array( $this, 'check_installation_date' ) );
			add_action( 'admin_init', array( $this, 'set_no_bug' ), 5 );
		}

		/**
		 * Convert a seconds value to a human-readable duration string.
		 *
		 * @param int $seconds Number of seconds elapsed since activation.
		 * @return string Human-readable duration.
		 */
		public function seconds_to_words( $seconds ) {
			$since_activation = time() - (int) get_site_option( $this->slug . '-activation-date' );

			$years = (int) floor( $since_activation / YEAR_IN_SECONDS ) % 100;
			if ( $years > 1 ) {
				/* translators: %s: Number of years. */
				return sprintf( __( '%s years', 'blocks-kit' ), $years );
			} elseif ( $years > 0 ) {
				return __( 'a year', 'blocks-kit' );
			}

			$weeks = (int) floor( $since_activation / WEEK_IN_SECONDS ) % 52;
			if ( $weeks > 1 ) {
				/* translators: %s: Number of weeks. */
				return sprintf( __( '%s weeks', 'blocks-kit' ), $weeks );
			} elseif ( $weeks > 0 ) {
				return __( 'a week', 'blocks-kit' );
			}

			$days = ( (int) $seconds / DAY_IN_SECONDS ) % 7;
			if ( $days > 1 ) {
				/* translators: %s: Number of days. */
				return sprintf( __( '%s days', 'blocks-kit' ), $days );
			} elseif ( $days > 0 ) {
				return __( 'a day', 'blocks-kit' );
			}

			$hours = ( (int) $seconds / HOUR_IN_SECONDS ) % 24;
			if ( $hours > 1 ) {
				/* translators: %s: Number of hours. */
				return sprintf( __( '%s hours', 'blocks-kit' ), $hours );
			} elseif ( $hours > 0 ) {
				return __( 'an hour', 'blocks-kit' );
			}

			$minutes = ( (int) $seconds / MINUTE_IN_SECONDS ) % 60;
			if ( $minutes > 1 ) {
				/* translators: %s: Number of minutes. */
				return sprintf( __( '%s minutes', 'blocks-kit' ), $minutes );
			} elseif ( $minutes > 0 ) {
				return __( 'a minute', 'blocks-kit' );
			}

			$secs = (int) $seconds % 60;
			if ( $secs > 1 ) {
				/* translators: %s: Number of seconds. */
				return sprintf( __( '%s seconds', 'blocks-kit' ), $secs );
			} elseif ( $secs > 0 ) {
				return __( 'a second', 'blocks-kit' );
			}

			return '';
		}

		/**
		 * Check activation date on admin init and schedule the notice if time limit exceeded.
		 */
		public function check_installation_date() {
			if ( get_site_option( $this->nobug_option ) ) {
				return;
			}

			$install_date = get_site_option( $this->slug . '-activation-date' );
			if ( '' === $install_date || false === $install_date ) {
				add_site_option( $this->slug . '-activation-date', time() );
				$install_date = time();
			}

			if ( ( time() - (int) $install_date ) > $this->time_limit ) {
				add_action( 'admin_notices', array( $this, 'display_admin_notice' ) );
			}
		}

		/**
		 * Display the admin notice asking users to review the plugin.
		 */
		public function display_admin_notice() {
			$screen = get_current_screen();
			if ( ! isset( $screen->base ) || 'plugins' !== $screen->base ) {
				return;
			}

			$no_bug_url = esc_url(
				wp_nonce_url(
					admin_url( '?' . rawurlencode( $this->nobug_option ) . '=true' ),
					'review-nonce'
				)
			);

			$time = $this->seconds_to_words( time() - (int) get_site_option( $this->slug . '-activation-date' ) );

			$message = sprintf(
				/* translators: 1: Plugin name, 2: Duration of usage. */
				esc_html__( 'You have been using the %1$s plugin for %2$s now, do you like it? If so, please leave us a review with your feedback!', 'blocks-kit' ),
				'<strong>' . esc_html( $this->name ) . '</strong>',
				esc_html( $time )
			);

			printf(
				'<div class="updated notice is-dismissible"><p>%s &nbsp;<a href="%s">%s</a></p></div>',
				wp_kses( $message, array( 'strong' => array() ) ),
				$no_bug_url,
				esc_html__( 'Dismiss', 'blocks-kit' )
			);
		}

		/**
		 * Permanently suppress the notice when the user clicks Dismiss.
		 */
		public function set_no_bug() {
			if ( ! isset( $_GET['_wpnonce'] ) ) {
				return;
			}

			if ( ! wp_verify_nonce( sanitize_key( wp_unslash( $_GET['_wpnonce'] ) ), 'review-nonce' ) ) {
				return;
			}

			if ( ! is_admin() || ! current_user_can( 'manage_options' ) ) {
				return;
			}

			if ( ! isset( $_GET[ $this->nobug_option ] ) ) {
				return;
			}

			add_site_option( $this->nobug_option, true );
		}
	}

endif;

new Blockskit_Plugin_Review(
	array(
		'slug'       => 'blocks-kit',  // The plugin slug.
		'name'       => 'Blocks Kit',  // The plugin name.
		'time_limit' => DAY_IN_SECONDS, // The time limit at which notice is shown.
	)
);
