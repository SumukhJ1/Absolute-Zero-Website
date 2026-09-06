<?php
/**
 * Previous, hub, next. Keeps every programme two clicks from every other.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

$az_all = get_posts( array(
	'post_type'      => 'az_program',
	'posts_per_page' => -1,
	'orderby'        => 'menu_order title',
	'order'          => 'ASC',
	'fields'         => 'ids',
) );
if ( count( $az_all ) < 2 ) {
	return;
}
$az_i    = array_search( get_the_ID(), $az_all, true );
$az_prev = $az_all[ ( $az_i - 1 + count( $az_all ) ) % count( $az_all ) ];
$az_next = $az_all[ ( $az_i + 1 ) % count( $az_all ) ];
?>
<section class="band band--open-bottom rule-top">
	<div class="wrap">
		<div class="child-foot">
			<a class="child-foot__link child-foot__link--prev" href="<?php echo esc_url( get_permalink( $az_prev ) ); ?>">
				<span class="meta"><?php esc_html_e( 'Previous', 'absolute-zero' ); ?></span>
				<span class="child-foot__title"><?php echo esc_html( get_the_title( $az_prev ) ); ?></span>
			</a>
			<a class="child-foot__hub" href="<?php echo esc_url( home_url( '/outreach/' ) ); ?>">
				<?php echo az_icon( 'route' ); ?><span><?php esc_html_e( 'All outreach programmes', 'absolute-zero' ); ?></span>
			</a>
			<a class="child-foot__link child-foot__link--next" href="<?php echo esc_url( get_permalink( $az_next ) ); ?>">
				<span class="meta"><?php esc_html_e( 'Next', 'absolute-zero' ); ?></span>
				<span class="child-foot__title"><?php echo esc_html( get_the_title( $az_next ) ); ?></span>
			</a>
		</div>
	</div>
</section>
