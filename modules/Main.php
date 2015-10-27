<?php

namespace ngPress\Modules;


class Main
{
    const AD_SLUG = 'product';

    public static function init()
    {
        //Init modules
        foreach( glob(dirname(__FILE__)."/*.php") as $filename )
        {
            include_once( $filename );
        }

        //Hooks
        add_action( 'wp_enqueue_scripts', array(__CLASS__, 'enqueue_scripts') );
        add_action( 'after_setup_theme', array(__CLASS__, 'register_menu') );

//        add_filter( 'rest_url', array(__CLASS__, 'rest_url') );
        add_filter( 'rest_post_query', array(__CLASS__, 'rest_post_query'), 10, 2 );

        add_action( 'rest_api_init', array(__CLASS__, 'register_endpoints') );
    }

    public static function rest_url( $url )
    {
        return $url . 'wp/v2';
    }

    public static function rest_post_query( $args, $request )
    {
        if( isset( $request['filter']['type'] ) )
        {
            $args['post_type'] = $request['filter']['type'];

            unset( $args['type'] );
        }

        return $args;
    }

    public static function register_endpoints()
    {
        include_once( 'endpoints/Url_To_Content.php' );

        $controller = new Endpoints\Url_To_Content( 'post' );

        $controller->register_routes();
    }

    public static function enqueue_scripts()
    {
        //Styles
        wp_enqueue_style(
            'bootstrap',
            get_template_directory_uri() . '/bower_components/bootstrap/dist/css/bootstrap.min.css'
        );

        wp_enqueue_style(
            'ngpress-style',
            get_template_directory_uri() . '/styles/ngpress.css',
            array( 'bootstrap' )
        );

        //Lib
        wp_enqueue_script(
            'ngpress-lib',
            get_template_directory_uri() . '/bower_components/bundle.js',
            array( 'jquery' ),
            null,
            true
        );

        //App
        wp_enqueue_script(
            'ngpress-app',
            get_template_directory_uri() . '/app/bundle.js',
            array( 'ngpress-lib', 'wp-api' ),
            null,
            true
        );
    }

    public static function register_menu()
    {
        register_nav_menu( 'primary-menu', __('Primary Menu') );
    }
}