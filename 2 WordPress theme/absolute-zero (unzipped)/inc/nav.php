<?php
/**
 * The snowflake island's menu.
 *
 * A walker rather than wp_list_pages, so the team can reorder the bar in
 * Appearance to Menus. Labels stay short on purpose: the bar has to
 * render on one line at desktop.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

class AZ_Nav_Walker extends Walker_Nav_Menu {
	public function start_lvl( &$output, $depth = 0, $args = null ) {}
	public function end_lvl( &$output, $depth = 0, $args = null ) {}

	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		if ( $depth > 0 ) {
			return; /* the island is one level deep by design */
		}
		$current = in_array( 'current-menu-item', (array) $item->classes, true )
			|| in_array( 'current-menu-ancestor', (array) $item->classes, true )
			|| in_array( 'current_page_parent', (array) $item->classes, true );

		$output .= sprintf(
			'<li><a class="nav__link" href="%s"%s>%s</a></li>',
			esc_url( $item->url ),
			$current ? ' aria-current="page"' : '',
			esc_html( $item->title )
		);
	}

	public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}

/**
 * The label the collapsed snowflake keeps visible, so nobody loses the
 * menu when it contracts. Falls back through the menu, then the title.
 */
function az_current_label() {
	$menu_items = array();
	$locations  = get_nav_menu_locations();
	if ( ! empty( $locations['primary'] ) ) {
		$menu_items = wp_get_nav_menu_items( $locations['primary'] ) ?: array();
	}

	foreach ( $menu_items as $item ) {
		$classes = (array) $item->classes;
		if ( in_array( 'current-menu-item', $classes, true )
			|| in_array( 'current-menu-ancestor', $classes, true ) ) {
			return $item->attr_title ?: $item->title;
		}
	}

	if ( is_front_page() ) {
		return __( 'Home', 'absolute-zero' );
	}
	if ( is_singular( 'az_program' ) || is_post_type_archive( 'az_workshop' ) || is_singular( 'az_workshop' ) ) {
		return __( 'Outreach', 'absolute-zero' );
	}
	if ( is_search() ) {
		return __( 'Search', 'absolute-zero' );
	}
	if ( is_404() ) {
		return __( 'Not found', 'absolute-zero' );
	}
	$title = wp_strip_all_tags( get_the_title() );
	return $title !== '' ? $title : get_bloginfo( 'name' );
}

/** The fallback bar, used before the team has built a menu. */
function az_nav_fallback() {
	$links = array(
		'/'                      => __( 'Home', 'absolute-zero' ),
		'/mission-and-vision/'   => __( 'Mission', 'absolute-zero' ),
		'/our-team/'             => __( 'Team', 'absolute-zero' ),
		'/build-and-program/'    => __( 'Build', 'absolute-zero' ),
		'/outreach/'             => __( 'Outreach', 'absolute-zero' ),
		'/sponsors-and-donors/'  => __( 'Sponsors', 'absolute-zero' ),
		'/contact/'              => __( 'Contact', 'absolute-zero' ),
	);
	$path = untrailingslashit( wp_parse_url( add_query_arg( array() ), PHP_URL_PATH ) ) . '/';
	echo '<ul class="nav__links">';
	foreach ( $links as $href => $label ) {
		printf(
			'<li><a class="nav__link" href="%s"%s>%s</a></li>',
			esc_url( home_url( $href ) ),
			( $path === $href || ( '/' !== $href && str_starts_with( $path, $href ) ) ) ? ' aria-current="page"' : '',
			esc_html( $label )
		);
	}
	echo '</ul>';
}

/** Footer link lists are a plain stack of anchors, not a <ul>. */
class AZ_Foot_Walker extends Walker_Nav_Menu {
	public function start_lvl( &$output, $depth = 0, $args = null ) {}
	public function end_lvl( &$output, $depth = 0, $args = null ) {}
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		if ( $depth > 0 ) {
			return;
		}
		$output .= sprintf( '<a href="%s">%s</a>', esc_url( $item->url ), esc_html( $item->title ) );
	}
	public function end_el( &$output, $item, $depth = 0, $args = null ) {}
}

function az_foot_fallback( array $links ) {
	foreach ( $links as $href => $label ) {
		printf( '<a href="%s">%s</a>', esc_url( home_url( $href ) ), esc_html( $label ) );
	}
}

/**
 * The closing line. One word may be wrapped in <b> to take the accent
 * colour; the Customizer field accepts it.
 */
function az_footer_statement() {
	$raw = az_opt( 'az_footer_line' );
	$safe = esc_html( $raw );
	/* Highlight the phrase "built by students" when it is present, which
	   is what the shipped default says. */
	return str_replace( 'built by students', '<b>built by students</b>', $safe );
}
