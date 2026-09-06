<?php
/**
 * The live loops.
 *
 * Each page template is the authored markup with a small number of marked
 * regions swapped for a call into this file. Everything a page renders
 * from a post type comes through here.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_region( $name ) {
	$fn = 'az_region_' . str_replace( '-', '_', $name );
	if ( function_exists( $fn ) ) {
		$fn();
	}
}

function az_query( $type, $args = array() ) {
	return new WP_Query( array_merge( array(
		'post_type'      => $type,
		'posts_per_page' => -1,
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	), $args ) );
}

/* --- Home: the outreach figures ------------------------------------- */

function az_impact_stats() {
	return array(
		array( az_opt( 'az_stat_students' ),  __( 'Students reached', 'absolute-zero' ),     __( 'Across libraries, schools, expos and partner centres.', 'absolute-zero' ) ),
		array( az_opt( 'az_stat_workshops' ), __( 'Workshops hosted', 'absolute-zero' ),     __( 'Sessions we planned, staffed and ran ourselves.', 'absolute-zero' ) ),
		array( az_opt( 'az_stat_teams' ),     __( 'FIRST teams mentored', 'absolute-zero' ), __( 'Rookie FTC and FLL teams we have coached through a season.', 'absolute-zero' ) ),
		array( az_opt( 'az_stat_countries' ), __( 'Countries', 'absolute-zero' ),            __( 'Northern Virginia, and a residential school in Karnataka, India.', 'absolute-zero' ) ),
	);
}

function az_region_impact() {
	echo '<div class="impact-grid">';
	foreach ( az_impact_stats() as list( $value, $label, $note ) ) {
		printf(
			'<div class="impact-grid__cell"><div class="stat"><span class="stat__value">%s</span><span class="stat__label">%s</span><span class="stat__note">%s</span></div></div>',
			esc_html( $value ), esc_html( $label ), esc_html( $note )
		);
	}
	echo '</div>';
}

/* --- Home and Sponsors: the supporter logos -------------------------- */

function az_sponsor_items() {
	$q = az_query( 'az_sponsor' );
	$out = array();
	while ( $q->have_posts() ) {
		$q->the_post();
		$out[] = array(
			'id'   => get_the_ID(),
			'name' => get_the_title(),
			'url'  => az_meta( '_az_url' ),
			'kind' => az_meta( '_az_kind' ),
			'logo' => 'sponsor-' . sanitize_title( get_the_title() ) . '.png',
		);
	}
	wp_reset_postdata();
	return $out;
}

function az_region_logowall() {
	$items = az_sponsor_items();
	if ( ! $items ) {
		return;
	}
	echo '<ul class="logo-wall bare">';
	foreach ( $items as $s ) {
		$img = az_image( $s['id'], 'az-logo', $s['name'], $s['logo'] );
		printf(
			'<li class="logo-wall__item">%s%s%s</li>',
			$s['url'] ? '<a href="' . esc_url( $s['url'] ) . '" target="_blank" rel="noopener" aria-label="' . esc_attr( $s['name'] ) . '">' : '<span>',
			$img,
			$s['url'] ? '</a>' : '</span>'
		);
	}
	echo '</ul>';
}

function az_region_supporters() {
	$items = az_sponsor_items();
	if ( ! $items ) {
		return;
	}
	echo '<ul class="supporter-grid bare">';
	foreach ( $items as $s ) {
		$img = az_image( $s['id'], 'az-logo', $s['name'], $s['logo'] );
		printf(
			'<li class="supporter">%s%s%s</li>',
			$s['url'] ? '<a href="' . esc_url( $s['url'] ) . '" target="_blank" rel="noopener">' : '<span>',
			$img,
			$s['url'] ? '</a>' : '</span>'
		);
	}
	echo '</ul>';
}

/* --- Sponsors: the tiers --------------------------------------------- */

function az_region_tiers() {
	$terms = get_terms( array( 'taxonomy' => 'az_tier', 'hide_empty' => false, 'orderby' => 'term_order' ) );
	if ( is_wp_error( $terms ) || ! $terms ) {
		return;
	}
	echo '<div class="tier-table" role="table" aria-label="' . esc_attr__( 'Sponsorship tiers and what each includes', 'absolute-zero' ) . '">';
	foreach ( $terms as $term ) {
		$amount   = get_term_meta( $term->term_id, 'az_amount', true );
		$benefits = array_filter( array_map( 'trim', preg_split( '/\R/', (string) $term->description ) ) );
		echo '<div class="tier" role="row">';
		printf(
			'<div class="tier__head" role="rowheader"><h3>%s</h3><p class="tier__amount nums">%s</p></div>',
			esc_html( $term->name ), esc_html( $amount )
		);
		echo '<ul class="tier__benefits bare" role="cell">';
		foreach ( $benefits as $b ) {
			printf( '<li>%s<span>%s</span></li>', az_icon( 'check' ), esc_html( $b ) );
		}
		echo '</ul></div>';
	}
	echo '</div>';
}

/* --- Team: the roster ------------------------------------------------ */

function az_members_in( $group ) {
	return az_query( 'az_member', array(
		'tax_query' => array( array(
			'taxonomy' => 'az_group',
			'field'    => 'slug',
			'terms'    => $group,
		) ),
	) );
}

function az_region_roster() {
	$q = az_members_in( 'student' );
	echo '<ul class="roster bare" id="roster">';
	while ( $q->have_posts() ) {
		$q->the_post();
		$roles = wp_get_post_terms( get_the_ID(), 'az_role', array( 'fields' => 'slugs' ) );
		$line  = az_meta( '_az_line' );
		printf(
			'<li class="member" data-role="%s"><span class="member__photo frame frame--portrait">%s</span><span class="member__name">%s</span><span class="member__role">%s</span></li>',
			esc_attr( implode( ' ', (array) $roles ) ),
			az_image( get_the_ID(), 'az-portrait',
				sprintf( '%s, %s.', get_the_title(), strtolower( $line ) ),
				'member-' . sanitize_title( get_the_title() ) . '.jpg' ),
			esc_html( get_the_title() ),
			esc_html( $line )
		);
	}
	wp_reset_postdata();
	printf(
		'<li class="roster__empty" data-filter-empty hidden>%s</li>',
		esc_html__( 'Nobody on the roster is listed under that role yet.', 'absolute-zero' )
	);
	echo '</ul>';
}

function az_render_adults( $group, $prefix ) {
	$q = az_members_in( $group );
	if ( ! $q->have_posts() ) {
		return;
	}
	echo '<div class="adults">';
	while ( $q->have_posts() ) {
		$q->the_post();
		printf(
			'<article class="adult"><span class="adult__photo frame frame--square">%s</span><div class="adult__text"><h3>%s</h3><p class="adult__line">%s</p>%s</div></article>',
			az_image( get_the_ID(), 'az-square',
				sprintf( 'Portrait of %s.', get_the_title() ),
				$prefix . sanitize_title( get_the_title() ) . '.jpg' ),
			esc_html( get_the_title() ),
			esc_html( az_meta( '_az_line' ) ),
			az_paras( az_meta( '_az_bio' ) )
		);
	}
	wp_reset_postdata();
	echo '</div>';
}

function az_region_coaches() { az_render_adults( 'coach', 'coach-' ); }
function az_region_mentors() { az_render_adults( 'mentor', 'mentor-' ); }

/* --- Build: the competition record ----------------------------------- */

function az_region_record() {
	$q = az_query( 'az_result' );
	if ( ! $q->have_posts() ) {
		return;
	}
	/* Group event rows under their season. */
	$seasons = array();
	while ( $q->have_posts() ) {
		$q->the_post();
		$game  = az_meta( '_az_game' );
		$years = az_meta( '_az_years' );
		$key   = $game . '|' . $years;
		if ( ! isset( $seasons[ $key ] ) ) {
			$seasons[ $key ] = array( 'game' => $game, 'years' => $years, 'note' => az_meta( '_az_note' ), 'events' => array() );
		}
		$seasons[ $key ]['events'][] = array(
			'name'   => get_the_title(),
			'awards' => az_meta_list( '_az_awards' ),
		);
	}
	wp_reset_postdata();

	echo '<div class="seasons">';
	foreach ( $seasons as $s ) {
		echo '<article class="season">';
		printf(
			'<h3 class="season__title"><span>%s</span><span class="meta nums">%s</span></h3>',
			esc_html( $s['game'] ), esc_html( $s['years'] )
		);
		if ( $s['note'] ) {
			printf( '<p class="meta season__note">%s</p>', esc_html( $s['note'] ) );
		}
		echo '<dl class="season__events">';
		foreach ( $s['events'] as $e ) {
			printf( '<dt>%s</dt><dd>', esc_html( $e['name'] ) );
			if ( $e['awards'] ) {
				echo '<ul class="bare">';
				foreach ( $e['awards'] as $a ) {
					printf( '<li>%s<span>%s</span></li>', az_icon( 'check' ), esc_html( $a ) );
				}
				echo '</ul>';
			} else {
				printf( '<span class="meta">%s</span>', esc_html__( 'Record not yet published.', 'absolute-zero' ) );
			}
			echo '</dd>';
		}
		echo '</dl></article>';
	}
	echo '</div>';
}

/* --- Outreach: the programme index ----------------------------------- */

function az_region_programmes() {
	$q = az_query( 'az_program' );
	$featured = array();
	$rest     = array();
	while ( $q->have_posts() ) {
		$q->the_post();
		$row = array(
			'id'    => get_the_ID(),
			'title' => get_the_title(),
			'url'   => get_permalink(),
			'blurb' => az_meta( '_az_blurb' ),
			'slug'  => get_post_field( 'post_name' ),
		);
		if ( az_meta( '_az_featured' ) ) {
			$featured[] = $row;
		} elseif ( 'open-access' !== $row['slug'] && 'namma-bhoomi' !== $row['slug'] ) {
			$rest[] = $row;
		}
	}
	wp_reset_postdata();

	if ( $featured ) {
		echo '<div class="prog-featured">';
		foreach ( $featured as $c ) {
			printf(
				'<a class="prog-tile" href="%s"><span class="prog-tile__media">%s</span><span class="prog-tile__text"><h3>%s</h3><p>%s</p><span class="card__more">%s%s</span></span></a>',
				esc_url( $c['url'] ),
				az_image( $c['id'], 'az-photo', $c['title'] . '.', 'outreach-' . $c['slug'] . '.jpg' ),
				esc_html( $c['title'] ),
				esc_html( $c['blurb'] ),
				esc_html__( 'Read more', 'absolute-zero' ),
				az_icon( 'arrowRight' )
			);
		}
		echo '</div>';
	}

	if ( $rest ) {
		echo '<ul class="prog-list bare">';
		foreach ( $rest as $c ) {
			printf(
				'<li><a class="prog-row" href="%s"><span class="prog-row__title">%s</span><span class="prog-row__blurb">%s</span><span class="prog-row__go" aria-hidden="true">%s</span></a></li>',
				esc_url( $c['url'] ), esc_html( $c['title'] ), esc_html( $c['blurb'] ), az_icon( 'arrowRight' )
			);
		}
		echo '</ul>';
	}
}

/* --- Outreach: workshops, grouped by season -------------------------- */

function az_region_workshops() {
	$seasons = get_terms( array( 'taxonomy' => 'az_season', 'hide_empty' => false, 'orderby' => 'term_order' ) );
	if ( is_wp_error( $seasons ) ) {
		$seasons = array();
	}
	echo '<div class="ws-list" id="ws-list">';
	foreach ( $seasons as $season ) {
		$q = az_query( 'az_workshop', array(
			'orderby'   => 'menu_order',
			'tax_query' => array( array( 'taxonomy' => 'az_season', 'field' => 'slug', 'terms' => $season->slug ) ),
		) );
		$i = 0;
		while ( $q->have_posts() ) {
			$q->the_post();
			az_workshop_entry( $season->slug, $i < 2 );
			$i++;
		}
		wp_reset_postdata();
	}
	printf(
		'<p class="ws-empty" data-filter-empty hidden>%s</p>',
		esc_html__( 'No workshops recorded for that season yet.', 'absolute-zero' )
	);
	echo '</div>';
}

function az_workshop_entry( $season_slug, $with_photo ) {
	$venue    = az_meta( '_az_venue' );
	$planned  = az_meta( '_az_planned' );
	$audience = az_meta( '_az_audience' );
	$plan     = az_meta_list( '_az_plan' );
	$video    = az_meta( '_az_video' );

	printf( '<article class="ws%s" data-season="%s">', $with_photo ? ' ws--photo' : '', esc_attr( $season_slug ) );

	if ( $with_photo ) {
		printf(
			'<span class="ws__media frame frame--wide">%s</span>',
			az_image( get_the_ID(), 'az-wide',
				sprintf( '%s at %s.', get_the_title(), $venue ),
				'ws-' . $season_slug . '-' . get_post_field( 'post_name' ) . '.jpg' )
		);
	}

	echo '<div class="ws__text"><div class="ws__meta">';
	printf( '<span class="ws__date nums">%s</span>', esc_html( az_meta( '_az_date' ) ) );
	if ( $planned ) {
		echo az_chip( __( 'Planned', 'absolute-zero' ), true );
	}
	if ( $audience ) {
		echo az_chip( $audience );
	}
	echo '</div>';

	printf( '<h3>%s</h3>', esc_html( get_the_title() ) );
	if ( $venue ) {
		printf( '<p class="ws__venue">%s<span>%s</span></p>', az_icon( 'pin' ), esc_html( $venue ) );
	}
	echo az_paras( az_meta( '_az_summary' ) );
	echo az_paras( az_meta( '_az_detail' ) );

	if ( $plan ) {
		echo '<div class="ws__plan"><h4>' . esc_html__( 'What we run', 'absolute-zero' ) . '</h4><ul>';
		foreach ( $plan as $p ) {
			printf( '<li>%s</li>', esc_html( $p ) );
		}
		echo '</ul></div>';
	}
	if ( $video ) {
		printf( '<p>%s</p>', az_link_cta( $video, __( 'Watch the session video', 'absolute-zero' ), 'arrowUpRight', true ) );
	}
	echo '</div></article>';
}

/* --- Open Access: the catalogue -------------------------------------- */

function az_region_catalogue() {
	$shelves = get_terms( array( 'taxonomy' => 'az_shelf', 'hide_empty' => false, 'orderby' => 'term_order' ) );
	if ( is_wp_error( $shelves ) || ! $shelves ) {
		return;
	}
	$icons = array(
		'engineering-notebooks' => 'book',
		'pit-designs'           => 'cpu',
		'build-guides'          => 'wrench',
		'programming-guides'    => 'code',
		'outreach-materials'    => 'users',
	);

	echo '<div class="catalogue">';
	foreach ( $shelves as $shelf ) {
		$q = az_query( 'az_resource', array(
			'tax_query' => array( array( 'taxonomy' => 'az_shelf', 'field' => 'slug', 'terms' => $shelf->slug ) ),
		) );
		if ( ! $q->have_posts() ) {
			continue;
		}
		printf(
			'<section class="cat-group" id="oa-%1$s" aria-labelledby="oa-%1$s-h"><div class="cat-group__head"><span class="cat-group__icon" aria-hidden="true">%2$s</span><div><h3 id="oa-%1$s-h">%3$s</h3><p>%4$s</p></div></div><ul class="cat-items bare">',
			esc_attr( $shelf->slug ),
			az_icon( $icons[ $shelf->slug ] ?? 'file' ),
			esc_html( $shelf->name ),
			esc_html( $shelf->description )
		);
		while ( $q->have_posts() ) {
			$q->the_post();
			az_catalogue_item();
		}
		wp_reset_postdata();
		echo '</ul></section>';
	}
	echo '</div>';
}

function az_catalogue_item() {
	$file     = az_meta( '_az_file' );
	$kind     = az_meta( '_az_kind' ) ?: 'PDF';
	$season   = az_meta( '_az_season' );
	$size     = az_meta( '_az_size' );
	$external = az_meta( '_az_external' );
	$pending  = '' === trim( $file );

	$inner = sprintf(
		'<span class="cat-item__icon" aria-hidden="true">%s</span><span class="cat-item__text"><span class="cat-item__title">%s</span><span class="cat-item__meta"><span class="nums">%s</span><span aria-hidden="true">/</span><span>%s</span>%s</span></span><span class="cat-item__action">%s</span>',
		az_icon( 'Web' === $kind ? 'globe' : 'file' ),
		esc_html( get_the_title() ),
		esc_html( $season ),
		esc_html( $kind ),
		$size ? '<span aria-hidden="true">/</span><span class="nums">' . esc_html( $size ) . '</span>' : '',
		$pending
			? '<span class="chip">' . esc_html__( 'File pending', 'absolute-zero' ) . '</span>'
			: '<span class="cat-item__go" aria-hidden="true">' . az_icon( $external ? 'arrowUpRight' : 'download' ) . '</span>'
	);

	if ( $pending ) {
		printf( '<li class="cat-item cat-item--pending">%s</li>', $inner );
		return;
	}
	printf(
		'<li class="cat-item"><a href="%s"%s%s>%s</a></li>',
		esc_url( $file ),
		$external ? ' target="_blank" rel="noopener"' : '',
		$external ? '' : ' download',
		$inner
	);
}
