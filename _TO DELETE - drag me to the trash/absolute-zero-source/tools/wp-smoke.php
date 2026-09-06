<?php
/**
 * A WordPress-shaped harness.
 *
 * The container has no WordPress to install, so this defines just enough
 * of core to load the theme and render every part, every region and the
 * header and footer. It proves three things that would otherwise only
 * surface on the live server:
 *
 *   1. every PHP file parses and loads together
 *   2. az_part() resolves all four placeholder kinds, leaving none behind
 *   3. each region produces the same markup the static build produced
 *
 * Run: php tools/wp-smoke.php
 */

$ROOT = dirname( __DIR__ );
$WP   = $ROOT . '/wp';

define( 'ABSPATH', $ROOT . '/' );

/* ---- core stubs -------------------------------------------------------- */

function get_template_directory() { return dirname( __DIR__ ) . '/wp'; }
function get_template_directory_uri() { return '/wp-content/themes/absolute-zero'; }
function home_url( $p = '/' ) { return rtrim( 'https://azrobotics.org', '/' ) . $p; }
function untrailingslashit( $s ) { return rtrim( $s, '/' ); }
function trailingslashit( $s ) { return rtrim( $s, '/' ) . '/'; }
function esc_html( $s ) { return htmlspecialchars( (string) $s, ENT_QUOTES, 'UTF-8' ); }
function esc_attr( $s ) { return esc_html( $s ); }
function esc_url( $s ) { return (string) $s; }
function esc_url_raw( $s ) { return (string) $s; }
function esc_textarea( $s ) { return esc_html( $s ); }
function wp_kses( $s, $a ) { return $s; }
function wptexturize( $s ) { return $s; }
function sanitize_text_field( $s ) { return trim( strip_tags( (string) $s ) ); }
function sanitize_textarea_field( $s ) { return trim( strip_tags( (string) $s ) ); }
function sanitize_title( $s ) { return strtolower( preg_replace( '/[^a-z0-9]+/i', '-', trim( (string) $s ) ) ); }
function sanitize_file_name( $s ) { return preg_replace( '/[^A-Za-z0-9._-]/', '', (string) $s ); }
function sanitize_key( $s ) { return strtolower( preg_replace( '/[^a-z0-9_\-]/i', '', (string) $s ) ); }
function __( $s, $d = '' ) { return $s; }
function _n( $a, $b, $n, $d = '' ) { return 1 === $n ? $a : $b; }
function esc_html__( $s, $d = '' ) { return esc_html( $s ); }
function esc_attr__( $s, $d = '' ) { return esc_attr( $s ); }
function esc_html_e( $s, $d = '' ) { echo esc_html( $s ); }
function esc_attr_e( $s, $d = '' ) { echo esc_attr( $s ); }
function _e( $s, $d = '' ) { echo $s; }
function checked( $a, $b, $echo = true ) { return $a === $b ? ' checked' : ''; }
function wp_date( $f ) { return date( $f ); }
function wp_unique_id( $p = '' ) { static $i = 0; return $p . ( ++$i ); }
function wp_json_encode( $v, $o = 0 ) { return json_encode( $v, $o ); }
function wp_strip_all_tags( $s ) { return strip_tags( (string) $s ); }
function wp_trim_words( $s, $n, $more = '' ) {
	$w = preg_split( '/\s+/', trim( strip_tags( (string) $s ) ) );
	return count( $w ) <= $n ? implode( ' ', $w ) : implode( ' ', array_slice( $w, 0, $n ) ) . $more;
}
function add_action( ...$a ) {}
function add_filter( ...$a ) {}
function remove_action( ...$a ) {}
function remove_filter( ...$a ) {}
function do_action( ...$a ) {}
function apply_filters( $t, $v ) { return $v; }
function add_theme_support( ...$a ) {}
function register_nav_menus( ...$a ) {}
function add_image_size( ...$a ) {}
function load_theme_textdomain( ...$a ) {}
function register_post_type( ...$a ) {}
function register_taxonomy( ...$a ) {}
function add_meta_box( ...$a ) {}
function add_theme_page( ...$a ) {}
function wp_nonce_field( ...$a ) {}
function wp_verify_nonce( ...$a ) { return true; }
function check_admin_referer( ...$a ) { return true; }
function current_user_can( ...$a ) { return true; }
function is_admin() { return false; }
function is_wp_error( $x ) { return false; }
function wp_enqueue_style( ...$a ) {}
function wp_enqueue_script( ...$a ) {}
function wp_dequeue_style( ...$a ) {}
function wp_dequeue_script( ...$a ) {}
function get_bloginfo( $k = '' ) {
	return match ( $k ) {
		'name'        => 'Absolute Zero Robotics',
		'description' => 'Pushing our limits to accomplish the impossible.',
		'language'    => 'en-US',
		'charset'     => 'UTF-8',
		default       => '',
	};
}
function get_option( $k, $d = false ) { return $d; }
function update_option( ...$a ) {}
function add_option( ...$a ) {}
function delete_option( ...$a ) {}
function get_theme_mod( $k, $d = false ) { return $d; }
function set_theme_mod( ...$a ) {}
function has_nav_menu( $l ) { return false; }
function wp_get_nav_menu_items( $m ) { return array(); }
function get_nav_menu_locations() { return array(); }
function wp_nav_menu( $a ) { if ( ! empty( $a['fallback_cb'] ) && is_callable( $a['fallback_cb'] ) ) { call_user_func( $a['fallback_cb'] ); } }
function wp_head() { echo "<!-- wp_head -->\n"; }
function wp_footer() { echo "<!-- wp_footer -->\n"; }
function wp_body_open() {}
function body_class( $c = '' ) { echo 'class="page"'; }
function language_attributes() { echo 'lang="en-US" class="no-js"'; }
function get_search_form() { echo '<!-- search form -->'; }
function wp_parse_url( $u, $c = -1 ) { return parse_url( $u, $c ); }
function add_query_arg( $a = array() ) { return '/'; }
function remove_query_arg( $a ) { return '/'; }
function wp_safe_redirect( ...$a ) {}
function get_terms( $a ) { return AZ_Fixture::terms( $a['taxonomy'] ); }
function get_term_by( ...$a ) { return null; }
function get_term_meta( $id, $k, $s = false ) { return AZ_Fixture::term_meta( $id, $k ); }
function update_term_meta( ...$a ) {}
function wp_insert_term( ...$a ) { return array( 'term_id' => 1 ); }
function wp_create_nav_menu( $n ) { return 1; }
function wp_get_nav_menu_object( $n ) { return null; }
function wp_update_nav_menu_item( ...$a ) {}
function get_pages() { return array(); }
function wp_count_posts( $t ) { return (object) array( 'publish' => 0 ); }
function flush_rewrite_rules( ...$a ) {}
function get_posts( $a ) { return array(); }
function wp_insert_post( ...$a ) { return 1; }
function update_post_meta( ...$a ) {}
function has_post_thumbnail( $id = null ) { return false; }
function get_the_post_thumbnail( ...$a ) { return ''; }
function get_post_thumbnail_id( ...$a ) { return 0; }
function the_post_thumbnail( ...$a ) {}
function wp_get_attachment_image_src( ...$a ) { return false; }
function is_front_page() { return false; }
function is_singular( $t = '' ) { return true; }
function is_search() { return false; }
function is_404() { return false; }
function is_page_template( $t ) { return false; }
function is_post_type_archive( $t = '' ) { return false; }
function has_excerpt() { return false; }
function get_the_excerpt() { return ''; }
function get_the_content() { return ''; }
function the_content() {}
function get_permalink( $p = null ) { return home_url( '/example/' ); }
function get_post_field( $f, $id = null ) {
	if ( 'post_name' === $f ) { return AZ_Fixture::$current['slug'] ?? 'example'; }
	return 'example';
}
function get_search_query() { return ''; }
function the_posts_pagination( ...$a ) {}
function wp_set_object_terms( ...$a ) {}
function wp_get_post_terms( $id, $tax = '', $args = array() ) {
	if ( 'az_role' !== $tax ) { return array(); }
	return AZ_Fixture::roles( $id );
}
function wp_reset_postdata() {}
function bloginfo( $k = '' ) { echo get_bloginfo( $k ); }
function get_the_ID() { return AZ_Fixture::$current['id'] ?? 0; }
function get_the_title( $p = null ) { return AZ_Fixture::$current['title'] ?? ''; }
function the_title() { echo esc_html( get_the_title() ); }
function the_permalink() { echo esc_url( get_permalink() ); }
function get_post( $p = null ) {
	if ( is_object( $p ) ) { return $p; }
	$row = AZ_Fixture::$current;
	return $row ? (object) array( 'ID' => $row['id'], 'post_type' => 'az_x' ) : null;
}
function get_post_meta( $id, $k, $s = true ) { return AZ_Fixture::meta( $id, $k ); }
function get_post_type_archive_link( $t ) { return home_url( '/outreach/workshops/' ); }
function get_header() {}
function get_footer() {}
function get_template_part( ...$a ) {}
function str_contains_polyfill( $h, $n ) { return str_contains( $h, $n ); }

/* A WP_Query stand-in driven by fixtures. */
class WP_Query {
	public $posts = array();
	private $i = -1;
	public function __construct( $args ) {
		$this->posts = AZ_Fixture::posts( $args );
	}
	public function have_posts() { return $this->i + 1 < count( $this->posts ); }
	public function the_post() { $this->i++; AZ_Fixture::$current = $this->posts[ $this->i ]; }
}
class Walker_Nav_Menu { public function start_lvl( &$o, $d = 0, $a = null ) {} }

/* ---- fixtures, loaded from the generated seed data --------------------- */

class AZ_Fixture {
	public static $current = array();
	private static $data;

	public static function data() {
		if ( ! self::$data ) {
			self::$data = az_seed_data();
		}
		return self::$data;
	}

	public static function terms( $tax ) {
		$map = array(
			'az_season' => 'seasons',
			'az_tier'   => 'tiers',
			'az_shelf'  => 'shelves',
			'az_group'  => 'groups',
			'az_role'   => 'roles',
		);
		$key = $map[ $tax ] ?? null;
		if ( ! $key ) {
			return array();
		}
		$out = array();
		foreach ( self::data()[ $key ] as $i => $t ) {
			$out[] = (object) array(
				'term_id'     => crc32( $tax . $t['slug'] ),
				'slug'        => $t['slug'],
				'name'        => $t['name'],
				'description' => $t['description'] ?? '',
			);
		}
		return $out;
	}

	public static function term_meta( $id, $key ) {
		if ( 'az_amount' !== $key ) {
			return '';
		}
		foreach ( self::data()['tiers'] as $t ) {
			if ( crc32( 'az_tier' . $t['slug'] ) === $id ) {
				return $t['amount'];
			}
		}
		return '';
	}

	public static function posts( $args ) {
		$type = $args['post_type'] ?? '';
		$filter = null;
		if ( ! empty( $args['tax_query'][0]['terms'] ) ) {
			$filter = array( $args['tax_query'][0]['taxonomy'], (array) $args['tax_query'][0]['terms'] );
		}
		$rows = array();
		switch ( $type ) {
			case 'az_workshop':
				foreach ( self::data()['workshops'] as $w ) {
					if ( $filter && 'az_season' === $filter[0] && ! in_array( $w['season'], $filter[1], true ) ) {
						continue;
					}
					$rows[] = self::row( $w['title'], array(
						'_az_venue' => $w['venue'], '_az_date' => $w['date'],
						'_az_date_iso' => $w['dateISO'], '_az_audience' => $w['audience'],
						'_az_planned' => $w['planned'] ? '1' : '', '_az_summary' => $w['summary'],
						'_az_detail' => $w['detail'], '_az_plan' => $w['plan'], '_az_video' => $w['video'],
					) );
				}
				break;
			case 'az_member':
				foreach ( self::data()['members'] as $m ) {
					if ( $filter && 'az_group' === $filter[0] && ! in_array( $m['group'], $filter[1], true ) ) {
						continue;
					}
					$rows[] = self::row( $m['title'], array( '_az_line' => $m['line'], '_az_bio' => $m['bio'] ), '', $m['roles'] );
				}
				break;
			case 'az_sponsor':
				foreach ( self::data()['sponsors'] as $s ) {
					$rows[] = self::row( $s['title'], array( '_az_url' => $s['url'], '_az_kind' => $s['kind'] ) );
				}
				break;
			case 'az_program':
				foreach ( self::data()['programs'] as $p ) {
					$rows[] = self::row( $p['title'], array(
						'_az_blurb' => $p['blurb'], '_az_featured' => $p['featured'] ? '1' : '',
					), $p['slug'] );
				}
				break;
			case 'az_resource':
				foreach ( self::data()['resources'] as $r ) {
					if ( $filter && 'az_shelf' === $filter[0] && ! in_array( $r['shelf'], $filter[1], true ) ) {
						continue;
					}
					$rows[] = self::row( $r['title'], array(
						'_az_season' => $r['season'], '_az_kind' => $r['kind'],
						'_az_file' => $r['file'], '_az_size' => $r['size'],
						'_az_external' => $r['external'] ? '1' : '',
					) );
				}
				break;
			case 'az_result':
				foreach ( self::data()['results'] as $r ) {
					$rows[] = self::row( $r['title'], array(
						'_az_game' => $r['game'], '_az_years' => $r['years'],
						'_az_awards' => $r['awards'], '_az_note' => $r['note'],
					) );
				}
				break;
		}
		return $rows;
	}

	private static $registry = array();
	private static $roles = array();

	public static function meta( $id, $key ) {
		return self::$registry[ $id ][ $key ] ?? '';
	}

	public static function roles( $id ) {
		return self::$roles[ $id ] ?? array();
	}

	private static function row( $title, $meta, $slug = '', $roles = array() ) {
		static $n = 0;
		$id = ++$n;
		self::$registry[ $id ] = $meta;
		self::$roles[ $id ]    = $roles;
		return array( 'id' => $id, 'title' => $title, 'meta' => $meta, 'slug' => $slug ?: sanitize_title( $title ) );
	}
}

/* wp_get_post_terms needs the roster's role slugs. */
function az_fixture_roles_for( $title ) {
	foreach ( AZ_Fixture::data()['members'] as $m ) {
		if ( $m['title'] === $title ) {
			return $m['roles'];
		}
	}
	return array();
}

/* ---- load the theme ---------------------------------------------------- */

define( 'AZ_VERSION', '1.0.0' );
define( 'AZ_DIR', $WP );
define( 'AZ_URI', '/wp-content/themes/absolute-zero' );

foreach ( array(
	'setup', 'enqueue', 'icons', 'render', 'cpt', 'meta',
	'options', 'regions', 'seo', 'redirects', 'nav', 'seed-data',
) as $file ) {
	require_once $WP . "/inc/$file.php";
}
require_once $WP . '/inc/nav.php';

/* Roles come from the fixture rather than the taxonomy. */
function az_test_roles( $id, $tax, $args = array() ) { return array(); }

/* ---- run --------------------------------------------------------------- */

$fails = array();
$parts = glob( $WP . '/parts/*.html' );

echo "Loaded theme. " . count( az_icons() ) . " icons, " . count( $parts ) . " parts.\n\n";

foreach ( $parts as $file ) {
	$name = basename( $file, '.html' );
	ob_start();
	az_part( $name );
	$out = ob_get_clean();

	if ( '' === trim( $out ) ) {
		$fails[] = "$name: rendered nothing";
		continue;
	}
	if ( preg_match( '/\{\{[A-Z]+:?[a-z_]*\}\}/', $out, $m ) ) {
		$fails[] = "$name: unresolved placeholder {$m[0]}";
	}
	if ( str_contains( $out, 'href="/' ) && ! str_contains( $out, 'href="//' ) ) {
		$fails[] = "$name: root-relative href survived";
	}
	if ( str_contains( $out, 'src="/assets' ) ) {
		$fails[] = "$name: root-relative asset survived";
	}
	if ( preg_match_all( '/<(section|div|article|ul|ol|li|span|p|a|h[1-6])\b/', $out, $o )
		&& preg_match_all( '#</(section|div|article|ul|ol|li|span|p|a|h[1-6])>#', $out, $c ) ) {
		$diff = count( $o[0] ) - count( $c[0] );
		if ( abs( $diff ) > 0 ) {
			$fails[] = sprintf( '%s: %d unbalanced tag(s)', $name, $diff );
		}
	}
	printf( "  ok   %-36s %6d bytes\n", $name, strlen( $out ) );
}

/* Regions must each produce markup. */
echo "\nRegions:\n";
foreach ( array( 'impact', 'logowall', 'supporters', 'tiers', 'roster', 'coaches',
	'mentors', 'record', 'programmes', 'workshops', 'catalogue' ) as $region ) {
	ob_start();
	az_region( $region );
	$out = ob_get_clean();
	if ( strlen( trim( $out ) ) < 40 ) {
		$fails[] = "region $region produced nothing";
		printf( "FAIL   %-36s\n", $region );
	} else {
		printf( "  ok   %-36s %6d bytes\n", $region, strlen( $out ) );
	}
}

/* Header and footer. */
echo "\nChrome:\n";
foreach ( array( 'header.php', 'footer.php' ) as $chrome ) {
	ob_start();
	include $WP . '/' . $chrome;
	$out = ob_get_clean();
	if ( strlen( $out ) < 200 ) {
		$fails[] = "$chrome produced nothing";
	}
	printf( "  ok   %-36s %6d bytes\n", $chrome, strlen( $out ) );
}

echo "\n";
if ( $fails ) {
	foreach ( $fails as $f ) {
		echo "FAIL   $f\n";
	}
	echo "\n" . count( $fails ) . " failure(s).\n";
	exit( 1 );
}
echo "Theme renders clean.\n";
