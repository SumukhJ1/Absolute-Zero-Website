<?php
/**
 * The layout a newly added programme gets before anyone writes a bespoke
 * one for it. Built from the programme's own fields, so it is complete
 * from the moment it is published.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

$az_facts   = az_meta_pairs( '_az_facts' );
$az_kicker  = az_meta( '_az_kicker' );
$az_lede    = az_meta( '_az_lede' ) ?: az_meta( '_az_blurb' );
?>
<section class="band band--open-top child-head">
	<div class="wrap">
		<?php
		echo az_crumbs( array(
			array( 'label' => __( 'Home', 'absolute-zero' ), 'href' => home_url( '/' ) ),
			array( 'label' => __( 'Outreach', 'absolute-zero' ), 'href' => home_url( '/outreach/' ) ),
			array( 'label' => get_the_title(), 'href' => get_permalink() ),
		) );
		?>
		<div class="page-head">
			<?php if ( $az_kicker ) : ?>
				<p class="child-head__kicker"><?php echo esc_html( $az_kicker ); ?></p>
			<?php endif; ?>
			<h1><?php the_title(); ?></h1>
			<?php if ( $az_lede ) : ?>
				<p class="lede"><?php echo esc_html( $az_lede ); ?></p>
			<?php endif; ?>
			<div class="btn-row" style="margin-top:var(--space-lg)">
				<?php echo az_btn( home_url( '/contact/' ), __( 'Ask about a session', 'absolute-zero' ), 'primary', 'arrowRight' ); ?>
			</div>
		</div>

		<?php if ( $az_facts ) : ?>
			<dl class="child-facts">
				<?php foreach ( $az_facts as $f ) : ?>
					<div><dt><?php echo esc_html( $f['k'] ); ?></dt><dd><?php echo esc_html( $f['v'] ); ?></dd></div>
				<?php endforeach; ?>
			</dl>
		<?php endif; ?>
	</div>
</section>

<?php if ( has_post_thumbnail() ) : ?>
	<section class="band band--tight">
		<div class="wrap">
			<figure class="frame frame--wide"><?php the_post_thumbnail( 'az-hero', array( 'alt' => get_the_title() ) ); ?></figure>
		</div>
	</section>
<?php endif; ?>

<section class="band band--tight rule-top">
	<div class="wrap-read az-prose"><?php the_content(); ?></div>
</section>

<?php get_template_part( 'template-parts/programme-nav' ); ?>
