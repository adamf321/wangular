<div id="page">

	<header id="masthead" class="site-header" role="banner">

		<div class="site-branding">

			<div class="site-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ) ?></a>
			</div>

			<div class="site-description">
				<?php echo get_bloginfo( 'description', 'display' ) ?>
			</div>

		</div><!-- /site-branding -->

		<?php
		if ( has_nav_menu( 'primary-menu' ) )
		{
			wp_nav_menu( array( 'theme_location' => 'primary-menu') );
		}
		?>

	</header><!-- /site-header -->