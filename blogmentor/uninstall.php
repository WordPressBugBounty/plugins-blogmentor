<?php
/**
 * Fired when the plugin is uninstalled.
 *
 * @package Blogmentor
 */

if ( ! defined( 'ABSPATH' ) || ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

delete_option( 'blogmentor_activated_time' );
delete_option( 'blogmentor_reviews_dismissed' );
delete_option( 'blogmentor_reviews' ); // Legacy option from versions prior to 1.6.
