<?php
/**
 * Grid layout, style 1.
 *
 * @package Blogmentor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

while ( $blog_posts->have_posts() ) :
	$blog_posts->the_post();
	?>
	<article id="post-<?php the_ID(); ?>" <?php post_class( 'item bm_layout' ); ?>>
		<div class="bm-blog-post-image entry-post-image">
			<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
				<?php
				if ( has_post_thumbnail() ) {
					the_post_thumbnail( $settings['bm_post_image_size'] );
				} else {
					?>
					<img src="<?php echo esc_url( BLOGMENTOR_URL . 'assets/images/placeholder.jpg' ); ?>" alt="<?php esc_attr_e( 'Default Post Image', 'blogmentor' ); ?>"/>
					<?php
				}
				?>
			</div>
		</div>
		<div class="bm-blog-post-content bm_content_box">
			<?php
			if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
				$blogmentor_title_link = esc_html( get_the_title() );
				if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
					$blogmentor_title_link = '<a href="' . esc_url( get_permalink() ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
				}
				$blogmentor_title_tag = blogmentor_sanitize_title_tag( $settings['title_tag'] );
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $blogmentor_title_tag is whitelisted by blogmentor_sanitize_title_tag(); $blogmentor_title_link is built from escaped parts above.
				echo '<' . $blogmentor_title_tag . ' class="entry-post-title bm_title">' . $blogmentor_title_link . '</' . $blogmentor_title_tag . '>';
			}
			?>
			<div class="bm-blog-post-meta entry-post-meta bm_meta">
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
			<div class="entry-post-content bm_content">
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
						$blogmentor_read_more      = ' <div><a href="' . esc_url( get_permalink() ) . '" rel="bookmark" class="bm-read-more entry-read-more">' . esc_html( $blogmentor_read_more_text ) . '</a></div>';
					} else {
						$blogmentor_read_more = '';
					}
						echo wp_kses_post( wp_trim_words( strip_shortcodes( $blogmentor_content ), $settings['excerpt_length'], $blogmentor_read_more ) );
				}
				?>
			</div>
		</div>
	</article>
	<?php
endwhile;
wp_reset_postdata();
