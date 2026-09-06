<?php
/**
 * Fallback. Every real route has its own template; this catches anything
 * that slips through, such as a blog archive if one is ever enabled.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
get_header();
?>
<section class="band band--open-top">
	<div class="wrap">
		<div class="page-head">
			<h1><?php echo esc_html( wp_get_document_title() ); ?></h1>
		</div>
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
			<p class="lede"><?php esc_html_e( 'Nothing here yet.', 'absolute-zero' ); ?></p>
		<?php endif; ?>
	</div>
</section>
<?php
get_footer();
