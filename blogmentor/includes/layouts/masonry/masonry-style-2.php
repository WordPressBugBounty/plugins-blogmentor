<?php
/**
 * Masonry layout, style 2.
 *
 * The Masonry grid is initialized by the enqueued assets/js/custom.js script.
 *
 * @package Blogmentor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<div class="bm-masonry-style-2">
	<div class="bm-masonry-grid">
	<?php
	while ( $blog_posts->have_posts() ) :
		$blog_posts->the_post();
		?>
			<div class="bm-masonry-item bm_content_box">
			<?php
			if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
				?>
				<div class="bm-masonry-wrapper">
					<div class="bm-masonry-title">
					<?php
						$blogmentor_title_link = esc_html( get_the_title() );
					if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
						$blogmentor_title_link = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
					}
						$blogmentor_title_tag = blogmentor_sanitize_title_tag( $settings['title_tag'] );
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $blogmentor_title_tag is whitelisted by blogmentor_sanitize_title_tag(); $blogmentor_title_link is built from escaped parts above.
						echo '<' . $blogmentor_title_tag . ' class="bm_title">' . $blogmentor_title_link . '</' . $blogmentor_title_tag . '>';
					?>
					</div>
				</div>
				<?php
			}
			if ( has_post_thumbnail() ) {
				?>
					<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
				<?php
					the_post_thumbnail( $settings['bm_post_image_size'] );
				?>
					</div>
				<?php
			} else {
				?>
					<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
						<img src="<?php echo esc_url( BLOGMENTOR_URL . 'assets/images/placeholder.jpg' ); ?>" alt="<?php esc_attr_e( 'Default Post Image', 'blogmentor' ); ?>" title="<?php esc_attr_e( 'Default Post Image', 'blogmentor' ); ?>">
					</div>
				<?php
			}
			if ( 'yes' === $settings['show_meta_data'] || 'yes' === $settings['show_excerpt'] ) {
				?>
				<div class="bm-masonry-wrapper">
					<div class="bm-masonry-meta bm_meta">
				<?php
				if ( isset( $settings['show_meta_data'] ) && 'yes' === $settings['show_meta_data'] ) {
					if ( in_array( 'author', $settings['meta_data'], true ) ) {
						blogmentor_blog_layout_posted_by();
					}
					if ( in_array( 'date', $settings['meta_data'], true ) ) {
						blogmentor_blog_layout_posted_on( $settings['date_format'] );
					}
					if ( in_array( 'comments', $settings['meta_data'], true ) ) {
						blogmentor_blog_layout_comment_count();
					}
					if ( in_array( 'tags', $settings['meta_data'], true ) ) {
						blogmentor_blog_layout_posted_tag();
					}
					if ( in_array( 'category', $settings['meta_data'], true ) ) {
						blogmentor_blog_layout_posted_categories();
					}
				}
				?>
					</div>
					<div class="bm-masonry-desc bm_content">
					<?php
					if ( isset( $settings['show_article_feed'] ) && 'full_text' === $settings['show_article_feed'] ) {
						echo wp_kses_post( get_the_content() );
					} elseif ( isset( $settings['show_excerpt'] ) && 'yes' === $settings['show_excerpt'] ) {
							$blogmentor_content = get_the_content();
						if ( isset( $settings['excerpt_from'] ) && 'excerpt' === $settings['excerpt_from'] ) {
							if ( ! empty( get_the_excerpt() ) ) {
								$blogmentor_content = get_the_excerpt();
							}
						} else {
							$blogmentor_content = get_the_content();
						}
						if ( isset( $settings['show_read_more'] ) && 'yes' === $settings['show_read_more'] ) {
							$blogmentor_read_more_text = empty( $settings['read_more_text'] ) ? __( 'Read More »', 'blogmentor' ) : $settings['read_more_text'];
							$blogmentor_read_more      = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark" class="bm-read-more entry-read-more">' . esc_html( $blogmentor_read_more_text ) . '</a>';
						} else {
							$blogmentor_read_more = '';
						}
							echo wp_kses_post( wp_trim_words( $blogmentor_content, $settings['excerpt_length'], $blogmentor_read_more ) );
					}
					?>
					</div>
				</div>
				<?php
			}
			?>
			</div>
		<?php
		endwhile;
		wp_reset_postdata();
	?>
	</div>
</div>
