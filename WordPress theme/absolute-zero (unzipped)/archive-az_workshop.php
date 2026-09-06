<?php
/**
 * The full workshop archive, for search engines and for anyone who wants
 * the list without the surrounding page. The Outreach page is the one
 * humans are pointed at.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();
?>
<section class="band band--open-top">
	<div class="wrap">
		<?php
		echo az_crumbs( array(
			array( 'label' => __( 'Home', 'absolute-zero' ), 'href' => home_url( '/' ) ),
			array( 'label' => __( 'Outreach', 'absolute-zero' ), 'href' => home_url( '/outreach/' ) ),
			array( 'label' => __( 'Workshops', 'absolute-zero' ), 'href' => get_post_type_archive_link( 'az_workshop' ) ),
		) );
		?>
		<div class="page-head">
			<h1><?php esc_html_e( 'Every workshop', 'absolute-zero' ); ?></h1>
			<p class="lede"><?php esc_html_e( 'Every session we have planned, staffed and run, newest first. The Outreach page groups the same list by season.', 'absolute-zero' ); ?></p>
			<div class="btn-row" style="margin-top:var(--space-lg)">
				<?php echo az_btn( home_url( '/outreach/#workshops' ), __( 'Browse by season', 'absolute-zero' ), 'primary', 'arrowRight' ); ?>
			</div>
		</div>
	</div>
</section>

<section class="band band--tight rule-top">
	<div class="wrap">
		<div class="ws-list">
			<?php
			$az_i = 0;
			while ( have_posts() ) :
				the_post();
				$az_terms  = wp_get_post_terms( get_the_ID(), 'az_season', array( 'fields' => 'slugs' ) );
				$az_season = ( $az_terms && ! is_wp_error( $az_terms ) ) ? $az_terms[0] : '';
				az_workshop_entry( $az_season, $az_i < 2 );
				$az_i++;
			endwhile;
			?>
		</div>
		<div style="margin-top:var(--space-xl)"><?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?></div>
	</div>
</section>
<?php
get_footer();
