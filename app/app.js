var app = angular.module('ngPress', ['ngSanitize'], ['$locationProvider', function($locationProvider)
{
    $locationProvider.html5Mode(true);
}]);

app.run( ['$rootScope', 'postsService', '$location',
    function($rootScope, postsService, $location)
{
    $rootScope.current = {
        siteTitle:  '',
        template:   '',
        posts:      []
    };

    $rootScope.loadPosts = function( path )
    {
        $rootScope.$broadcast( 'postsLoading' );

        $location.path( path );

        postsService.loadByPath(
            path,
            function( response )
            {
                $rootScope.current = response.data;

                $rootScope.$broadcast( 'postsLoaded', response.data );
            },
            function()
            {
                $rootScope.$broadcast( 'postsLoadFailed', null );
            }
        );
    };

    $rootScope.$on( 'loadPosts', function(event, filter)
    {
        $rootScope.loadPosts( filter );
    });

    angular.element(document).ready(function()
    {
        $rootScope.loadPosts( $location.path() );
    });
}]);