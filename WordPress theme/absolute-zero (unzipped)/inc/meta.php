<?php
/**
 * Meta boxes. No plugin dependency: a team should not need a paid field
 * plugin to change the date on a workshop.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_fields() {
	return array(
		'az_workshop' => array(
			'_az_venue'    => array( 'Venue', 'text', 'Where it happened. Shown next to a pin icon.' ),
			'_az_date'     => array( 'Date, as written', 'text', 'Free text, for example "March 2026" or "Autumn 2026".' ),
			'_az_date_iso' => array( 'Date, machine readable', 'date', 'Used for ordering and for search-engine event data. Leave blank for a planned session with no fixed date.' ),
			'_az_audience' => array( 'Audience', 'text', 'For example "Ages 7 to 13". Shown as a chip.' ),
			'_az_planned'  => array( 'Planned, not yet run', 'checkbox', 'Adds a "Planned" chip and keeps it out of the completed count.' ),
			'_az_summary'  => array( 'Summary', 'textarea', 'Always visible. Never hidden behind a read-more.' ),
			'_az_detail'   => array( 'Second paragraph', 'textarea', 'Optional.' ),
			'_az_plan'     => array( 'What we run', 'list', 'One item per line. Renders as a list under the summary.' ),
			'_az_video'    => array( 'Video link', 'url', 'Optional.' ),
		),
		'az_member' => array(
			'_az_line'  => array( 'Role line', 'text', 'For example "Mechanical build, driver".' ),
			'_az_bio'   => array( 'Biography', 'textarea', 'Coaches and mentors only. Students show the role line alone.' ),
			'_az_stale' => array( 'Photo needs replacing', 'checkbox', 'Flags this portrait in the admin list so it does not get forgotten.' ),
		),
		'az_sponsor' => array(
			'_az_url'  => array( 'Website', 'url', 'Optional. The logo links here when set.' ),
			'_az_kind' => array( 'Relationship', 'text', 'For example "Corporate" or "Program partner".' ),
		),
		'az_program' => array(
			'_az_blurb'   => array( 'One-line summary', 'textarea', 'Shown on the Outreach index.' ),
			'_az_lede'    => array( 'Opening paragraph', 'textarea', 'Shown at the top of the programme page.' ),
			'_az_kicker'  => array( 'Kicker', 'text', 'Optional short label above the heading.' ),
			'_az_facts'   => array( 'Quick facts', 'pairs', 'One per line, as "Label | Value".' ),
			'_az_featured'=> array( 'Show a photograph on the index', 'checkbox', 'Three programmes carry an image on the Outreach page.' ),
		),
		'az_resource' => array(
			'_az_season'  => array( 'Season or "Evergreen"', 'text', '' ),
			'_az_kind'    => array( 'Format', 'text', 'For example "PDF" or "Web".' ),
			'_az_file'    => array( 'File or link', 'url', 'Upload to the media library, then paste the URL. Leave blank to show a "file pending" state instead of a broken link.' ),
			'_az_size'    => array( 'File size', 'text', 'Optional, for example "4.2 MB".' ),
			'_az_external'=> array( 'Opens on another site', 'checkbox', '' ),
		),
		'az_result' => array(
			'_az_game'    => array( 'Game', 'text', 'For example "POWERPLAY".' ),
			'_az_years'   => array( 'Season years', 'text', 'For example "2022-2023".' ),
			'_az_awards'  => array( 'Awards and finishes', 'list', 'One per line.' ),
			'_az_note'    => array( 'Note', 'text', 'Optional, for example "Results being compiled".' ),
		),
	);
}

add_action( 'add_meta_boxes', function () {
	foreach ( az_fields() as $type => $fields ) {
		add_meta_box(
			'az_details',
			__( 'Details', 'absolute-zero' ),
			'az_render_metabox',
			$type,
			'normal',
			'high'
		);
	}
} );

function az_render_metabox( $post ) {
	$fields = az_fields()[ $post->post_type ] ?? array();
	wp_nonce_field( 'az_save_meta', 'az_meta_nonce' );
	echo '<div class="az-fields" style="display:grid;gap:18px;padding-top:6px">';
	foreach ( $fields as $key => list( $label, $type, $help ) ) {
		$value = get_post_meta( $post->ID, $key, true );
		$id    = esc_attr( $key );
		echo '<div>';
		printf( '<label for="%s" style="display:block;font-weight:600;margin-bottom:4px">%s</label>', $id, esc_html( $label ) );
		switch ( $type ) {
			case 'textarea':
				printf( '<textarea id="%s" name="%s" rows="3" style="width:100%%">%s</textarea>', $id, $id, esc_textarea( $value ) );
				break;
			case 'list':
			case 'pairs':
				printf( '<textarea id="%s" name="%s" rows="5" style="width:100%%">%s</textarea>', $id, $id, esc_textarea( $value ) );
				break;
			case 'checkbox':
				printf(
					'<label><input type="checkbox" id="%s" name="%s" value="1" %s> %s</label>',
					$id, $id, checked( $value, '1', false ), esc_html__( 'Yes', 'absolute-zero' )
				);
				break;
			case 'date':
				printf( '<input type="date" id="%s" name="%s" value="%s">', $id, $id, esc_attr( $value ) );
				break;
			case 'url':
				printf( '<input type="url" id="%s" name="%s" value="%s" style="width:100%%">', $id, $id, esc_attr( $value ) );
				break;
			default:
				printf( '<input type="text" id="%s" name="%s" value="%s" style="width:100%%">', $id, $id, esc_attr( $value ) );
		}
		if ( $help ) {
			printf( '<p class="description" style="margin-top:4px">%s</p>', esc_html( $help ) );
		}
		echo '</div>';
	}
	echo '</div>';
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! isset( $_POST['az_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['az_meta_nonce'] ), 'az_save_meta' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$fields = az_fields()[ $post->post_type ] ?? array();
	foreach ( $fields as $key => list( $label, $type, $help ) ) {
		if ( 'checkbox' === $type ) {
			update_post_meta( $post_id, $key, isset( $_POST[ $key ] ) ? '1' : '' );
			continue;
		}
		if ( ! isset( $_POST[ $key ] ) ) {
			continue;
		}
		$raw = wp_unslash( $_POST[ $key ] );
		$clean = match ( $type ) {
			'url'                 => esc_url_raw( $raw ),
			'textarea', 'list', 'pairs' => sanitize_textarea_field( $raw ),
			default               => sanitize_text_field( $raw ),
		};
		update_post_meta( $post_id, $key, $clean );
	}
}, 10, 2 );

/* --- read helpers ------------------------------------------------------ */

function az_meta( $key, $post = null ) {
	$post = get_post( $post );
	return $post ? (string) get_post_meta( $post->ID, $key, true ) : '';
}

function az_meta_list( $key, $post = null ) {
	$raw = az_meta( $key, $post );
	if ( '' === trim( $raw ) ) {
		return array();
	}
	return array_values( array_filter( array_map( 'trim', preg_split( '/\R/', $raw ) ) ) );
}

function az_meta_pairs( $key, $post = null ) {
	$out = array();
	foreach ( az_meta_list( $key, $post ) as $line ) {
		$parts = array_map( 'trim', explode( '|', $line, 2 ) );
		if ( count( $parts ) === 2 ) {
			$out[] = array( 'k' => $parts[0], 'v' => $parts[1] );
		}
	}
	return $out;
}

/* A stale-photo column, so nobody has to remember which portrait is old. */
add_filter( 'manage_az_member_posts_columns', function ( $cols ) {
	$cols['az_photo'] = __( 'Photo', 'absolute-zero' );
	return $cols;
} );
add_action( 'manage_az_member_posts_custom_column', function ( $col, $id ) {
	if ( 'az_photo' !== $col ) {
		return;
	}
	if ( get_post_meta( $id, '_az_stale', true ) ) {
		echo '<strong>' . esc_html__( 'Needs replacing', 'absolute-zero' ) . '</strong>';
	} elseif ( has_post_thumbnail( $id ) ) {
		echo esc_html__( 'Set', 'absolute-zero' );
	} else {
		echo esc_html__( 'Missing', 'absolute-zero' );
	}
}, 10, 2 );
