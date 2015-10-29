<?php

namespace ngPress\Modules\Endpoints;


class Templates extends \WP_REST_Controller
{
    public static function init()
    {
        $controller = new Templates();

        $controller->register_routes();
    }

    /**
     * Register the routes for the objects of the controller.
     */
    public function register_routes()
    {
        $version = '1';

        $namespace = 'ngpress/v' . $version;

        $base = 'templates';

        register_rest_route( $namespace, '/' . $base,
            array(
                'methods'         => \WP_REST_Server::READABLE,
                'callback'        => array( $this, 'get_item' )
            )
        );
    }

    /**
     * Get a collection of items
     *
     * @param \WP_REST_Request $request Full data about the request.
     * @return \WP_Error|\WP_REST_Response
     */
    public function get_item( $request )
    {
        $templateSlug = $request['templateSlug'];

        ob_start();

        get_template_part( $templateSlug );

        $data = ob_get_contents();

        ob_end_clean();

        $response = rest_ensure_response( $data );

        return $response;
    }
}