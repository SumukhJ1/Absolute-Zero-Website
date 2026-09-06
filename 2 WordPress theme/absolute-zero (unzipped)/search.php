<?php
/**
 * @package absolute-zero
 */
defined( 'ABSPATH' ) || exit;
get_header();
?>
<section class="band band--open-top">
	<div class="wrap">
		<?php echo az_crumbs( array(
			array( 'label' => __( 'Home', 'absolute-zero' ), 'href' => home_url( '/' ) ),
			array( 'label' => __( 'Search', 'absolute-zero' ), 'href' => '#' ),
		) ); ?>
		<div class="page-head">
			<h1><?php
				/* translators: %s: the search term */
				printf( esc_html__( 'Results for %s', 'absolute-zero' ), '&ldquo;' . esc_html( get_search_query() ) . '&rdquo;' );
			?></h1>
			<p class="lede"><?php
				printf(
					esc_html( _n( '%d match.', '%d matches.', (int) $GLOBALS['wp_query']->found_posts, 'absolute-zero' ) ),
					(int) $GLOBALS['wp_query']->found_posts
				);
			?></p>
		</div>
		<div style="margin-top:var(--space-lg);max-width:34rem"><?php get_search_form(); ?></div>
	</div>
</section>

<section class="band band--tight rule-top">
	<div class="wrap">
		<?php if ( have_posts() ) : ?>
			<ul class="prog-list bare">
				<?php while ( have_posts() ) : the_post(); ?>
					<li>
						<a class="prog-row" href="<?php the_permalink(); ?>">
							<span class="prog-row__title"><?php the_title(); ?></span>
							<span class="prog-row__blurb"><?php echo esc_html( wp_trim_words( get_the_excerpt(), 28, '' ) ); ?></span>
							<span class="prog-row__go" aria-hidden="true"><?php echo az_icon( 'arrowRight' ); ?></span>
						</a>
					</li>
				<?php endwhile; ?>
			</ul>
			<div style="margin-top:var(--space-xl)"><?php the_posts_pagination( array( 'mid_size' => 2 ) ); ?></div>
		<?php else : ?>
			<p class="lede"><?php esc_html_e( 'Nothing matched. Try a shorter term, or browse the outreach programmes.', 'absolute-zero' ); ?></p>
			<div class="btn-row" style="margin-top:var(--space-lg)">
				<?php echo az_btn( home_url( '/outreach/' ), __( 'Outreach', 'absolute-zero' ), 'primary', 'arrowRight' ); ?>
			</div>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
