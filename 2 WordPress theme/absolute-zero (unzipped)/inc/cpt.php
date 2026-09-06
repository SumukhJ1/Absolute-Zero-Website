<?php
/**
 * Custom post types and taxonomies.
 *
 * Five content types cover everything the team edits regularly:
 *   az_workshop  a session, filed under a season
 *   az_member    a student, coach or mentor
 *   az_sponsor   a supporter, with a tier
 *   az_program   one of the outreach programmes
 *   az_resource  one item in the Open Access library
 *   az_result    one competition event and its awards
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

add_action( 'init', 'az_register_content' );
function az_register_content() {

	$common = array(
		'public'             => true,
		'publicly_queryable' => false,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'show_in_rest'       => true,
		'has_archive'        => false,
		'hierarchical'       => false,
		'menu_position'      => 21,
		'supports'           => array( 'title', 'editor', 'thumbnail', 'page-attributes', 'excerpt' ),
	);

	/* --- Workshops ---------------------------------------------------- */
	register_post_type( 'az_workshop', array_merge( $common, array(
		'labels' => az_labels( 'Workshop', 'Workshops' ),
		'menu_icon'          => 'dashicons-groups',
		'publicly_queryable' => true,
		'has_archive'        => 'workshops',
		'rewrite'            => array( 'slug' => 'outreach/workshop', 'with_front' => false ),
	) ) );

	register_taxonomy( 'az_season', array( 'az_workshop', 'az_result' ), array(
		'labels'            => az_labels( 'Season', 'Seasons' ),
		'hierarchical'      => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'public'            => true,
		'rewrite'           => array( 'slug' => 'season', 'with_front' => false ),
	) );

	/* --- Roster -------------------------------------------------------- */
	register_post_type( 'az_member', array_merge( $common, array(
		'labels'    => az_labels( 'Team member', 'Team members' ),
		'menu_icon' => 'dashicons-id',
		'supports'  => array( 'title', 'editor', 'thumbnail', 'page-attributes' ),
	) ) );

	register_taxonomy( 'az_group', array( 'az_member' ), array(
		'labels'            => az_labels( 'Group', 'Groups' ),
		'hierarchical'      => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'public'            => false,
		'show_ui'           => true,
	) );

	register_taxonomy( 'az_role', array( 'az_member' ), array(
		'labels'            => az_labels( 'Role', 'Roles' ),
		'hierarchical'      => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'public'            => false,
		'show_ui'           => true,
	) );

	/* --- Sponsors ------------------------------------------------------ */
	register_post_type( 'az_sponsor', array_merge( $common, array(
		'labels'    => az_labels( 'Sponsor', 'Sponsors' ),
		'menu_icon' => 'dashicons-awards',
		'supports'  => array( 'title', 'thumbnail', 'page-attributes' ),
	) ) );

	register_taxonomy( 'az_tier', array( 'az_sponsor' ), array(
		'labels'            => az_labels( 'Tier', 'Tiers' ),
		'hierarchical'      => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'public'            => false,
		'show_ui'           => true,
	) );

	/* --- Outreach programmes ------------------------------------------- */
	register_post_type( 'az_program', array_merge( $common, array(
		'labels'             => az_labels( 'Programme', 'Programmes' ),
		'menu_icon'          => 'dashicons-networking',
		'publicly_queryable' => true,
		'rewrite'            => array( 'slug' => 'outreach', 'with_front' => false ),
	) ) );

	/* --- Open Access library ------------------------------------------- */
	register_post_type( 'az_resource', array_merge( $common, array(
		'labels'    => az_labels( 'Library item', 'Open Access library' ),
		'menu_icon' => 'dashicons-media-document',
		'supports'  => array( 'title', 'page-attributes' ),
	) ) );

	register_taxonomy( 'az_shelf', array( 'az_resource' ), array(
		'labels'            => az_labels( 'Shelf', 'Shelves' ),
		'hierarchical'      => true,
		'show_in_rest'      => true,
		'show_admin_column' => true,
		'public'            => false,
		'show_ui'           => true,
	) );

	/* --- Competition record --------------------------------------------- */
	register_post_type( 'az_result', array_merge( $common, array(
		'labels'    => az_labels( 'Event result', 'Competition record' ),
		'menu_icon' => 'dashicons-flag',
		'supports'  => array( 'title', 'page-attributes' ),
	) ) );
}

function az_labels( $single, $plural ) {
	return array(
		'name'               => $plural,
		'singular_name'      => $single,
		'add_new'            => sprintf( 'Add %s', strtolower( $single ) ),
		'add_new_item'       => sprintf( 'Add %s', strtolower( $single ) ),
		'edit_item'          => sprintf( 'Edit %s', strtolower( $single ) ),
		'new_item'           => sprintf( 'New %s', strtolower( $single ) ),
		'view_item'          => sprintf( 'View %s', strtolower( $single ) ),
		'search_items'       => sprintf( 'Search %s', strtolower( $plural ) ),
		'not_found'          => sprintf( 'No %s yet', strtolower( $plural ) ),
		'not_found_in_trash' => sprintf( 'No %s in the bin', strtolower( $plural ) ),
		'all_items'          => $plural,
		'menu_name'          => $plural,
	);
}

/* Ordering: everything the team maintains is manually ordered, because
   "newest first" is wrong for a roster and wrong for a tier list. */
add_action( 'pre_get_posts', function ( $q ) {
	if ( is_admin() || ! $q->is_main_query() ) {
		return;
	}
	if ( $q->is_post_type_archive( 'az_workshop' ) ) {
		$q->set( 'orderby', 'meta_value' );
		$q->set( 'meta_key', '_az_date_iso' );
		$q->set( 'order', 'DESC' );
		$q->set( 'posts_per_page', 24 );
	}
} );
