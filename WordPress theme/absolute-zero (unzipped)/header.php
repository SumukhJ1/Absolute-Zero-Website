<?php
/**
 * The document head and the snowflake island.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="profile" href="https://gmpg.org/xfn/11">
<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link" href="#main"><?php esc_html_e( 'Skip to content', 'absolute-zero' ); ?></a>

<header class="site-nav" data-nav>
	<div class="nav__inner">

		<div class="nav__bar">
			<a class="nav__mark" href="<?php echo esc_url( home_url( '/' ) ); ?>"
			   aria-label="<?php echo esc_attr( sprintf( __( '%s, home', 'absolute-zero' ), get_bloginfo( 'name' ) ) ); ?>">
				<?php echo az_flake_mark(); ?>
				<span class="nav__wordmark">Absolute Zero <span><?php echo esc_html( az_opt( 'az_team_number' ) ); ?></span></span>
			</a>

			<nav class="nav__menu" aria-label="<?php esc_attr_e( 'Primary', 'absolute-zero' ); ?>" id="nav-menu">
				<?php
				if ( has_nav_menu( 'primary' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'nav__links',
						'depth'          => 1,
						'walker'         => new AZ_Nav_Walker(),
						'fallback_cb'    => 'az_nav_fallback',
					) );
				} else {
					az_nav_fallback();
				}
				?>
			</nav>

			<a class="btn btn--primary nav__cta" href="<?php echo esc_url( home_url( '/sponsors-and-donors/' ) ); ?>">
				<?php esc_html_e( 'Support us', 'absolute-zero' ); ?>
			</a>

			<button class="nav__toggle" type="button" aria-expanded="false"
			        aria-controls="nav-menu" aria-label="<?php esc_attr_e( 'Open menu', 'absolute-zero' ); ?>">
				<span class="icon-menu"><?php echo az_icon( 'menu' ); ?></span>
				<span class="icon-close"><?php echo az_icon( 'close' ); ?></span>
			</button>
		</div>

		<button class="nav__flake" type="button" aria-expanded="false" aria-controls="nav-menu">
			<?php echo az_flake_mark(); ?>
			<span class="nav__flake-label"><?php echo esc_html( az_current_label() ); ?></span>
			<span class="visually-hidden"><?php esc_html_e( 'Open the menu', 'absolute-zero' ); ?></span>
		</button>

	</div>
</header>

<main id="main" class="site-main" tabindex="-1">
