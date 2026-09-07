<?php
/**
 * One stylesheet and one script. No webfonts.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', 'az_enqueue' );
function az_enqueue() {
	$css = AZ_DIR . '/assets/css/site.css';
	$js  = AZ_DIR . '/assets/js/site.js';

	wp_enqueue_style(
		'az-site',
		AZ_URI . '/assets/css/site.css',
		array(),
		file_exists( $css ) ? filemtime( $css ) : AZ_VERSION
	);

	wp_enqueue_script(
		'az-site',
		AZ_URI . '/assets/js/site.js',
		array(),
		file_exists( $js ) ? filemtime( $js ) : AZ_VERSION,
		array( 'strategy' => 'defer', 'in_footer' => true )
	);

	/* The theme ships no comment threads. */
	wp_dequeue_script( 'comment-reply' );
}

/* The type stack is Segoe UI with per-platform fallbacks, all of which are
   already installed on the reader's machine. Nothing is downloaded, so
   there is no font to preload, no flash of unstyled text, and no visitor
   IP address handed to a font CDN. */

/* The no-js to js swap has to happen before first paint, or the reveal
   animation's starting state flashes. */
add_action( 'wp_head', function () {
	echo "<script>document.documentElement.className=document.documentElement.className.replace('no-js','js');</script>\n";
}, 2 );

add_filter( 'language_attributes', function ( $output ) {
	return $output . ' class="no-js"';
} );

/* Give the block editor the same tokens, so what an author sees is what
   the page renders. */
add_action( 'enqueue_block_assets', function () {
	if ( ! is_admin() ) {
		return;
	}
	wp_enqueue_style( 'az-editor', AZ_URI . '/assets/css/site.css', array(), AZ_VERSION );
} );

/* Core block library CSS is not used by any template here. */
add_action( 'wp_enqueue_scripts', function () {
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' );
}, 20 );
