<?php
/**
 * Helper functions used by the Blogmentor Elementor widget and layout templates.
 *
 * @package Blogmentor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! function_exists( 'blogmentor_sanitize_title_tag' ) ) {

	/**
	 * Restrict a widget-supplied title tag to the whitelist offered in the
	 * control's UI. Elementor does not re-validate SELECT control values
	 * against their `options` on save, so this must be enforced here before
	 * the value is used as a raw HTML tag name.
	 *
	 * @since 1.6
	 *
	 * @param string $tag Requested tag name.
	 * @return string A safe tag name from the whitelist, defaulting to 'h4'.
	 */
	function blogmentor_sanitize_title_tag( $tag ) {
		$allowed = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'p' );

		return in_array( $tag, $allowed, true ) ? $tag : 'h4';
	}

}

if ( ! function_exists( 'blogmentor_blog_elements_post_categories' ) ) {

	/**
	 * Return an options array of post categories, keyed by term ID.
	 *
	 * @since 1.0.0
	 *
	 * @return array<int, string> Category names keyed by term ID.
	 */
	function blogmentor_blog_elements_post_categories() {

		$terms = get_terms(
			array(
				'taxonomy'   => 'category',
				'hide_empty' => true,
			)
		);

		$options = array();
		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				$options[ $term->term_id ] = $term->name;
			}
		}

		return $options;
	}

}

if ( ! function_exists( 'blogmentor_blog_elements_post_author' ) ) {

	/**
	 * Return an options array of post authors, keyed by user ID.
	 *
	 * @since 1.0.0
	 *
	 * @return array<int, string> Author usernames keyed by user ID.
	 */
	function blogmentor_blog_elements_post_author() {

		$args    = array(
			'orderby'      => 'name',
			'order'        => 'ASC',
			'role__not_in' => array( 'customer', 'subscriber' ),
		);
		$authors = get_users( $args );

		$options = array();
		if ( ! empty( $authors ) ) {
			foreach ( $authors as $author ) {
				$options[ $author->ID ] = $author->user_login;
			}
		}

		return $options;
	}

}

if ( ! function_exists( 'blogmentor_blog_elements_post_tags' ) ) {

	/**
	 * Return an options array of post tags, keyed by term ID.
	 *
	 * @since 1.0.0
	 *
	 * @return array<int, string> Tag names keyed by term ID.
	 */
	function blogmentor_blog_elements_post_tags() {

		$terms = get_terms(
			array(
				'taxonomy'   => 'post_tag',
				'hide_empty' => true,
			)
		);

		$options = array();
		if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
			foreach ( $terms as $term ) {
				$options[ $term->term_id ] = $term->name;
			}
		}

		return $options;
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_posted_by' ) ) {

	/**
	 * Output the post author meta markup (icon + name).
	 *
	 * @since 1.0.0
	 */
	function blogmentor_blog_layout_posted_by() {
		printf(
			/* translators: 1: SVG icon. 2: post author, only visible to screen readers. 3: author link. 4: author name. */
			'<span class="byauthor">%1$s<span class="screen-reader-text">%2$s</span><span class="author vcard"><a class="url fn n" href="%3$s">%4$s</a></span></span>',
			'<i class="fa fa-user" aria-hidden="true"></i>',
			esc_html__( 'Posted by', 'blogmentor' ),
			esc_url( get_author_posts_url( (int) get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		);
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_2_posted_by' ) ) {

	/**
	 * Output the post author meta markup (avatar + name) for layout 2.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_blog_layout_2_posted_by() {
		printf(
			/* translators: 1: Author avatar image. 2: post author, only visible to screen readers. 3: author link. 4: author name. */
			'<span class="byauthor">%1$s<span class="screen-reader-text">%2$s</span><span class="author vcard"><a class="url fn n" href="%3$s">%4$s</a></span></span>',
			get_avatar( get_the_author_meta( 'ID' ), 40 ),
			esc_html__( 'By', 'blogmentor' ),
			esc_url( get_author_posts_url( (int) get_the_author_meta( 'ID' ) ) ),
			esc_html( get_the_author() )
		);
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_posted_on' ) ) {

	/**
	 * Output the post published date, formatted per the widget's date format setting.
	 *
	 * @since 1.0.0
	 *
	 * @param string $date_format One of 'MDY', 'ymd', 'mdy', 'dmy'.
	 */
	function blogmentor_blog_layout_posted_on( $date_format ) {
		switch ( $date_format ) {
			case 'ymd':
				$date_text = get_the_date( 'Y-m-d' );
				break;
			case 'mdy':
				$date_text = get_the_date( 'm/d/Y' );
				break;
			case 'dmy':
				$date_text = get_the_date( 'd/m/Y' );
				break;
			case 'MDY':
			default:
				$date_text = get_the_date( 'F j, Y' );
				break;
		}

		printf(
			/* translators: 1: SVG icon. 2: post permalink. 3: published date. */
			'<span class="posted-on">%1$s<a href="%2$s" rel="bookmark">%3$s</a></span>',
			'<i class="fa fa-clock" aria-hidden="true"></i>',
			esc_url( get_permalink() ),
			esc_html( $date_text )
		);
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_posted_categories' ) ) {

	/**
	 * Output the post's category list.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_blog_layout_posted_categories() {
		/* translators: used between list items, there is a space after the comma. */
		$categories_list = get_the_category_list( __( ', ', 'blogmentor' ) );
		if ( $categories_list ) {
			printf(
				/* translators: 1: SVG icon. 2: posted in label, only visible to screen readers. 3: list of categories. */
				'<span class="cat-links"><i class="fa fa-list-alt" aria-hidden="true"></i>
%1$s<span class="screen-reader-text">%2$s</span>%3$s</span>',
				'',
				esc_html__( 'Posted in', 'blogmentor' ),
				$categories_list // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_the_category_list() output is escaped by core.
			);
		}
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_posted_tag' ) ) {

	/**
	 * Output the post's tag list.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_blog_layout_posted_tag() {
		/* translators: used between list items, there is a space after the comma. */
		$tags_list = get_the_tag_list( '', __( ', ', 'blogmentor' ) );
		if ( $tags_list ) {
			printf(
				/* translators: 1: SVG icon. 2: posted in label, only visible to screen readers. 3: list of tags. */
				'<span class="tags-links">%1$s<span class="screen-reader-text">%2$s </span>%3$s</span>',
				'<i class="fa fa-tags" aria-hidden="true"></i>',
				esc_html__( 'Tags:', 'blogmentor' ),
				$tags_list // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_the_tag_list() output is escaped by core.
			);
		}
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_comment_count' ) ) {

	/**
	 * Output the post comment count.
	 *
	 * @since 1.0.0
	 */
	function blogmentor_blog_layout_comment_count() {
		if ( ! post_password_required() && ( comments_open() || get_comments_number() ) ) {
			echo '<span class="comments-link">';
			echo '<i class="fa fa-comments" aria-hidden="true"></i>' . esc_html( get_comments_number() );

			echo '</span>';
		}
	}

}

if ( ! function_exists( 'blogmentor_blog_layout_image_size' ) ) {

	/**
	 * Return an options array of registered image sizes with their dimensions.
	 *
	 * @since 1.0.0
	 *
	 * @return array<string, string> Image size labels keyed by size name.
	 */
	function blogmentor_blog_layout_image_size() {
		global $_wp_additional_image_sizes;
		$wp_image_sizes = array();
		foreach ( get_intermediate_image_sizes() as $_size ) {

			if ( in_array( $_size, array( 'thumbnail', 'medium', 'medium_large', 'large' ), true ) ) {

				$wp_image_sizes[ $_size ] = $_size . ' (' . get_option( "{$_size}_size_w" ) . 'X' . get_option( "{$_size}_size_h" ) . ')';
			} elseif ( isset( $_wp_additional_image_sizes[ $_size ] ) ) {

				$wp_image_sizes[ $_size ] = $_size . ' (' . $_wp_additional_image_sizes[ $_size ]['width'] . 'X' . $_wp_additional_image_sizes[ $_size ]['height'] . ')';
			}
		}
		return $wp_image_sizes;
	}

}

if ( ! function_exists( 'blogmentor_metro_style_layout' ) ) {

	/**
	 * Normalize the metro layout column index, wrapping it for the 3-column style-1 layout.
	 *
	 * @since 1.0.0
	 *
	 * @param string $columns      Current column index.
	 * @param string $metro_column Number of metro columns.
	 * @param string $metro_style  Metro layout style.
	 * @return int Normalized column index.
	 */
	function blogmentor_metro_style_layout( $columns = '1', $metro_column = '3', $metro_style = 'style-1' ) {
		$i = ( '' !== $columns ) ? (int) $columns : 1;
		if ( ! empty( $metro_column ) ) {
			// Style-3 wraps back to 1 after 10 columns.
			if ( '3' === $metro_column && 'style-1' === $metro_style ) {
				$i = ( $i <= 10 ) ? $i : ( $i % 10 );
			}
		}
		return $i;
	}

}

if ( ! function_exists( 'blogmentor_post_pagination' ) ) {

	/**
	 * Return the pagination links markup for the current query.
	 *
	 * @since 1.0.0
	 *
	 * @param int $total_pages Total number of pages.
	 * @return string|null Pagination markup, or null if there is nothing to paginate.
	 */
	function blogmentor_post_pagination( $total_pages ) {
		return paginate_links(
			array(
				'base'         => str_replace( '999999999', '%#%', esc_url( get_pagenum_link( 999999999 ) ) ),
				'total'        => (int) $total_pages,
				'current'      => blogmentor_get_current_page(),
				'format'       => '?paged=%#%',
				'show_all'     => false,
				'type'         => 'plain',
				'end_size'     => 2,
				'mid_size'     => 1,
				'prev_next'    => true,
				'prev_text'    => '<i></i> ',
				'next_text'    => ' <i></i>',
				'add_args'     => array(),
				'add_fragment' => '',
			)
		);
	}
}

if ( ! function_exists( 'blogmentor_get_current_page' ) ) {

	/**
	 * Return the current pagination page number.
	 *
	 * WordPress uses the "paged" query var on archives and regular pages,
	 * but "page" on a static front page, so both must be checked or
	 * pagination on a front page always shows page 1.
	 *
	 * @since 2.0
	 *
	 * @return int Current page number, 1 or greater.
	 */
	function blogmentor_get_current_page() {
		return max( 1, (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
	}

}

if ( ! function_exists( 'blogmentor_get_post_text' ) ) {

	/**
	 * Return the text to show on a post card: the post's manual excerpt or
	 * its content, with shortcodes removed.
	 *
	 * Password-protected posts return an empty string, so a card never
	 * shows the text of a post the visitor hasn't unlocked (reading
	 * $post->post_content directly bypasses WordPress's password check).
	 *
	 * @since 2.0
	 *
	 * @param WP_Post $post Post object.
	 * @param string  $from 'excerpt' to prefer the manual excerpt, anything else for the content.
	 * @return string Unescaped text; callers trim and escape it.
	 */
	function blogmentor_get_post_text( $post, $from = 'content' ) {
		if ( post_password_required( $post ) ) {
			return '';
		}

		$text = ( 'excerpt' === $from && '' !== $post->post_excerpt ) ? $post->post_excerpt : $post->post_content;

		return strip_shortcodes( $text );
	}

}
