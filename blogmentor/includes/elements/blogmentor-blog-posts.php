<?php // phpcs:ignore WordPress.Files.FileName.InvalidClassFileName -- File name matches this plugin's existing require_once path in blogmentor.php; renaming would only be cosmetic.
/**
 * Blogmentor Elementor blog posts widget.
 *
 * @package Blogmentor
 */

namespace Elementor;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Elementor widget that renders a list of blog posts in grid, masonry, or metro layouts.
 */
class Blogmentor_Blog_Posts_Widget extends Widget_Base {

	/**
	 * Get the widget name.
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'blogmentor_blog_posts';
	}

	/**
	 * Get the widget title.
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Blog Posts', 'blogmentor' );
	}

	/**
	 * Get the widget icon.
	 *
	 * @return string Icon class name.
	 */
	public function get_icon() {
		return 'eicon-gallery-grid';
	}

	/**
	 * Get the widget categories.
	 *
	 * @return string[] Widget categories.
	 */
	public function get_categories() {
		return array( 'blogmentor' );
	}

	/**
	 * Adding the controls fields for the Blog Layout.
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'section_layout',
			array(
				'label' => __( 'Blog Layout', 'blogmentor' ),
			)
		);

		$this->add_control(
			'bm_blog_layout',
			array(
				'label'   => __( 'Layouts Type', 'blogmentor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'grid'    => __( 'Grid', 'blogmentor' ),
					'masonry' => __( 'Masonry', 'blogmentor' ),
					'metro'   => __( 'Metro', 'blogmentor' ),
				),
				'default' => 'grid',
			)
		);

		$this->add_control(
			'bm_blog_style',
			array(
				'label'     => __( 'Style', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'bm_blog_style_1' => __( 'Style 1', 'blogmentor' ),
					'bm_blog_style_2' => __( 'Style 2', 'blogmentor' ),
				),
				'default'   => 'bm_blog_style_1',
				'condition' => array( 'bm_blog_layout' => array( 'grid', 'masonry' ) ),
			)
		);

		$this->add_responsive_control(
			'bm_grid_columns',
			array(
				'label'              => __( 'Grid Columns', 'blogmentor' ),
				'type'               => Controls_Manager::SELECT,
				'default'            => '3',
				'tablet_default'     => '2',
				'mobile_default'     => '1',
				'options'            => array(
					'2' => '2',
					'3' => '3',
					'4' => '4',
				),
				'prefix_class'       => 'elementor-grid%s-',
				'frontend_available' => true,
				'selectors'          => array(
					'.elementor-msie {{WRAPPER}} .elementor-post-item' => 'width: calc( 100% / {{SIZE}} )',
				),
				'condition'          => array(
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_control(
			'bm_number_of_posts',
			array(
				'label'       => __( 'Number of Posts', 'blogmentor' ),
				'type'        => Controls_Manager::NUMBER,
				'description' => __( 'Set number of posts to display.', 'blogmentor' ),
				'default'     => 6,
				'min'         => 3,
				'max'         => 50,
				'step'        => 1,
			)
		);

		$this->add_control(
			'bm_post_image_size',
			array(
				'label'       => __( 'Image Size', 'blogmentor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'bm-post-thumb',
				'options'     => blogmentor_blog_layout_image_size(),
				'label_block' => false,
			)
		);

		$this->add_control(
			'show_image_effect',
			array(
				'label'     => __( 'Show Image Effect', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'label_off' => __( 'Off', 'blogmentor' ),
				'label_on'  => __( 'On', 'blogmentor' ),
			)
		);

		$this->add_control(
			'image_hover_effect',
			array(
				'label'     => __( 'Image Hover Effect', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'blur'       => __( 'Blur', 'blogmentor' ),
					'flashing'   => __( 'Flashing', 'blogmentor' ),
					'gray-scale' => __( 'Gray Scale', 'blogmentor' ),
					'opacity'    => __( 'Opacity', 'blogmentor' ),
					'shine'      => __( 'Shine', 'blogmentor' ),
				),
				'default'   => 'blur',
				'condition' => array(
					'show_image_effect' => 'yes',
				),
			)
		);

		$this->add_control(
			'show_title',
			array(
				'label'     => __( 'Show Title', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'label_off' => __( 'Off', 'blogmentor' ),
				'label_on'  => __( 'On', 'blogmentor' ),
				'separator' => 'before',
			)
		);

		$this->add_control(
			'show_title_link',
			array(
				'label'     => __( 'Show Title Link', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'default'   => 'yes',
				'label_off' => __( 'Off', 'blogmentor' ),
				'label_on'  => __( 'On', 'blogmentor' ),
				'condition' => array(
					'show_title' => 'yes',
				),
			)
		);

		$this->add_control(
			'title_tag',
			array(
				'label'     => __( 'Title HTML Tag', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'h1'   => 'H1',
					'h2'   => 'H2',
					'h3'   => 'H3',
					'h4'   => 'H4',
					'h5'   => 'H5',
					'h6'   => 'H6',
					'div'  => 'div',
					'span' => 'span',
					'p'    => 'p',
				),
				'default'   => 'h4',
				'condition' => array(
					'show_title'     => 'yes',
					'bm_blog_layout' => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'show_article_feed',
			array(
				'label'     => __( 'Post Content Feed', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'summary'   => __( 'Summary', 'blogmentor' ),
					'full_text' => __( 'Full Text', 'blogmentor' ),
				),
				'default'   => 'summary',
				'separator' => 'before',
				'condition' => array(
					'bm_blog_layout' => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'show_excerpt',
			array(
				'label'     => __( 'Excerpt', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'blogmentor' ),
				'label_off' => __( 'Hide', 'blogmentor' ),
				'default'   => 'yes',
				'condition' => array(
					'show_article_feed' => 'summary',
					'bm_blog_layout'    => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'excerpt_from',
			array(
				'label'     => __( 'Excerpt From', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'content' => __( 'Content', 'blogmentor' ),
					'excerpt' => __( 'Excerpt', 'blogmentor' ),
				),
				'default'   => 'content',
				'condition' => array(
					'show_article_feed' => 'summary',
					'show_excerpt'      => 'yes',
					'bm_blog_layout'    => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'excerpt_length',
			array(
				'label'     => __( 'Excerpt Length', 'blogmentor' ),
				'type'      => Controls_Manager::NUMBER,
				// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound -- Intentionally reads WordPress core's own `excerpt_length` filter (used by wp_trim_excerpt()) to seed this control's default from the site's configured excerpt length; this is not a new hook definition.
				'default'   => apply_filters( 'excerpt_length', 25 ),
				'condition' => array(
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
					'bm_blog_layout'    => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'show_read_more',
			array(
				'label'     => __( 'Read More', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'blogmentor' ),
				'label_off' => __( 'Hide', 'blogmentor' ),
				'default'   => 'yes',
				'separator' => 'before',
				'condition' => array(
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
					'bm_blog_layout'    => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'read_more_text',
			array(
				'label'     => __( 'Read More Text', 'blogmentor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Read More »', 'blogmentor' ),
				'condition' => array(
					'show_read_more'    => 'yes',
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
					'bm_blog_layout'    => array( 'grid', 'masonry' ),
				),
			)
		);

		$this->add_control(
			'show_metro_excerpt',
			array(
				'label'     => __( 'Excerpt', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'blogmentor' ),
				'label_off' => __( 'Hide', 'blogmentor' ),
				'default'   => 'yes',
				'separator' => 'before',
				'condition' => array( 'bm_blog_layout' => 'metro' ),
			)
		);

		$this->add_control(
			'show_meta_data',
			array(
				'label'     => __( 'Show Meta Data', 'blogmentor' ),
				'type'      => Controls_Manager::SWITCHER,
				'label_on'  => __( 'Show', 'blogmentor' ),
				'label_off' => __( 'Hide', 'blogmentor' ),
				'default'   => 'yes',
				'separator' => 'before',
			)
		);

		$this->add_control(
			'meta_data',
			array(
				'label'       => __( 'Meta Data', 'blogmentor' ),
				'label_block' => true,
				'type'        => Controls_Manager::SELECT2,
				'default'     => array( 'author', 'date', 'comments', 'tags', 'category' ),
				'multiple'    => true,
				'condition'   => array(
					'show_meta_data' => 'yes',
					'bm_blog_layout' => array( 'grid', 'masonry' ),
				),
				'options'     => array(
					'author'   => __( 'Author', 'blogmentor' ),
					'date'     => __( 'Date', 'blogmentor' ),
					'comments' => __( 'Comments', 'blogmentor' ),
					'tags'     => __( 'Tags', 'blogmentor' ),
					'category' => __( 'Category', 'blogmentor' ),
				),
			)
		);

		$this->add_control(
			'date_format',
			array(
				'label'     => __( 'Date Format', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'MDY' => __( 'Month Date, Year', 'blogmentor' ),
					'ymd' => __( 'YYYY-MM-DD', 'blogmentor' ),
					'mdy' => __( 'MM/DD/YYYY', 'blogmentor' ),
					'dmy' => __( 'DD/MM/YYYY', 'blogmentor' ),
				),
				'default'   => 'MDY',
				'separator' => 'before',
			)
		);

		$this->add_control(
			'pagination_type',
			array(
				'label'     => __( 'Pagination Type', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'no_pagination' => __( 'No Pagination', 'blogmentor' ),
					'paged'         => __( 'Paged', 'blogmentor' ),
				),
				'default'   => 'no_pagination',
				'separator' => 'before',
			)
		);

		$this->add_control(
			'pagination_style',
			array(
				'label'     => __( 'Pagination Style', 'blogmentor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'pagination_style_1' => __( 'Style 1', 'blogmentor' ),
					'pagination_style_2' => __( 'Style 2', 'blogmentor' ),
				),
				'default'   => 'pagination_style_1',
				'condition' => array(
					'pagination_type' => 'paged',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_post_query',
			array(
				'label' => __( 'Query', 'blogmentor' ),
			)
		);

		$this->add_control(
			'blog_categories',
			array(
				'label'       => __( 'Categories', 'blogmentor' ),
				'type'        => Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple'    => true,
				'description' => __( 'Select the categories you want to show', 'blogmentor' ),
				'options'     => blogmentor_blog_elements_post_categories(),
			)
		);

		$this->add_control(
			'blog_tag',
			array(
				'label'       => __( 'Tags', 'blogmentor' ),
				'type'        => Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple'    => true,
				'description' => __( 'Select the tags you want to show', 'blogmentor' ),
				'options'     => blogmentor_blog_elements_post_tags(),
			)
		);

		$this->add_control(
			'post_author',
			array(
				'label'       => __( 'Authors', 'blogmentor' ),
				'type'        => Controls_Manager::SELECT2,
				'label_block' => true,
				'multiple'    => true,
				'description' => __( 'Select the authors you want to show', 'blogmentor' ),
				'options'     => blogmentor_blog_elements_post_author(),
			)
		);

		$this->add_control(
			'advanced',
			array(
				'label' => __( 'Advanced', 'blogmentor' ),
				'type'  => Controls_Manager::HEADING,
			)
		);

		$this->add_control(
			'post_order_by',
			array(
				'label'   => __( 'Order By', 'blogmentor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'post_date',
				'options' => array(
					'post_date'   => __( 'Publish Date', 'blogmentor' ),
					'ID'          => __( 'ID', 'blogmentor' ),
					'post_title'  => __( 'Title', 'blogmentor' ),
					'post_author' => __( 'Author', 'blogmentor' ),
					'rand'        => __( 'Random', 'blogmentor' ),
				),
			)
		);

		$this->add_control(
			'post_sort_order',
			array(
				'label'   => __( 'Sort By', 'blogmentor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'desc',
				'options' => array(
					'desc' => __( 'DESC', 'blogmentor' ),
					'asc'  => __( 'ASC', 'blogmentor' ),
				),
			)
		);

		$this->end_controls_section();

		/*
		 * End Blog Layouts control
		 */

		/*
		 * Start control style tab for Blog Layouts
		 * Start name control style
		 */
		$this->start_controls_section(
			'section_design_layout',
			array(
				'label'     => __( 'Layout', 'blogmentor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_control(
			'post_card_grid_gap',
			array(
				'label'              => __( 'Grid Gap', 'blogmentor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'size' => 10,
				),
				'range'              => array(
					'px' => array(
						'min' => 10,
						'max' => 100,
					),
				),
				'frontend_available' => true,
				'selectors'          => array(
					'{{WRAPPER}} .bm_layout, {{WRAPPER}} .grid-style-2' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}};',
				),
				'condition'          => array(
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_control(
			'post_card_row_gap',
			array(
				'label'              => __( 'Rows Gap', 'blogmentor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'size' => 35,
				),
				'range'              => array(
					'px' => array(
						'min' => 0,
						'max' => 100,
					),
				),
				'frontend_available' => true,
				'selectors'          => array(
					'{{WRAPPER}} .blog-layout-container, {{WRAPPER}} .grid-style-2,
					 {{WRAPPER}} .bm_layout' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition'          => array(
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_control(
			'alignment',
			array(
				'label'        => __( 'Alignment', 'blogmentor' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => array(
					'left'    => array(
						'title' => __( 'Left', 'blogmentor' ),
						'icon'  => 'eicon-text-align-left',
					),
					'center'  => array(
						'title' => __( 'Center', 'blogmentor' ),
						'icon'  => 'eicon-text-align-center',
					),
					'right'   => array(
						'title' => __( 'Right', 'blogmentor' ),
						'icon'  => 'eicon-text-align-right',
					),
					'justify' => array(
						'title' => __( 'Justify', 'blogmentor' ),
						'icon'  => 'eicon-text-align-justify',
					),
				),
				'default'      => 'left',
				'prefix_class' => 'elementor-posts--align-',
				'selectors'    => array(
					'{{WRAPPER}} .blog-layout-alignment,
					 {{WRAPPER}} .card_align,
					 {{WRAPPER}} .card-category,
					 {{WRAPPER}} .bm_content_box' => 'text-align: {{VALUE}};',
				),
				'condition'    => array(
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->end_controls_section();

		/*Post Featured Image*/
		$this->start_controls_section(
			'section_design_image_layout',
			array(
				'label'     => __( 'Image', 'blogmentor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'bm_blog_style' => array( 'bm_blog_style_1', 'bm_blog_style_2' ),
				),
			)
		);

		$this->add_control(
			'img_border_radius',
			array(
				'label'      => __( 'Border Radius', 'blogmentor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .blog-layout-item_img, {{WRAPPER}} .wp-post-image, {{WRAPPER}} .bm-hover-effect' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);
		/*Post Featured Image*/

		$this->end_controls_section();

		$this->start_controls_section(
			'section_design_content_bg',
			array(
				'label'     => __( 'Background Color', 'blogmentor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'bm_blog_style' => array( 'bm_blog_style_1', 'bm_blog_style_2' ),
				),
			)
		);

		$this->add_control(
			'content_box_bg_color',
			array(
				'label'     => __( 'Content Box Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .bm_content_box,
				 {{WRAPPER}} .blog-layout-content-bg-box' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_design_content',
			array(
				'label' => __( 'Content', 'blogmentor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'heading_title_style',
			array(
				'label'     => __( 'Title', 'blogmentor' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array( 'show_title' => 'yes' ),
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .bm_title,
                {{WRAPPER}} .bm_title a' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_title' => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'title_typography',
				'selector'  => '{{WRAPPER}} .bm_title, .bm_title a',
				'condition' => array(
					'show_title' => 'yes',
				),
			)
		);

		$this->add_control(
			'title_spacing',
			array(
				'label'     => __( 'Spacing', 'blogmentor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max' => 100,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .bm_title' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition' => array(
					'show_title' => 'yes',
				),
			)
		);

		$this->add_control(
			'heading_excerpt_style',
			array(
				'label'     => __( 'Excerpt', 'blogmentor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'show_excerpt'       => 'yes',
					'show_metro_excerpt' => 'yes',
				),
			)
		);

		$this->add_control(
			'excerpt_color',
			array(
				'label'     => __( 'Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .bm_content' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_excerpt'       => 'yes',
					'show_metro_excerpt' => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'excerpt_typography',
				'selector'  => '{{WRAPPER}} .bm_content',
				'condition' => array(
					'show_excerpt'       => 'yes',
					'show_metro_excerpt' => 'yes',
				),
			)
		);

		$this->add_control(
			'excerpt_spacing',
			array(
				'label'     => __( 'Spacing', 'blogmentor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max' => 100,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .bm_content' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition' => array(
					'show_excerpt'       => 'yes',
					'show_metro_excerpt' => 'yes',
				),
			)
		);

		$this->add_control(
			'heading_readmore_style',
			array(
				'label'     => __( 'Read More', 'blogmentor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'show_read_more'    => 'yes',
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
				),
			)
		);

		$this->add_control(
			'read_more_color',
			array(
				'label'     => __( 'Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .entry-read-more' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_read_more'    => 'yes',
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'read_more_typography',
				'selector'  => '{{WRAPPER}} .entry-read-more',
				'condition' => array(
					'show_read_more'    => 'yes',
					'show_excerpt'      => 'yes',
					'show_article_feed' => 'summary',
				),
			)
		);

		$this->add_control(
			'heading_metro_readmore_style',
			array(
				'label'     => __( 'Read More', 'blogmentor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'show_metro_read_more' => 'yes',
					'metro_excerpt_from'   => 'yes',
				),
			)
		);

		$this->add_control(
			'metro_read_more_color',
			array(
				'label'     => __( 'Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .entry-read-more' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_metro_read_more' => 'yes',
					'metro_excerpt_from'   => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'metro_read_more_typography',
				'selector'  => '{{WRAPPER}} .entry-read-more',
				'condition' => array(
					'show_metro_read_more' => 'yes',
					'metro_excerpt_from'   => 'yes',
				),
			)
		);

		$this->add_control(
			'heading_meta_style',
			array(
				'label'     => __( 'Meta', 'blogmentor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array( 'show_meta_data' => 'yes' ),
			)
		);

		$this->add_control(
			'meta_color',
			array(
				'label'     => __( 'Icon Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .bm_meta span .fas,
					{{WRAPPER}} .bm_meta span .fa,
					{{WRAPPER}} .fa-tags:before,
					{{WRAPPER}} .fa-comments:before,
					{{WRAPPER}} .fa-clock:before,
					{{WRAPPER}} .fa-user:before,
					{{WRAPPER}} .fa-list-alt:before' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_meta_data' => 'yes',
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_control(
			'meta_separator_color',
			array(
				'label'     => __( 'Text Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .comments-link,
					{{WRAPPER}} .bm_meta,
					{{WRAPPER}} .bm_meta span,
					{{WRAPPER}} .bm_meta a' => 'color: {{VALUE}};',
				),
				'condition' => array( 'show_meta_data' => 'yes' ),
			)
		);

		$this->add_control(
			'meta_hover_color',
			array(
				'label'     => __( 'Hover Color', 'blogmentor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .bm_meta a:hover' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'show_meta_data' => 'yes',
					'bm_blog_layout' => 'grid',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'meta_typography',
				'selector'  => '{{WRAPPER}} .comments-link, {{WRAPPER}} .bm_meta, {{WRAPPER}} .bm_meta span, {{WRAPPER}} .bm_meta a',
				'condition' => array( 'show_meta_data' => 'yes' ),
			)
		);

		$this->add_control(
			'meta_spacing',
			array(
				'label'     => __( 'Spacing', 'blogmentor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max' => 100,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .bm_meta' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition' => array( 'show_meta_data' => 'yes' ),
			)
		);

		$this->end_controls_section();

		/*
		 * End control style tab for Blog Layouts.
		 */
	}

	/**
	 * Render Blogmentor widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @access protected
	 */
	protected function render() {
		$settings   = $this->get_settings_for_display();
		$card_style = $settings['bm_blog_style'];
		if ( ! empty( $settings['bm_blog_layout'] ) && 'grid' === $settings['bm_blog_layout'] ) {
			if ( '2' === $settings['bm_grid_columns'] ) {
				$column = 'elementor-grid-2';
			} elseif ( '3' === $settings['bm_grid_columns'] ) {
				$column = 'elementor-grid-3';
			} elseif ( '4' === $settings['bm_grid_columns'] ) {
				$column = 'elementor-grid-4';
			} else {
				$column = '';
			}
		} elseif ( ! empty( $settings['bm_blog_layout'] ) && 'masonry' === $settings['bm_blog_layout'] ) {
			$column = 'elementor-grid-3';
		} else {
			$column = '';
		}

		$this->add_render_attribute( 'blog-posts-wrapper', 'class', 'bm-blog-posts-wrapper' );

		/* Blog Post Display Type */
		$this->add_render_attribute( 'blog-posts-inner-wrapper', 'class', 'bm-blog-posts' );
		$this->add_render_attribute( 'blog-posts-inner-wrapper', 'class', 'bm-display-grid elementor-grid' );
		$this->add_render_attribute( 'blog-posts-inner-wrapper', 'class', $column );

		$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-post-image clearfix' );
		$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-hover-effect' );
		if ( isset( $settings['image_hover_effect'] ) && '' !== $settings['image_hover_effect'] ) {
			$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-hover-effect-' . $settings['image_hover_effect'] );

			/* Zoom Hover Effect Set */
			if ( 'zoom-in' === $settings['image_hover_effect'] || 'zoom-out' === $settings['image_hover_effect'] ) {
				$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-' . $settings['image_zoom_effect'] );
			}

			/* Slider Hover Effect Set */
			if ( 'slide' === $settings['image_hover_effect'] ) {
				$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-' . $settings['image_slider_effect'] );
			}

			/* rotate Hover Effect Set */
			if ( 'rotate' === $settings['image_hover_effect'] ) {
				$this->add_render_attribute( 'post-image-wrapper', 'class', 'bm-' . $settings['image_rotate_effect'] );
			}
		}

		$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
		$args  = array(
			'post_type'      => 'post',
			'posts_per_page' => $settings['bm_number_of_posts'],
			'post_status'    => 'publish',
			'orderby'        => $settings['post_order_by'],
			'order'          => $settings['post_sort_order'],
			'author__in'     => $settings['post_author'],
			'paged'          => $paged,
		);
		if ( isset( $settings['blog_categories'] ) && ! empty( $settings['blog_categories'] ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'category',
				'field'    => 'ID',
				'terms'    => $settings['blog_categories'],
			);
		}
		if ( isset( $settings['blog_tag'] ) && ! empty( $settings['blog_tag'] ) ) {
			$args['tax_query'][] = array(
				'taxonomy' => 'post_tag',
				'field'    => 'ID',
				'terms'    => $settings['blog_tag'],
			);
		}
		$blog_posts              = new \WP_Query( $args );
		$total_pages             = $blog_posts->max_num_pages;
		$settings['args']        = $blog_posts;
		$settings['total_pages'] = $total_pages;

		if ( $blog_posts->have_posts() ) : ?>
		
				<?php
				if ( ! empty( $settings['bm_blog_layout'] ) && 'grid' === $settings['bm_blog_layout'] ) {
					?>
				<div <?php echo $this->get_render_attribute_string( 'blog-posts-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?> >
							<div <?php echo $this->get_render_attribute_string( 'blog-posts-inner-wrapper' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Elementor's get_render_attribute_string() escapes attribute values internally. ?> >
					<?php
					switch ( $settings['bm_blog_style'] ) {
						case 'bm_blog_style_1':
							include BLOGMENTOR_PATH . 'includes/layouts/grid/grid-style-1.php';
							break;
						case 'bm_blog_style_2':
							include BLOGMENTOR_PATH . 'includes/layouts/grid/grid-style-2.php';
							break;
						default:
							include BLOGMENTOR_PATH . 'includes/layouts/grid/grid-style-1.php';
							break;
					}
					?>
				</div></div>
					<?php
				} elseif ( ! empty( $settings['bm_blog_layout'] ) && 'masonry' === $settings['bm_blog_layout'] ) {

					switch ( $settings['bm_blog_style'] ) {
						case 'bm_blog_style_1':
							include BLOGMENTOR_PATH . 'includes/layouts/masonry/masonry-style-1.php';
							break;
						case 'bm_blog_style_2':
							include BLOGMENTOR_PATH . 'includes/layouts/masonry/masonry-style-2.php';
							break;
						default:
							include BLOGMENTOR_PATH . 'includes/layouts/masonry/masonry-style-1.php';
							break;
					}
				} elseif ( ! empty( $settings['bm_blog_layout'] ) && 'metro' === $settings['bm_blog_layout'] ) {

					include BLOGMENTOR_PATH . 'includes/layouts/metro/metro-style-1.php';
				}
				if ( isset( $settings['pagination_type'] ) && 'paged' === $settings['pagination_type'] ) {
					?>
			<div class="bm-pagination <?php echo esc_attr( $settings['pagination_style'] ); ?>">
					<?php echo wp_kses_post( blogmentor_post_pagination( $settings['total_pages'] ) ); ?>
			</div>
					<?php
				}
		endif;
	}
}

Plugin::instance()->widgets_manager->register_widget_type( new Blogmentor_Blog_Posts_Widget() );
