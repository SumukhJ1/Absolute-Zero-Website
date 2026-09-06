<?php
/**
 * @package absolute-zero
 */
defined( 'ABSPATH' ) || exit;
?>
<form role="search" method="get" class="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<div class="field">
		<label for="s-<?php echo esc_attr( wp_unique_id() ); ?>"><?php esc_html_e( 'Search this site', 'absolute-zero' ); ?></label>
		<div class="btn-row" style="align-items:stretch;gap:var(--space-2xs)">
			<input class="input" type="search" id="s-<?php echo esc_attr( wp_unique_id() ); ?>"
			       name="s" value="<?php echo esc_attr( get_search_query() ); ?>"
			       placeholder="<?php esc_attr_e( 'Workshops, sponsors, guides', 'absolute-zero' ); ?>">
			<button class="btn btn--primary" type="submit"><span><?php esc_html_e( 'Search', 'absolute-zero' ); ?></span></button>
		</div>
	</div>
</form>
