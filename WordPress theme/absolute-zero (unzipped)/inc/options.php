<?php
/**
 * The numbers and short strings the team changes without a developer.
 *
 * Everything here is a real option row, editable at
 * Appearance to Customize, or Settings to Absolute Zero.
 *
 * @package absolute-zero
 */

defined( 'ABSPATH' ) || exit;

function az_defaults() {
	return array(
		'az_team_number'    => '12096',
		'az_founded'        => '2016',
		'az_region'         => 'Northern Virginia',
		'az_email'          => 'absolutezeroftc@gmail.com',
		'az_season_current' => 'BIOBUZZ',
		'az_season_years'   => '2026-2027',
		'az_season_prev'    => 'DECODE',
		'az_pit_url'        => 'https://absolutezero-pit.vercel.app',
		'az_parent_name'    => 'Robotics for Youth',
		'az_parent_url'     => 'https://roboticsforyouth.org/',
		'az_parent_ein'     => '47-5340842',
		'az_stat_students'  => '700+',
		'az_stat_workshops' => '25+',
		'az_stat_teams'     => '10+',
		'az_stat_countries' => '2',
		'az_footer_line'    => 'We are a student team. Everything here was built by students, and every workshop on this site was run by one.',
		'az_yt'             => 'https://www.youtube.com/channel/UCWrKwtolC-khsTPuwrAJqjw',
		'az_ig'             => 'https://www.instagram.com/absolutezeroftc/',
		'az_fb'             => 'https://www.facebook.com/absolutezerorobotics/',
		'az_x'              => 'https://twitter.com/absolutezeroftc',
	);
}

function az_opt( $key, $fallback = '' ) {
	$defaults = az_defaults();
	$value    = get_option( $key, null );
	if ( null === $value || '' === $value ) {
		$value = $defaults[ $key ] ?? $fallback;
	}
	return $value;
}

/* --- Customizer ------------------------------------------------------- */

add_action( 'customize_register', 'az_customize' );
function az_customize( $wp_customize ) {
	$wp_customize->add_panel( 'az_panel', array(
		'title'    => __( 'Absolute Zero', 'absolute-zero' ),
		'priority' => 20,
	) );

	$sections = array(
		'az_identity' => array(
			'title'  => __( 'Team identity', 'absolute-zero' ),
			'fields' => array(
				'az_team_number'    => __( 'Team number', 'absolute-zero' ),
				'az_founded'        => __( 'Year founded', 'absolute-zero' ),
				'az_region'         => __( 'Region', 'absolute-zero' ),
				'az_email'          => __( 'Contact email', 'absolute-zero' ),
			),
		),
		'az_season' => array(
			'title'  => __( 'Season', 'absolute-zero' ),
			'fields' => array(
				'az_season_current' => __( 'Current game name', 'absolute-zero' ),
				'az_season_years'   => __( 'Current season years', 'absolute-zero' ),
				'az_season_prev'    => __( 'Previous game name', 'absolute-zero' ),
				'az_pit_url'        => __( 'Pit design URL', 'absolute-zero' ),
			),
		),
		'az_numbers' => array(
			'title'  => __( 'Outreach figures', 'absolute-zero' ),
			'fields' => array(
				'az_stat_students'  => __( 'Students reached', 'absolute-zero' ),
				'az_stat_workshops' => __( 'Workshops hosted', 'absolute-zero' ),
				'az_stat_teams'     => __( 'FIRST teams mentored', 'absolute-zero' ),
				'az_stat_countries' => __( 'Countries', 'absolute-zero' ),
			),
		),
		'az_org' => array(
			'title'  => __( 'Parent organisation', 'absolute-zero' ),
			'fields' => array(
				'az_parent_name' => __( 'Name', 'absolute-zero' ),
				'az_parent_url'  => __( 'Website', 'absolute-zero' ),
				'az_parent_ein'  => __( 'EIN', 'absolute-zero' ),
			),
		),
		'az_social' => array(
			'title'  => __( 'Social links', 'absolute-zero' ),
			'fields' => array(
				'az_yt' => __( 'YouTube', 'absolute-zero' ),
				'az_ig' => __( 'Instagram', 'absolute-zero' ),
				'az_fb' => __( 'Facebook', 'absolute-zero' ),
				'az_x'  => __( 'X', 'absolute-zero' ),
			),
		),
	);

	$defaults = az_defaults();
	foreach ( $sections as $sid => $section ) {
		$wp_customize->add_section( $sid, array(
			'title' => $section['title'],
			'panel' => 'az_panel',
		) );
		foreach ( $section['fields'] as $key => $label ) {
			$wp_customize->add_setting( $key, array(
				'type'              => 'option',
				'default'           => $defaults[ $key ] ?? '',
				'sanitize_callback' => str_contains( $key, 'url' ) ? 'esc_url_raw' : 'sanitize_text_field',
				'transport'         => 'refresh',
			) );
			$wp_customize->add_control( $key, array(
				'label'   => $label,
				'section' => $sid,
				'type'    => 'text',
			) );
		}
	}

	$wp_customize->add_section( 'az_footer', array(
		'title' => __( 'Footer statement', 'absolute-zero' ),
		'panel' => 'az_panel',
	) );
	$wp_customize->add_setting( 'az_footer_line', array(
		'type'              => 'option',
		'default'           => $defaults['az_footer_line'],
		'sanitize_callback' => 'sanitize_textarea_field',
	) );
	$wp_customize->add_control( 'az_footer_line', array(
		'label'       => __( 'The large closing line', 'absolute-zero' ),
		'description' => __( 'One sentence. It is set at display size, so keep it under about twenty words.', 'absolute-zero' ),
		'section'     => 'az_footer',
		'type'        => 'textarea',
	) );
}
