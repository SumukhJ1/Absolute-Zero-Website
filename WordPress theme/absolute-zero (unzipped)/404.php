<?php
/**
 * The page that catches an old bookmark the redirect map does not know.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();
?>
<section class="band band--tall">
	<div class="wrap-read">
		<h1><?php esc_html_e( 'That page is not here.', 'absolute-zero' ); ?></h1>
		<p class="lede">
			<?php esc_html_e( 'The link may be from the old site. Everything that used to live at an old address has been moved, so the page you wanted probably exists at a new one.', 'absolute-zero' ); ?>
		</p>
		<div class="btn-row" style="margin-top:var(--space-lg)">
			<?php
			echo az_btn( home_url( '/' ), __( 'Home', 'absolute-zero' ), 'primary' );
			echo az_btn( home_url( '/outreach/' ), __( 'Outreach', 'absolute-zero' ), 'ghost' );
			echo az_btn( home_url( '/contact/' ), __( 'Contact', 'absolute-zero' ), 'ghost' );
			?>
		</div>
		<div style="margin-top:var(--space-2xl)"><?php get_search_form(); ?></div>
	</div>
</section>
<?php
get_footer();
