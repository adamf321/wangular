<?php

namespace ngPress\Modules\Endpoints;


class Url_To_Content extends \WP_REST_Posts_Controller
{
    public static function init()
    {
        $controller = new Url_To_Content( 'post' );

        $controller->register_routes();
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $version = '1';

        $namespace = 'ngpress/v' . $version;

        $base = 'url-to-content';

        register_rest_route( $namespace, '/' . $base,
            array(
                'methods'         => \WP_REST_Server::READABLE,
                'callback'        => array( $this, 'get_items' )
            )
        );
    }

    /**
     * Get a collection of items
     *
     * @param \WP_REST_Request $request Full data about the request.
     * @return \WP_Error|\WP_REST_Response
     */
    public function get_items( $request )
    {
        $data = array( 'posts' => array(), 'template' => '', 'siteTitle' => '' );

        $posts = array();

        $path = $request['path'];

        $post_id = url_to_postid( $path );

        if( is_numeric($post_id) && (int)$post_id > 0 )
        {
            //A single post/page
            $posts = array( get_post($post_id) );

            $data['template'] = 'templates/singular';

			$data['siteTitle'] = $posts[0]->post_title . ' | ' . get_bloginfo( 'name' );
        }
        elseif( rtrim( get_home_url(), '/' ) == rtrim( get_home_url(null, $path), '/' ) )
        {
            //Front page
            if( get_option('page_on_front') )
            {
                //Static
                $posts = array( get_post(get_option('page_on_front')) );

				$data['template'] = 'templates/singular';
            }
            else
            {
                //Latest posts
                $posts = wp_get_recent_posts( apply_filters( 'ngp_homepage_recent_posts_args', array() ) );

				$data['template'] = 'templates/archive';
            }

			$data['siteTitle'] = get_bloginfo( 'name' ) . ' | ' . get_bloginfo( 'description' );
        }
        else
        {
            //Path is not for a single post, may be an archive url, a search url or even a non-valid 404 url

        }

        foreach( $posts as $post )
        {
            if( is_array($post) )
                $post = get_post( $post['ID'] );

            if( !$this->check_read_permission($post) )
                continue;

            $item_data = $this->prepare_item_for_response( $post, $request );

            $data['posts'][] = $this->prepare_response_for_collection( $item_data );
        }

        $response = rest_ensure_response( $data );

        return $response;
    }
}