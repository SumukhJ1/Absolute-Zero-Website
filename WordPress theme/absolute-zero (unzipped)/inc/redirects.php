<?php
/**
 * Every URL the old WordPress.com site exposed, sent to its replacement
 * with a 301. Losing these would be the most expensive mistake in the
 * rebuild, so they live in the theme rather than in a plugin somebody
 * might deactivate.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_redirect_map() {
	return array(
		'/our-team-2'                 => '/our-team/',
		'/outreach-workshops'         => '/outreach/',
		'/sponsors-donors'            => '/sponsors-and-donors/',
		'/sponsors'                   => '/sponsors-and-donors/',
		'/our-socials'                => '/contact/',
		'/mission'                    => '/mission-and-vision/',
		'/ftc-collaboration-summit'   => '/outreach/ftc-collaboration-summit/',
		'/ftc-collaboration-summit-2' => '/outreach/ftc-collaboration-summit/',
		'/videos'                     => '/outreach/',
		'/2026/04/02/march-2026-library-workshops'      => '/outreach/#workshops',
		'/2026/03/01/2025-2026-library-workshops-outreach' => '/outreach/#workshops',
		'/2026/03/01/2025-2026-season-photo-gallery'    => '/build-and-program/',
		'/2024/01/24/meet-up-with-local-girl-scouts'    => '/outreach/#workshops',
		'/2024/01/22/2022-2023-season-photo-gallery'    => '/build-and-program/',
		'/2022/01/09/getting-started-with-ftc'          => '/outreach/open-access/',
		'/2020/05/04/encouraging-robotics-during-quarantine' => '/outreach/#workshops',
		'/2019/09/29/2019-20-event-blog'                => '/build-and-program/',
		'/2019/02/17/2018-19-event-blog'                => '/build-and-program/',
		'/2018/08/09/2017-2018-event-blog'              => '/build-and-program/',
	);
}

add_action( 'template_redirect', 'az_legacy_redirects', 1 );
function az_legacy_redirects() {
	if ( ! is_404() ) {
		return;
	}
	$path = untrailingslashit( strtok( $_SERVER['REQUEST_URI'] ?? '', '?' ) );
	$path = '/' . ltrim( wp_unslash( $path ), '/' );
	$map  = az_redirect_map();

	if ( isset( $map[ $path ] ) ) {
		wp_safe_redirect( home_url( $map[ $path ] ), 301 );
		exit;
	}

	/* The old site served the team page at two addresses and the sponsors
	   page under a stale slug. Catch any remaining near-miss by slug. */
	$slug = basename( $path );
	foreach ( $map as $from => $to ) {
		if ( basename( $from ) === $slug ) {
			wp_safe_redirect( home_url( $to ), 301 );
			exit;
		}
	}
}

/* WordPress.com appended a share query to every outbound link. Strip it
   so those URLs do not create duplicate-content copies. */
add_action( 'template_redirect', function () {
	if ( isset( $_GET['share'] ) || isset( $_GET['like_comment'] ) ) {
		wp_safe_redirect( remove_query_arg( array( 'share', 'like_comment', '_wpnonce' ) ), 301 );
		exit;
	}
}, 2 );
