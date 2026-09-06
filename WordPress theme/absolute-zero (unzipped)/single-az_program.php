<?php
/**
 * One outreach programme.
 *
 * The nine shipped programmes each have an authored part, because each
 * one uses a different macrostructure. A programme the team adds later
 * gets the generic layout below, built entirely from its fields.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();
the_post();

$az_slug = get_post_field( 'post_name', get_the_ID() );

if ( az_part( 'outreach-' . $az_slug ) ) {
	az_extra_content();
} else {
	get_template_part( 'template-parts/programme-generic' );
}

get_footer();
