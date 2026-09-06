<?php
/**
 * Markup helpers. The PHP counterpart of the static build's ui.js, so a
 * card rendered from a post looks byte-identical to a card rendered from
 * the original data file.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

/**
 * An image inside the theme's hairline frame.
 * Falls back to the shipped placeholder when a post has no thumbnail, so
 * a half-filled roster still lays out correctly.
 */
function az_image( $post_id, $size, $alt, $fallback = '', $class = '' ) {
	$cls = $class ? ' class="' . esc_attr( $class ) . '"' : '';
	if ( has_post_thumbnail( $post_id ) ) {
		return get_the_post_thumbnail( $post_id, $size, array(
			'alt'      => $alt,
			'class'    => $class,
			'loading'  => 'lazy',
			'decoding' => 'async',
		) );
	}
	if ( ! $fallback ) {
		return '';
	}
	$dims = array(
		'az-hero'     => array( 2000, 1200 ),
		'az-wide'     => array( 960, 540 ),
		'az-photo'    => array( 1000, 750 ),
		'az-portrait' => array( 640, 800 ),
		'az-square'   => array( 560, 560 ),
		'az-logo'     => array( 320, 140 ),
	);
	list( $w, $h ) = $dims[ $size ] ?? array( 1000, 750 );
	return sprintf(
		'<img%s src="%s" alt="%s" width="%d" height="%d" loading="lazy" decoding="async">',
		$cls, esc_url( AZ_URI . '/assets/img/' . $fallback ), esc_attr( $alt ), $w, $h
	);
}

/** A button. Matches .btn in the stylesheet exactly. */
function az_btn( $href, $label, $variant = 'ghost', $icon = '', $external = false ) {
	return sprintf(
		'<a class="btn btn--%s" href="%s"%s><span>%s</span>%s</a>',
		esc_attr( $variant ),
		esc_url( $href ),
		$external ? ' target="_blank" rel="noopener"' : '',
		esc_html( $label ),
		$icon ? az_icon( $icon ) : ''
	);
}

/** A typographic link CTA. */
function az_link_cta( $href, $label, $icon = 'arrowRight', $external = false ) {
	return sprintf(
		'<a class="link-cta" href="%s"%s><span>%s</span>%s</a>',
		esc_url( $href ),
		$external ? ' target="_blank" rel="noopener"' : '',
		esc_html( $label ),
		az_icon( $icon )
	);
}

/** A chip. */
function az_chip( $label, $accent = false ) {
	return sprintf(
		'<span class="chip%s">%s</span>',
		$accent ? ' chip--accent' : '',
		esc_html( $label )
	);
}

/** A section head. Single column, stacked, never tag-left. */
function az_head( $title, $body = '', $level = 'h2', $tick = true ) {
	return sprintf(
		'<div class="head">%s<%s>%s</%s>%s</div>',
		$tick ? '<span class="tick" aria-hidden="true"></span>' : '',
		$level, esc_html( $title ), $level,
		$body ? '<p>' . esc_html( $body ) . '</p>' : ''
	);
}

/** The visible marker for content that is still waiting on the team. */
function az_note( $text ) {
	return '<p class="note">' . az_icon( 'info' ) . '<span>' . esc_html( $text ) . '</span></p>';
}

/** Breadcrumbs, matching the static markup and emitting BreadcrumbList. */
function az_crumbs( array $trail ) {
	$items = '';
	$last  = count( $trail ) - 1;
	foreach ( $trail as $i => $c ) {
		$items .= '<li>' . ( $i === $last
			? '<span aria-current="page">' . esc_html( $c['label'] ) . '</span>'
			: '<a href="' . esc_url( $c['href'] ) . '">' . esc_html( $c['label'] ) . '</a>' ) . '</li>';
	}
	return '<nav class="crumbs" aria-label="Breadcrumb"><ol>' . $items . '</ol></nav>';
}

/**
 * Paragraphs from a textarea field: blank-line separated, escaped, with
 * WordPress's own smart quotes applied.
 */
function az_paras( $text, $class = '' ) {
	$out = '';
	foreach ( preg_split( '/\R{2,}/', trim( (string) $text ) ) as $p ) {
		if ( '' === trim( $p ) ) {
			continue;
		}
		$out .= sprintf(
			'<p%s>%s</p>',
			$class ? ' class="' . esc_attr( $class ) . '"' : '',
			wptexturize( esc_html( trim( $p ) ) )
		);
	}
	return $out;
}

/** Escaped text with WordPress's typographic substitutions. */
function az_t( $text ) {
	return wptexturize( esc_html( (string) $text ) );
}

/**
 * Render a page part.
 *
 * Parts are the verified static markup with four placeholders. Keeping
 * them as data rather than PHP means the theme and the static build can
 * never drift: build-wp.js regenerates them from the same source.
 */
function az_part( $name ) {
	$file = AZ_DIR . '/parts/' . sanitize_file_name( $name ) . '.html';
	if ( ! file_exists( $file ) ) {
		return false;
	}
	$html = (string) file_get_contents( $file );

	$html = strtr( $html, array(
		'{{URI}}'  => esc_url( AZ_URI ),
		'{{HOME}}' => esc_url( untrailingslashit( home_url() ) ),
	) );

	$html = preg_replace_callback( '/\{\{OPT:([a-z_]+)\}\}/', function ( $m ) {
		return esc_html( az_opt( $m[1] ) );
	}, $html );

	$chunks = preg_split( '/\{\{REGION:([a-z_]+)\}\}/', $html, -1, PREG_SPLIT_DELIM_CAPTURE );
	foreach ( $chunks as $i => $chunk ) {
		if ( 1 === $i % 2 ) {
			az_region( $chunk );
		} else {
			echo $chunk; // phpcs:ignore WordPress.Security.EscapeOutput -- theme-authored markup, escaped at build time.
		}
	}
	return true;
}

/**
 * Anything the team adds in the block editor renders under the authored
 * page, so a page can grow without a developer.
 */
function az_extra_content() {
	if ( ! is_singular() ) {
		return;
	}
	$content = trim( (string) get_post_field( 'post_content', get_the_ID() ) );
	if ( '' === $content ) {
		return;
	}
	echo '<section class="band band--tight rule-top"><div class="wrap-read az-prose">';
	the_content();
	echo '</div></section>';
}
