<?php
/**
 * One-time content import.
 *
 * A custom theme that activates into an empty site is a bill, not a
 * deliverable. Activating this one creates the seven pages, the nine
 * programmes, thirty workshops, the roster, the sponsors, the tiers, the
 * library and the competition record, wires up three menus, and sets the
 * front page. Everything is then ordinary WordPress content the team can
 * edit, reorder or delete.
 *
 * The import is idempotent: it never overwrites a post that already
 * exists, so running it twice is harmless and editing anything is safe.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

require_once AZ_DIR . '/inc/seed-data.php';

const AZ_SEED_FLAG = 'az_seeded_version';

add_action( 'after_switch_theme', 'az_seed_run' );

function az_seed_run() {
	az_register_content();               // the CPTs must exist before we insert into them
	flush_rewrite_rules();

	if ( get_option( AZ_SEED_FLAG ) === AZ_VERSION ) {
		return;
	}

	$data = az_seed_data();

	az_seed_terms( $data );
	az_seed_pages( $data );
	az_seed_programs( $data );
	az_seed_workshops( $data );
	az_seed_members( $data );
	az_seed_sponsors( $data );
	az_seed_resources( $data );
	az_seed_results( $data );
	az_seed_menus( $data );
	az_seed_settings();

	update_option( AZ_SEED_FLAG, AZ_VERSION );
	flush_rewrite_rules();
}

/* Also offer a manual re-run, for a staging site or a fresh install. */
add_action( 'admin_menu', function () {
	add_theme_page(
		__( 'Absolute Zero content', 'absolute-zero' ),
		__( 'AZ content', 'absolute-zero' ),
		'manage_options',
		'az-seed',
		'az_seed_screen'
	);
} );

function az_seed_screen() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	if ( isset( $_POST['az_seed'] ) && check_admin_referer( 'az_seed_run' ) ) {
		delete_option( AZ_SEED_FLAG );
		az_seed_run();
		echo '<div class="notice notice-success"><p>'
			. esc_html__( 'Import finished. Anything that already existed was left alone.', 'absolute-zero' )
			. '</p></div>';
	}
	$counts = array(
		__( 'Pages', 'absolute-zero' )      => count( get_pages() ),
		__( 'Programmes', 'absolute-zero' ) => wp_count_posts( 'az_program' )->publish,
		__( 'Workshops', 'absolute-zero' )  => wp_count_posts( 'az_workshop' )->publish,
		__( 'Members', 'absolute-zero' )    => wp_count_posts( 'az_member' )->publish,
		__( 'Sponsors', 'absolute-zero' )   => wp_count_posts( 'az_sponsor' )->publish,
		__( 'Library items', 'absolute-zero' ) => wp_count_posts( 'az_resource' )->publish,
		__( 'Event results', 'absolute-zero' ) => wp_count_posts( 'az_result' )->publish,
	);
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Absolute Zero content', 'absolute-zero' ); ?></h1>
		<p><?php esc_html_e( 'The theme ships with the full site as content. This screen re-runs the import. It never overwrites anything that already exists, so it is safe to press.', 'absolute-zero' ); ?></p>
		<table class="widefat striped" style="max-width:32rem;margin:1rem 0">
			<tbody>
			<?php foreach ( $counts as $label => $n ) : ?>
				<tr><td><?php echo esc_html( $label ); ?></td><td><strong><?php echo esc_html( (string) $n ); ?></strong></td></tr>
			<?php endforeach; ?>
			</tbody>
		</table>
		<form method="post">
			<?php wp_nonce_field( 'az_seed_run' ); ?>
			<button class="button button-primary" name="az_seed" value="1"><?php esc_html_e( 'Import anything missing', 'absolute-zero' ); ?></button>
		</form>
	</div>
	<?php
}

/* --- helpers ------------------------------------------------------------ */

function az_seed_find( $type, $slug ) {
	$found = get_posts( array(
		'post_type'      => $type,
		'name'           => $slug,
		'post_status'    => 'any',
		'posts_per_page' => 1,
		'fields'         => 'ids',
	) );
	return $found ? (int) $found[0] : 0;
}

function az_seed_insert( $type, $slug, $title, $order = 0, $content = '', $meta = array() ) {
	$existing = az_seed_find( $type, $slug );
	if ( $existing ) {
		return $existing;
	}
	$id = wp_insert_post( array(
		'post_type'    => $type,
		'post_name'    => $slug,
		'post_title'   => $title,
		'post_status'  => 'publish',
		'post_content' => $content,
		'menu_order'   => $order,
	), true );
	if ( is_wp_error( $id ) ) {
		return 0;
	}
	foreach ( $meta as $k => $v ) {
		if ( '' !== $v && false !== $v ) {
			update_post_meta( $id, $k, $v );
		}
	}
	return (int) $id;
}

function az_seed_term( $tax, $slug, $name, $description = '', $order = 0 ) {
	$term = get_term_by( 'slug', $slug, $tax );
	if ( ! $term ) {
		$new = wp_insert_term( $name, $tax, array( 'slug' => $slug, 'description' => $description ) );
		if ( is_wp_error( $new ) ) {
			return 0;
		}
		$term_id = (int) $new['term_id'];
	} else {
		$term_id = (int) $term->term_id;
	}
	update_term_meta( $term_id, 'az_order', $order );
	return $term_id;
}

/* --- the passes --------------------------------------------------------- */

function az_seed_terms( $data ) {
	foreach ( $data['seasons'] as $s ) {
		az_seed_term( 'az_season', $s['slug'], $s['name'], $s['description'], $s['order'] );
	}
	foreach ( $data['groups'] as $g ) {
		az_seed_term( 'az_group', $g['slug'], $g['name'], '', $g['order'] );
	}
	foreach ( $data['roles'] as $r ) {
		az_seed_term( 'az_role', $r['slug'], $r['name'], '', $r['order'] );
	}
	foreach ( $data['shelves'] as $s ) {
		az_seed_term( 'az_shelf', $s['slug'], $s['name'], $s['description'], $s['order'] );
	}
	foreach ( $data['tiers'] as $t ) {
		$id = az_seed_term( 'az_tier', $t['slug'], $t['name'], $t['description'], $t['order'] );
		if ( $id ) {
			update_term_meta( $id, 'az_amount', $t['amount'] );
		}
	}
}

function az_seed_pages( $data ) {
	foreach ( $data['pages'] as $p ) {
		$slug = $p['front'] ? 'home' : $p['slug'];
		$id   = az_seed_insert( 'page', $slug, $p['title'], $p['order'] );
		if ( $id && $p['front'] ) {
			update_option( 'show_on_front', 'page' );
			update_option( 'page_on_front', $id );
		}
	}
}

function az_seed_programs( $data ) {
	foreach ( $data['programs'] as $p ) {
		az_seed_insert( 'az_program', $p['slug'], $p['title'], $p['order'], '', array(
			'_az_blurb'    => $p['blurb'],
			'_az_featured' => $p['featured'] ? '1' : '',
		) );
	}
}

function az_seed_workshops( $data ) {
	foreach ( $data['workshops'] as $w ) {
		$id = az_seed_insert( 'az_workshop', $w['slug'], $w['title'], $w['order'], '', array(
			'_az_venue'    => $w['venue'],
			'_az_date'     => $w['date'],
			'_az_date_iso' => $w['dateISO'],
			'_az_audience' => $w['audience'],
			'_az_planned'  => $w['planned'] ? '1' : '',
			'_az_summary'  => $w['summary'],
			'_az_detail'   => $w['detail'],
			'_az_plan'     => $w['plan'],
			'_az_video'    => $w['video'],
		) );
		if ( $id ) {
			wp_set_object_terms( $id, $w['season'], 'az_season' );
		}
	}
}

function az_seed_members( $data ) {
	foreach ( $data['members'] as $m ) {
		$id = az_seed_insert( 'az_member', $m['slug'], $m['title'], $m['order'], '', array(
			'_az_line'  => $m['line'],
			'_az_bio'   => $m['bio'],
			'_az_stale' => $m['stale'] ? '1' : '',
		) );
		if ( $id ) {
			wp_set_object_terms( $id, $m['group'], 'az_group' );
			if ( $m['roles'] ) {
				wp_set_object_terms( $id, $m['roles'], 'az_role' );
			}
		}
	}
}

function az_seed_sponsors( $data ) {
	foreach ( $data['sponsors'] as $s ) {
		az_seed_insert( 'az_sponsor', $s['slug'], $s['title'], $s['order'], '', array(
			'_az_url'  => $s['url'],
			'_az_kind' => $s['kind'],
		) );
	}
}

function az_seed_resources( $data ) {
	foreach ( $data['resources'] as $r ) {
		$id = az_seed_insert( 'az_resource', $r['slug'], $r['title'], $r['order'], '', array(
			'_az_season'   => $r['season'],
			'_az_kind'     => $r['kind'],
			'_az_file'     => $r['file'],
			'_az_size'     => $r['size'],
			'_az_external' => $r['external'] ? '1' : '',
		) );
		if ( $id ) {
			wp_set_object_terms( $id, $r['shelf'], 'az_shelf' );
		}
	}
}

function az_seed_results( $data ) {
	foreach ( $data['results'] as $r ) {
		az_seed_insert( 'az_result', $r['slug'], $r['title'], $r['order'], '', array(
			'_az_game'   => $r['game'],
			'_az_years'  => $r['years'],
			'_az_awards' => $r['awards'],
			'_az_note'   => $r['note'],
		) );
	}
}

function az_seed_menus( $data ) {
	$locations = get_theme_mod( 'nav_menu_locations', array() );

	$specs = array(
		'primary' => array( __( 'Primary', 'absolute-zero' ), $data['menus']['primary'] ),
		'footer'  => array( __( 'Footer explore', 'absolute-zero' ), $data['menus']['footer'] ),
		'teams'   => array( __( 'Footer for teams', 'absolute-zero' ), $data['menus']['teams'] ),
	);

	foreach ( $specs as $slot => list( $name, $items ) ) {
		$menu = wp_get_nav_menu_object( $name );
		if ( ! $menu ) {
			$menu_id = wp_create_nav_menu( $name );
			if ( is_wp_error( $menu_id ) ) {
				continue;
			}
			foreach ( $items as $i => $item ) {
				wp_update_nav_menu_item( $menu_id, 0, array(
					'menu-item-title'      => $item['label'],
					'menu-item-url'        => home_url( $item['path'] ),
					'menu-item-attr-title' => $item['title'] ?? $item['label'],
					'menu-item-status'     => 'publish',
					'menu-item-position'   => $i + 1,
				) );
			}
		} else {
			$menu_id = (int) $menu->term_id;
		}
		$locations[ $slot ] = $menu_id;
	}

	set_theme_mod( 'nav_menu_locations', $locations );
}

function az_seed_settings() {
	foreach ( az_defaults() as $key => $value ) {
		if ( false === get_option( $key, false ) ) {
			add_option( $key, $value );
		}
	}
	if ( ! get_option( 'blogdescription' ) || 'Just another WordPress site' === get_option( 'blogdescription' ) ) {
		update_option( 'blogdescription', 'Pushing our limits to accomplish the impossible.' );
	}
	if ( get_option( 'blogname' ) === 'My Site' || ! get_option( 'blogname' ) ) {
		update_option( 'blogname', 'Absolute Zero Robotics' );
	}
	/* Pretty permalinks, which the programme and workshop routes need. */
	if ( ! get_option( 'permalink_structure' ) ) {
		update_option( 'permalink_structure', '/%postname%/' );
	}
	update_option( 'timezone_string', get_option( 'timezone_string' ) ?: 'America/New_York' );
}

/* Terms are ordered by the az_order meta the seed writes. */
add_filter( 'get_terms_args', function ( $args, $taxonomies ) {
	$ours = array( 'az_season', 'az_tier', 'az_shelf', 'az_group', 'az_role' );
	if ( array_intersect( (array) $taxonomies, $ours ) && ( $args['orderby'] ?? '' ) === 'term_order' ) {
		$args['orderby']  = 'meta_value_num';
		$args['meta_key'] = 'az_order';
		$args['order']    = 'ASC';
	}
	return $args;
}, 10, 2 );
