<?php
/**
 * Metadata, social cards and structured data.
 *
 * Written into the theme rather than delegated to an SEO plugin, because
 * the shapes here are specific: SportsTeam, EducationEvent per workshop,
 * ItemList for the library, and a BreadcrumbList on every inner page.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

/* --- Title -------------------------------------------------------------- */

add_filter( 'document_title_separator', fn() => '|' );
add_filter( 'document_title_parts', function ( $parts ) {
	$suffix = sprintf( 'Absolute Zero FTC #%s', az_opt( 'az_team_number' ) );
	if ( is_front_page() ) {
		return array( 'title' => sprintf( 'Absolute Zero Robotics | FTC Team %s, %s', az_opt( 'az_team_number' ), az_opt( 'az_region' ) ) );
	}
	$parts['site'] = $suffix;
	unset( $parts['tagline'] );
	return $parts;
} );

/* --- Description -------------------------------------------------------- */

function az_description() {
	if ( is_singular() ) {
		$custom = get_post_meta( get_the_ID(), '_az_description', true );
		if ( $custom ) {
			return $custom;
		}
		$excerpt = has_excerpt() ? get_the_excerpt() : '';
		if ( ! $excerpt ) {
			$excerpt = az_meta( '_az_lede' ) ?: az_meta( '_az_summary' ) ?: az_meta( '_az_blurb' );
		}
		if ( ! $excerpt ) {
			$excerpt = wp_strip_all_tags( get_the_content() );
		}
		return wp_trim_words( $excerpt, 26, '' );
	}
	if ( is_post_type_archive( 'az_workshop' ) ) {
		return __( 'Every robotics workshop Absolute Zero has planned, staffed and run, grouped by competition season.', 'absolute-zero' );
	}
	return get_bloginfo( 'description' );
}

/* --- Head --------------------------------------------------------------- */

add_action( 'wp_head', 'az_head_meta', 3 );
function az_head_meta() {
	$desc = az_description();
	$url  = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
	$img  = az_social_image();
	$title = wp_get_document_title();

	printf( '<meta name="description" content="%s">' . "\n", esc_attr( $desc ) );
	printf( '<link rel="canonical" href="%s">' . "\n", esc_url( $url ) );

	printf( '<meta property="og:type" content="%s">' . "\n", is_singular() && ! is_front_page() ? 'article' : 'website' );
	printf( '<meta property="og:site_name" content="%s">' . "\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( '<meta property="og:locale" content="%s">' . "\n", esc_attr( str_replace( '-', '_', get_bloginfo( 'language' ) ) ) );
	printf( '<meta property="og:title" content="%s">' . "\n", esc_attr( $title ) );
	printf( '<meta property="og:description" content="%s">' . "\n", esc_attr( $desc ) );
	printf( '<meta property="og:url" content="%s">' . "\n", esc_url( $url ) );
	printf( '<meta property="og:image" content="%s">' . "\n", esc_url( $img ) );
	echo '<meta property="og:image:width" content="1200">' . "\n";
	echo '<meta property="og:image:height" content="630">' . "\n";
	echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	echo '<meta name="twitter:site" content="@absolutezeroftc">' . "\n";
	printf( '<meta name="twitter:title" content="%s">' . "\n", esc_attr( $title ) );
	printf( '<meta name="twitter:description" content="%s">' . "\n", esc_attr( $desc ) );
	printf( '<meta name="twitter:image" content="%s">' . "\n", esc_url( $img ) );

	echo '<meta name="theme-color" content="#0b0d10">' . "\n";
	echo '<meta name="color-scheme" content="dark">' . "\n";
	echo '<meta name="robots" content="index, follow, max-image-preview:large">' . "\n";
}

function az_social_image() {
	if ( is_singular() && has_post_thumbnail() ) {
		$src = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
		if ( $src ) {
			return $src[0];
		}
	}
	return AZ_URI . '/assets/img/og-default.jpg';
}

/* --- Structured data ----------------------------------------------------- */

add_action( 'wp_head', 'az_schema', 4 );
function az_schema() {
	$graph = array( az_schema_org() );

	if ( is_singular() && ! is_front_page() ) {
		$graph[] = az_schema_breadcrumbs();
	}

	if ( is_singular( 'az_workshop' ) ) {
		$graph[] = az_schema_event( get_post() );
	}

	if ( is_page() && 'outreach' === get_post_field( 'post_name', get_the_ID() ) ) {
		$q = az_query( 'az_workshop', array( 'posts_per_page' => 12, 'meta_key' => '_az_date_iso', 'orderby' => 'meta_value', 'order' => 'DESC' ) );
		while ( $q->have_posts() ) {
			$q->the_post();
			if ( az_meta( '_az_date_iso' ) ) {
				$graph[] = az_schema_event( get_post() );
			}
		}
		wp_reset_postdata();
	}

	foreach ( $graph as $node ) {
		printf(
			'<script type="application/ld+json">%s</script>' . "\n",
			wp_json_encode( $node, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
		);
	}
}

function az_schema_org() {
	return array(
		'@context'           => 'https://schema.org',
		'@type'              => array( 'SportsTeam', 'EducationalOrganization' ),
		'@id'                => home_url( '/#team' ),
		'name'               => sprintf( 'Absolute Zero Robotics (FTC Team %s)', az_opt( 'az_team_number' ) ),
		'alternateName'      => sprintf( 'Absolute Zero FTC #%s', az_opt( 'az_team_number' ) ),
		'sport'              => 'Robotics',
		'url'                => home_url( '/' ),
		'logo'               => AZ_URI . '/assets/img/logo-absolute-zero.png',
		'image'              => AZ_URI . '/assets/img/og-default.jpg',
		'slogan'             => get_bloginfo( 'description' ),
		'foundingDate'       => az_opt( 'az_founded' ),
		'email'              => az_opt( 'az_email' ),
		'areaServed'         => array( '@type' => 'AdministrativeArea', 'name' => az_opt( 'az_region' ) ),
		'memberOf'           => array( '@type' => 'Organization', 'name' => 'FIRST Tech Challenge', 'url' => 'https://www.firstinspires.org/robotics/ftc' ),
		'parentOrganization' => array( '@type' => 'NGO', 'name' => az_opt( 'az_parent_name' ), 'url' => az_opt( 'az_parent_url' ) ),
		'sameAs'             => array_values( array_filter( array(
			az_opt( 'az_yt' ), az_opt( 'az_ig' ), az_opt( 'az_fb' ), az_opt( 'az_x' ),
		) ) ),
	);
}

function az_schema_breadcrumbs() {
	$trail = array( array( 'name' => __( 'Home', 'absolute-zero' ), 'item' => home_url( '/' ) ) );
	if ( is_singular( array( 'az_program', 'az_workshop' ) ) ) {
		$trail[] = array( 'name' => __( 'Outreach', 'absolute-zero' ), 'item' => home_url( '/outreach/' ) );
	}
	$trail[] = array( 'name' => wp_strip_all_tags( get_the_title() ), 'item' => get_permalink() );

	return array(
		'@context'        => 'https://schema.org',
		'@type'           => 'BreadcrumbList',
		'itemListElement' => array_map(
			fn( $i, $c ) => array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => $c['name'], 'item' => $c['item'] ),
			array_keys( $trail ),
			$trail
		),
	);
}

function az_schema_event( $post ) {
	return array(
		'@context'             => 'https://schema.org',
		'@type'                => 'EducationEvent',
		'name'                 => get_the_title( $post ),
		'startDate'            => az_meta( '_az_date_iso', $post ),
		'eventAttendanceMode'  => 'https://schema.org/OfflineEventAttendanceMode',
		'location'             => array(
			'@type'   => 'Place',
			'name'    => az_meta( '_az_venue', $post ),
			'address' => array( '@type' => 'PostalAddress', 'addressRegion' => 'VA', 'addressCountry' => 'US' ),
		),
		'description'          => az_meta( '_az_summary', $post ),
		'organizer'            => array( '@type' => 'SportsTeam', 'name' => get_bloginfo( 'name' ), 'url' => home_url( '/' ) ),
		'isAccessibleForFree'  => true,
	);
}

/* --- Per-page description override -------------------------------------- */

add_action( 'add_meta_boxes', function () {
	foreach ( array( 'page', 'az_program', 'az_workshop' ) as $type ) {
		add_meta_box( 'az_seo', __( 'Search and social', 'absolute-zero' ), function ( $post ) {
			wp_nonce_field( 'az_seo_save', 'az_seo_nonce' );
			$v = get_post_meta( $post->ID, '_az_description', true );
			echo '<label for="az_desc" style="display:block;font-weight:600;margin-bottom:4px">'
				. esc_html__( 'Meta description', 'absolute-zero' ) . '</label>';
			printf( '<textarea id="az_desc" name="_az_description" rows="3" style="width:100%%" maxlength="165">%s</textarea>', esc_textarea( $v ) );
			echo '<p class="description">' . esc_html__( 'Aim for 140 to 160 characters. Left blank, the page opening is used instead.', 'absolute-zero' ) . '</p>';
		}, $type, 'side', 'default' );
	}
} );

add_action( 'save_post', function ( $post_id ) {
	if ( ! isset( $_POST['az_seo_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['az_seo_nonce'] ), 'az_seo_save' ) ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	update_post_meta( $post_id, '_az_description', sanitize_text_field( wp_unslash( $_POST['_az_description'] ?? '' ) ) );
} );

/* Core's sitemap is fine; just make sure the CPTs are in it and the
   noise is not. */
add_filter( 'wp_sitemaps_post_types', function ( $types ) {
	unset( $types['attachment'] );
	return $types;
} );
add_filter( 'wp_sitemaps_taxonomies', function ( $taxes ) {
	return array_intersect_key( $taxes, array_flip( array( 'az_season' ) ) );
} );
