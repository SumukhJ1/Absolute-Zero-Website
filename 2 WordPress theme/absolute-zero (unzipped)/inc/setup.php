<?php
/**
 * Theme supports, menus, image sizes.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

add_action( 'after_setup_theme', 'az_setup' );
function az_setup() {
	load_theme_textdomain( 'absolute-zero', AZ_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'custom-logo', array(
		'height'      => 96,
		'width'       => 96,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list',
		'gallery', 'caption', 'style', 'script', 'navigation-widgets',
	) );

	/* The palette the block editor offers, so pasted blocks stay on-brand. */
	add_theme_support( 'editor-color-palette', array(
		array( 'name' => __( 'Paper', 'absolute-zero' ),  'slug' => 'paper',  'color' => '#0b0d10' ),
		array( 'name' => __( 'Raised', 'absolute-zero' ), 'slug' => 'raised', 'color' => '#14181e' ),
		array( 'name' => __( 'Ink', 'absolute-zero' ),    'slug' => 'ink',    'color' => '#f3f6f9' ),
		array( 'name' => __( 'Muted', 'absolute-zero' ),  'slug' => 'muted',  'color' => '#b4bcc6' ),
		array( 'name' => __( 'Frost', 'absolute-zero' ),  'slug' => 'frost',  'color' => '#6a9fc5' ),
	) );
	add_theme_support( 'disable-custom-colors' );
	add_theme_support( 'disable-custom-gradients' );
	add_theme_support( 'disable-custom-font-sizes' );

	register_nav_menus( array(
		'primary' => __( 'Primary navigation (the snowflake island)', 'absolute-zero' ),
		'footer'  => __( 'Footer: explore', 'absolute-zero' ),
		'teams'   => __( 'Footer: for other teams', 'absolute-zero' ),
	) );

	/* Sizes chosen to match the layouts the templates actually use. */
	add_image_size( 'az-hero',     2000, 1200, true );
	add_image_size( 'az-wide',      960,  540, true );
	add_image_size( 'az-photo',    1000,  750, true );
	add_image_size( 'az-portrait',  640,  800, true );
	add_image_size( 'az-square',    560,  560, true );
	add_image_size( 'az-logo',      320,  140, false );
}

/* Content width, for embeds. */
add_action( 'after_setup_theme', function () {
	$GLOBALS['content_width'] = 736;
}, 0 );

/* The site is one column with no sidebar, by design. No widget areas. */

/* Strip the emoji script. The brief bans emoji; loading a polyfill for
   them would be an odd thing to ship on a site that has none. */
add_action( 'init', function () {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
	remove_action( 'admin_print_styles', 'print_emoji_styles' );
	remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
	remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
	remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
	add_filter( 'emoji_svg_url', '__return_false' );
} );

/* WordPress core's own head clutter that this theme replaces or does not use. */
add_action( 'init', function () {
	remove_action( 'wp_head', 'wp_generator' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wp_shortlink_wp_head' );
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10 );
} );

/* Typographic punctuation is applied at authoring time in this theme's own
   copy; wptexturize still handles anything the team types in the editor. */

/* Reading time and other noise are not part of this theme. */
