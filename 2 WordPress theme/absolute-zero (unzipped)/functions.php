<?php
/**
 * Absolute Zero, FTC Team 12096.
 *
 * Loads in dependency order. Nothing here does work at include time
 * beyond registering hooks.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

define( 'AZ_VERSION', '1.0.0' );
define( 'AZ_DIR', get_template_directory() );
define( 'AZ_URI', get_template_directory_uri() );

require_once AZ_DIR . '/inc/setup.php';      // theme supports, menus, image sizes
require_once AZ_DIR . '/inc/enqueue.php';    // the one stylesheet, the one script
require_once AZ_DIR . '/inc/icons.php';      // the single icon family
require_once AZ_DIR . '/inc/render.php';     // markup helpers shared by templates
require_once AZ_DIR . '/inc/cpt.php';        // workshops, roster, sponsors, programmes, library
require_once AZ_DIR . '/inc/meta.php';       // meta boxes, no plugin dependency
require_once AZ_DIR . '/inc/options.php';    // the numbers and strings the team edits
require_once AZ_DIR . '/inc/regions.php';    // the loops that fill the marked regions
require_once AZ_DIR . '/inc/seo.php';        // titles, descriptions, OG, JSON-LD, sitemap hints
require_once AZ_DIR . '/inc/redirects.php';  // every old WordPress.com URL, 301'd
require_once AZ_DIR . '/inc/nav.php';        // the snowflake island's menu walker
require_once AZ_DIR . '/inc/seed.php';       // one-time content import on activation
