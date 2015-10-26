<?php
/**
 * The template for displaying the header
 */
?>

<!DOCTYPE html>

<html <?php language_attributes(); ?> class="no-js" ng-app="ngpress">

	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

		<base href="/">

		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>

		<?php get_template_part( 'ng/header' ) ?>