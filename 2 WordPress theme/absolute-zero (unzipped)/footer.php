<?php
/**
 * Ft5 Statement, then one hairline meta row. Deliberately not a
 * four-column sitemap.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

$az_socials = array(
	array( 'YouTube',   az_opt( 'az_yt' ), 'youtube' ),
	array( 'Instagram', az_opt( 'az_ig' ), 'instagram' ),
	array( 'Facebook',  az_opt( 'az_fb' ), 'facebook' ),
	array( 'X',         az_opt( 'az_x' ),  'x' ),
);
?>
</main>

<footer class="site-footer">
	<div class="wrap">

		<p class="site-footer__statement"><?php echo wp_kses( az_footer_statement(), array( 'b' => array() ) ); ?></p>

		<div class="site-footer__grid">
			<div class="foot-group">
				<span class="foot-group__title"><?php esc_html_e( 'Get in touch', 'absolute-zero' ); ?></span>
				<a href="mailto:<?php echo esc_attr( az_opt( 'az_email' ) ); ?>"><?php echo esc_html( az_opt( 'az_email' ) ); ?></a>
				<p class="meta" style="margin-top:var(--space-2xs);max-width:34ch">
					<?php esc_html_e( 'Sponsorship, mentoring requests and workshop bookings all reach the same inbox. A student answers it.', 'absolute-zero' ); ?>
				</p>
				<div class="social-row" style="margin-top:var(--space-sm)">
					<?php foreach ( $az_socials as list( $label, $url, $icon ) ) : ?>
						<?php if ( $url ) : ?>
							<a class="social-btn" href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener"
							   aria-label="<?php echo esc_attr( sprintf( __( 'Absolute Zero on %s', 'absolute-zero' ), $label ) ); ?>">
								<?php echo az_icon( $icon ); ?>
							</a>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			</div>

			<div class="foot-group">
				<span class="foot-group__title"><?php esc_html_e( 'Explore', 'absolute-zero' ); ?></span>
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'footer',
						'container'      => false,
						'items_wrap'     => '%3$s',
						'depth'          => 1,
						'walker'         => new AZ_Foot_Walker(),
					) );
				} else {
					az_foot_fallback( array(
						'/mission-and-vision/'  => __( 'Mission and Vision', 'absolute-zero' ),
						'/our-team/'            => __( 'Our Team', 'absolute-zero' ),
						'/build-and-program/'   => __( 'Build and Program', 'absolute-zero' ),
						'/outreach/'            => __( 'Outreach', 'absolute-zero' ),
						'/sponsors-and-donors/' => __( 'Sponsors and Donors', 'absolute-zero' ),
						'/contact/'             => __( 'Contact', 'absolute-zero' ),
					) );
				}
				?>
			</div>

			<div class="foot-group">
				<span class="foot-group__title"><?php esc_html_e( 'For other teams', 'absolute-zero' ); ?></span>
				<?php
				if ( has_nav_menu( 'teams' ) ) {
					wp_nav_menu( array(
						'theme_location' => 'teams',
						'container'      => false,
						'items_wrap'     => '%3$s',
						'depth'          => 1,
						'walker'         => new AZ_Foot_Walker(),
					) );
				} else {
					printf(
						'<a href="%s">%s</a>',
						esc_url( home_url( '/outreach/open-access/' ) ),
						esc_html__( 'Open Access library', 'absolute-zero' )
					);
					printf(
						'<a href="%s" target="_blank" rel="noopener">%s</a>',
						esc_url( az_opt( 'az_pit_url' ) ),
						esc_html( sprintf( __( '%s pit design', 'absolute-zero' ), az_opt( 'az_season_years' ) ) )
					);
					printf(
						'<a href="%s">%s</a>',
						esc_url( home_url( '/outreach/ftc-collaboration-summit/' ) ),
						esc_html__( 'Collaboration Summit', 'absolute-zero' )
					);
					printf(
						'<a href="%s">%s</a>',
						esc_url( home_url( '/outreach/' ) ),
						esc_html__( 'Book a workshop', 'absolute-zero' )
					);
				}
				?>
			</div>
		</div>

		<div class="site-footer__base">
			<p><?php
				printf(
					/* translators: 1: year, 2: team number, 3: region */
					esc_html__( '© %1$s Absolute Zero Robotics, FIRST Tech Challenge Team %2$s. %3$s.', 'absolute-zero' ),
					esc_html( wp_date( 'Y' ) ),
					esc_html( az_opt( 'az_team_number' ) ),
					esc_html( az_opt( 'az_region' ) )
				);
			?></p>
			<p><?php
				printf(
					wp_kses( __( 'A program of <a href="%1$s" target="_blank" rel="noopener">%2$s</a>, a registered 501(c)(3).', 'absolute-zero' ), array( 'a' => array( 'href' => array(), 'target' => array(), 'rel' => array() ) ) ),
					esc_url( az_opt( 'az_parent_url' ) ),
					esc_html( az_opt( 'az_parent_name' ) )
				);
			?></p>
			<p><?php
				echo wp_kses(
					__( '<em>FIRST</em>, FIRST Tech Challenge, BIOBUZZ and DECODE are trademarks of <a href="https://www.firstinspires.org/" target="_blank" rel="noopener">FIRST</a>. This site is run by the team, not by FIRST.', 'absolute-zero' ),
					array( 'em' => array(), 'a' => array( 'href' => array(), 'target' => array(), 'rel' => array() ) )
				);
			?></p>
		</div>

	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
