<?php
/**
 * The template for displaying the footer
 */
?>

	<footer id="colophon" class="site-footer" role="contentinfo">

		<div class="site-info">

			<?php
			echo apply_filters('npg_credits',
				__('ngPress by', NGP_TEXT_DOMAIN) . ' ' .
				'<a href="https://solnamic.com" target="_blank">Adam Fenton</a>. ' .
				__('Proudly powered by', NGP_TEXT_DOMAIN ) . ' ' .
				'<a href="https://wordpress.org" target="_blank">WordPress</a>'
			)
			?>

		</div><!-- /site-info -->

	</footer><!-- /site-footer -->

</div><!-- /page -->

</body>
</html>
