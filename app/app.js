var app = angular.module('ngPress', ['ngSanitize'], function($locationProvider)
{
    $locationProvider.html5Mode(true);
});

app.run( ['$rootScope', 'postsService', '$location',
    function($rootScope, postsService, $location)
{
    $rootScope.loadPosts = function( path )
    {
        $rootScope.$broadcast( 'postsLoading' );

        $location.path( path );

        postsService.loadByPath(
            path,
            function( response )
            {
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