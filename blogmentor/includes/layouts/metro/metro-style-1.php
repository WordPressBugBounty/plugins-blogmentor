<?php
/**
 * Metro layout, style 1.
 *
 * @package Blogmentor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$blogmentor_upl_all_post   = $blog_posts->posts;
$blogmentor_total_upl_post = count( $blogmentor_upl_all_post );
$blogmentor_i              = 0;
?>
	<div class="upl-main">
		<div class="upl-container">
			<?php
			if ( $blogmentor_total_upl_post > 0 ) {
				?>
				<div class="upl-left-section bm_content_box">
				<?php
				if ( has_post_thumbnail( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) {
					$blogmentor_thumbimg = wp_get_attachment_url( get_post_thumbnail_id( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) );
				} else {
					$blogmentor_thumbimg = BLOGMENTOR_URL . 'assets/images/placeholder.jpg';
				}
				?>
				<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
					<div class="upl-image" style="background-image: url('<?php echo esc_url( $blogmentor_thumbimg ); ?>')"></div>
				</div>
				<div class="upl-author"><img src="<?php echo esc_url( get_avatar_url( $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>" alt="<?php echo esc_attr( get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>"></div>
				<?php
				if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
					$blogmentor_title_link = esc_html( wp_trim_words( $blogmentor_upl_all_post[ $blogmentor_i ]->post_title, 12, null ) );

					if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
						$blogmentor_title_link = '<a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
					}
					echo '<div class="upl-title bm_title">' . wp_kses_post( $blogmentor_title_link ) . '</div>';
				}
				if ( isset( $settings['show_metro_excerpt'] ) && 'yes' === $settings['show_metro_excerpt'] ) {
					$blogmentor_content = blogmentor_get_post_text( $blogmentor_upl_all_post[ $blogmentor_i ], isset( $settings['metro_excerpt_from'] ) ? $settings['metro_excerpt_from'] : 'content' );

					if ( isset( $settings['show_metro_read_more'] ) && 'yes' === $settings['show_metro_read_more'] ) {
						$blogmentor_metro_read_more_text = empty( $settings['metro_metro_read_more_text'] ) ? __( 'Read More »', 'blogmentor' ) : $settings['metro_metro_read_more_text'];
						$blogmentor_read_more            = ' <a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark" class="entry-read-more">' . esc_html( $blogmentor_metro_read_more_text ) . '</a>';
					} else {
						$blogmentor_read_more = '';
					}
					?>
					<div class="upl-excerpt bm_content"> <?php echo wp_kses_post( wp_trim_words( $blogmentor_content, 30, $blogmentor_read_more ) ); ?> </div>
					<?php
				}
				if ( isset( $settings['show_meta_data'] ) && 'yes' === $settings['show_meta_data'] ) {
					?>
					<div class="upl-cat-date bm_meta">
						<?php
						$blogmentor_post_author = get_the_author_meta( 'first_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						if ( empty( $blogmentor_post_author ) ) {
							$blogmentor_post_author = get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						}
						if ( 'MDY' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'ymd' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'Y-m-d', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'mdy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'm/d/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'dmy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'd/m/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} else {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						}
						if ( ! empty( $blogmentor_post_author ) && ! empty( $blogmentor_post_date ) ) {
							echo esc_html( $blogmentor_post_author . ' | ' . $blogmentor_post_date );
						} else {
							echo esc_html( $blogmentor_post_author . ' ' . $blogmentor_post_date );
						}
						?>
					</div>
					<?php
				}
				?>
			</div>
				<?php
				++$blogmentor_i;
			}
			?>

			<?php
			if ( $blogmentor_total_upl_post > 1 ) {

				if ( has_post_thumbnail( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) {
					$blogmentor_thumbimg = wp_get_attachment_url( get_post_thumbnail_id( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) );
				} else {
					$blogmentor_thumbimg = BLOGMENTOR_URL . 'assets/images/placeholder.jpg';
				}

				?>
			<div class="upl-right-section">
				<div class="upl-top bm_content_box">
					<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
						<div class="upl-image" style="background-image: url('<?php echo esc_url( $blogmentor_thumbimg ); ?>')"></div>
					</div>
					<div class="upl-author">
						<img src="<?php echo esc_url( get_avatar_url( $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>" alt="<?php echo esc_attr( get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>">
					</div>
					<?php
					if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
						$blogmentor_title_link = esc_html( wp_trim_words( $blogmentor_upl_all_post[ $blogmentor_i ]->post_title, 15, null ) );
						if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
							$blogmentor_title_link = '<a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
						}
						echo '<div class="upl-title bm_title">' . wp_kses_post( $blogmentor_title_link ) . '</div>';
					}
					if ( isset( $settings['show_metro_excerpt'] ) && 'yes' === $settings['show_metro_excerpt'] ) {
						$blogmentor_content = blogmentor_get_post_text( $blogmentor_upl_all_post[ $blogmentor_i ], isset( $settings['metro_excerpt_from'] ) ? $settings['metro_excerpt_from'] : 'content' );
						if ( isset( $settings['show_metro_read_more'] ) && 'yes' === $settings['show_metro_read_more'] ) {
							$blogmentor_metro_read_more_text = empty( $settings['metro_read_more_text'] ) ? __( 'Read More »', 'blogmentor' ) : $settings['metro_read_more_text'];
							$blogmentor_read_more            = ' <a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark" class="entry-read-more">' . esc_html( $blogmentor_metro_read_more_text ) . '</a>';
						} else {
							$blogmentor_read_more = '';
						}
						?>
						<div class="upl-excerpt bm_content"> <?php echo wp_kses_post( wp_trim_words( $blogmentor_content, 12, $blogmentor_read_more ) ); ?> </div>
						<?php
					}
					if ( isset( $settings['show_meta_data'] ) && 'yes' === $settings['show_meta_data'] ) {
						?>
						<div class="upl-cat-date bm_meta">
						<?php
							$blogmentor_post_author = get_the_author_meta( 'first_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						if ( empty( $blogmentor_post_author ) ) {
							$blogmentor_post_author = get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						}
						if ( 'MDY' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'ymd' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'Y-m-d', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'mdy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'm/d/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'dmy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'd/m/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} else {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						}
						if ( ! empty( $blogmentor_post_author ) && ! empty( $blogmentor_post_date ) ) {
							echo esc_html( $blogmentor_post_author . ' | ' . $blogmentor_post_date );
						} else {
							echo esc_html( $blogmentor_post_author . ' ' . $blogmentor_post_date );
						}
						?>
						</div>
						<?php
					}
					?>
				</div>
				<?php
				++$blogmentor_i;
			}

			if ( $blogmentor_total_upl_post > 2 ) {
				if ( has_post_thumbnail( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) {
					$blogmentor_thumbimg = wp_get_attachment_url( get_post_thumbnail_id( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) );
				} else {
					$blogmentor_thumbimg = BLOGMENTOR_URL . 'assets/images/placeholder.jpg';
				}
				?>
				<div class="upl-bottom bm_content_box">
					<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
						<div class="upl-image" style="background-image: url('<?php echo esc_url( $blogmentor_thumbimg ); ?>')"></div>
					</div>
					<div class="upl-author">
						<img src="<?php echo esc_url( get_avatar_url( $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>" alt="<?php echo esc_attr( get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>">
					</div>
					<?php
					if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
						$blogmentor_title_link = esc_html( wp_trim_words( $blogmentor_upl_all_post[ $blogmentor_i ]->post_title, 15, null ) );
						if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
							$blogmentor_title_link = '<a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
						}
						echo '<div class="upl-title bm_title">' . wp_kses_post( $blogmentor_title_link ) . '</div>';
					}
					if ( isset( $settings['show_metro_excerpt'] ) && 'yes' === $settings['show_metro_excerpt'] ) {
						$blogmentor_content = blogmentor_get_post_text( $blogmentor_upl_all_post[ $blogmentor_i ], isset( $settings['metro_excerpt_from'] ) ? $settings['metro_excerpt_from'] : 'content' );

						if ( isset( $settings['show_metro_read_more'] ) && 'yes' === $settings['show_metro_read_more'] ) {
							$blogmentor_metro_read_more_text = empty( $settings['metro_read_more_text'] ) ? __( 'Read More »', 'blogmentor' ) : $settings['metro_read_more_text'];
							$blogmentor_read_more            = ' <a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark" class="entry-read-more">' . esc_html( $blogmentor_metro_read_more_text ) . '</a>';
						} else {
							$blogmentor_read_more = '';
						}
						?>
						<div class="upl-excerpt bm_content"> <?php echo wp_kses_post( wp_trim_words( $blogmentor_content, 12, $blogmentor_read_more ) ); ?> </div>
						<?php
					}
					if ( isset( $settings['show_meta_data'] ) && 'yes' === $settings['show_meta_data'] ) {
						?>
						<div class="upl-cat-date bm_meta">
						<?php
							$blogmentor_post_author = get_the_author_meta( 'first_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						if ( empty( $blogmentor_post_author ) ) {
							$blogmentor_post_author = get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
						}
						if ( 'MDY' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'ymd' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'Y-m-d', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'mdy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'm/d/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} elseif ( 'dmy' === $settings['date_format'] ) {
							$blogmentor_post_date = get_the_date( 'd/m/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						} else {
							$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
						}
						if ( ! empty( $blogmentor_post_author ) && ! empty( $blogmentor_post_date ) ) {
							echo esc_html( $blogmentor_post_author . ' | ' . $blogmentor_post_date );
						} else {
							echo esc_html( $blogmentor_post_author . ' ' . $blogmentor_post_date );
						}
						?>
						</div>
					<?php } ?>
				</div>
				<?php
				++$blogmentor_i;
			}
			?>
			</div>
		</div>
	</div>

	<div class="upl-second-section">
		<?php
		for ( $blogmentor_i = 3; $blogmentor_i < $blogmentor_total_upl_post; $blogmentor_i++ ) {

			if ( has_post_thumbnail( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) {
				$blogmentor_thumbimg = wp_get_attachment_url( get_post_thumbnail_id( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) );
			} else {
				$blogmentor_thumbimg = BLOGMENTOR_URL . 'assets/images/placeholder.jpg';
			}
			?>
			<div class="upl-second bm_content_box">
				<div <?php echo $this->get_render_attribute_string( 'post-image-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?>>
					<div class="upl-image" style="background-image: url('<?php echo esc_url( $blogmentor_thumbimg ); ?>')"></div>
				</div>
				<div class="upl-author">
					<img src="<?php echo esc_url( get_avatar_url( $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>" alt="<?php echo esc_attr( get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author ) ); ?>">
				</div>
				<?php
				if ( isset( $settings['show_title'] ) && 'yes' === $settings['show_title'] ) {
					$blogmentor_title_link = esc_html( wp_trim_words( $blogmentor_upl_all_post[ $blogmentor_i ]->post_title, 15, null ) );

					if ( isset( $settings['show_title_link'] ) && 'yes' === $settings['show_title_link'] ) {
						$blogmentor_title_link = '<a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark">' . $blogmentor_title_link . '</a>';
					}
					echo '<div class="upl-title bm_title">' . wp_kses_post( $blogmentor_title_link ) . '</div>';
				}

				if ( isset( $settings['show_metro_excerpt'] ) && 'yes' === $settings['show_metro_excerpt'] ) {
					$blogmentor_content = blogmentor_get_post_text( $blogmentor_upl_all_post[ $blogmentor_i ], isset( $settings['metro_excerpt_from'] ) ? $settings['metro_excerpt_from'] : 'content' );
					if ( isset( $settings['show_metro_read_more'] ) && 'yes' === $settings['show_metro_read_more'] ) {
						$blogmentor_metro_read_more_text = empty( $settings['metro_read_more_text'] ) ? __( 'Read More »', 'blogmentor' ) : $settings['metro_read_more_text'];
						$blogmentor_read_more            = ' <a href="' . esc_url( get_permalink( $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) ) . '" rel="bookmark" class="entry-read-more">' . esc_html( $blogmentor_metro_read_more_text ) . '</a>';
					} else {
						$blogmentor_read_more = '';
					}
					?>
					<div class="upl-excerpt bm_content"> <?php echo wp_kses_post( wp_trim_words( $blogmentor_content, 12, $blogmentor_read_more ) ); ?> </div>
					<?php
				}
				if ( isset( $settings['show_meta_data'] ) && 'yes' === $settings['show_meta_data'] ) {
					?>
					<div class="upl-cat-date bm_meta">
					<?php
						$blogmentor_post_author = get_the_author_meta( 'first_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
					if ( empty( $blogmentor_post_author ) ) {
						$blogmentor_post_author = get_the_author_meta( 'display_name', $blogmentor_upl_all_post[ $blogmentor_i ]->post_author );
					}
					if ( 'MDY' === $settings['date_format'] ) {
						$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
					} elseif ( 'ymd' === $settings['date_format'] ) {
						$blogmentor_post_date = get_the_date( 'Y-m-d', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
					} elseif ( 'mdy' === $settings['date_format'] ) {
						$blogmentor_post_date = get_the_date( 'm/d/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
					} elseif ( 'dmy' === $settings['date_format'] ) {
						$blogmentor_post_date = get_the_date( 'd/m/Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
					} else {
						$blogmentor_post_date = get_the_date( 'F j, Y', $blogmentor_upl_all_post[ $blogmentor_i ]->ID ) . ' ';
					}
					if ( ! empty( $blogmentor_post_author ) && ! empty( $blogmentor_post_date ) ) {
						echo esc_html( $blogmentor_post_author . ' | ' . $blogmentor_post_date );
					} else {
						echo esc_html( $blogmentor_post_author . ' ' . $blogmentor_post_date );
					}
					?>
					</div>
				<?php } ?>
			</div>
		<?php } ?>
	</div>
<?php
wp_reset_postdata();
