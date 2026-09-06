<?php
/**
 * A page with no dedicated template: the seven top-level pages each map
 * to a part by slug, and anything else falls back to the block editor
 * inside the theme's reading measure.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();

$az_slug = get_post_field( 'post_name', get_the_ID() );

if ( ! az_part( $az_slug ) ) :
	?>
	<section class="band band--open-top">
		<div class="wrap-read">
			<?php
			echo az_crumbs( array(
				array( 'label' => __( 'Home', 'absolute-zero' ), 'href' => home_url( '/' ) ),
				array( 'label' => get_the_title(), 'href' => get_permalink() ),
			) );
			?>
			<div class="page-head"><h1><?php the_title(); ?></h1></div>
		</div>
	</section>
	<section class="band band--tight">
		<div class="wrap-read az-prose"><?php the_content(); ?></div>
	</section>
	<?php
else :
	az_extra_content();
endif;

get_footer();
