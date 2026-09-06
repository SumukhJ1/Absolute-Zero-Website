<?php
/**
 * One workshop. The brief asked that future library sessions each get
 * their own post, so this is the page they land on.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();
the_post();

$az_venue = az_meta( '_az_venue' );
$az_plan  = az_meta_list( '_az_plan' );
$az_video = az_meta( '_az_video' );
$az_terms = wp_get_post_terms( get_the_ID(), 'az_season' );
$az_season = $az_terms && ! is_wp_error( $az_terms ) ? $az_terms[0] : null;
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
			<?php if ( $az_season ) : ?>
				<p class="child-head__kicker"><?php echo esc_html( $az_season->name ); ?></p>
			<?php endif; ?>
			<h1><?php the_title(); ?></h1>
			<?php echo az_paras( az_meta( '_az_summary' ), 'lede' ); ?>
		</div>

		<dl class="child-facts">
			<?php if ( $az_venue ) : ?>
				<div><dt><?php esc_html_e( 'Venue', 'absolute-zero' ); ?></dt><dd><?php echo esc_html( $az_venue ); ?></dd></div>
			<?php endif; ?>
			<div><dt><?php esc_html_e( 'Date', 'absolute-zero' ); ?></dt><dd><?php echo esc_html( az_meta( '_az_date' ) ); ?></dd></div>
			<?php if ( az_meta( '_az_audience' ) ) : ?>
				<div><dt><?php esc_html_e( 'Audience', 'absolute-zero' ); ?></dt><dd><?php echo esc_html( az_meta( '_az_audience' ) ); ?></dd></div>
			<?php endif; ?>
			<div><dt><?php esc_html_e( 'Cost', 'absolute-zero' ); ?></dt><dd><?php esc_html_e( 'Free', 'absolute-zero' ); ?></dd></div>
		</dl>
	</div>
</section>

<?php if ( has_post_thumbnail() ) : ?>
	<section class="band band--tight">
		<div class="wrap">
			<figure class="frame frame--wide">
				<?php the_post_thumbnail( 'az-hero', array( 'alt' => sprintf( '%s at %s.', get_the_title(), $az_venue ) ) ); ?>
			</figure>
		</div>
	</section>
<?php endif; ?>

<section class="band band--tight rule-top">
	<div class="wrap">
		<div class="split split--narrow">
			<div>
				<span class="tick" aria-hidden="true"></span>
				<h2><?php esc_html_e( 'What happened', 'absolute-zero' ); ?></h2>
			</div>
			<div class="stack">
				<?php
				echo az_paras( az_meta( '_az_detail' ) );
				the_content();
				if ( $az_plan ) {
					echo '<div class="ws__plan"><h3>' . esc_html__( 'What we ran', 'absolute-zero' ) . '</h3><ul>';
					foreach ( $az_plan as $p ) {
						printf( '<li>%s</li>', esc_html( $p ) );
					}
					echo '</ul></div>';
				}
				if ( $az_video ) {
					printf( '<p>%s</p>', az_link_cta( $az_video, __( 'Watch the session video', 'absolute-zero' ), 'arrowUpRight', true ) );
				}
				?>
			</div>
		</div>
	</div>
</section>

<section class="band band--open-bottom">
	<div class="wrap">
		<div class="panel panel--accent">
			<h2><?php esc_html_e( 'Want one of these at your venue?', 'absolute-zero' ); ?></h2>
			<p><?php esc_html_e( 'Tell us the age group, roughly how many students and the room. We bring the robot, and there is no charge.', 'absolute-zero' ); ?></p>
			<div class="btn-row" style="margin-top:var(--space-md)">
				<?php
				echo az_btn( home_url( '/contact/' ), __( 'Book a workshop', 'absolute-zero' ), 'primary', 'arrowRight' );
				echo az_btn( home_url( '/outreach/' ), __( 'All our workshops', 'absolute-zero' ), 'ghost' );
				?>
			</div>
		</div>
	</div>
</section>
<?php
get_footer();
