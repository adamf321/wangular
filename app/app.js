var app = angular.module('ngPress', ['ngSanitize'], function($locationProvider)
{
    $locationProvider.html5Mode(true);
});

app.run( ['$rootScope', 'postsService', '$location',
    function($rootScope, postsService, $location)
{
    $rootScope.loadPosts = function( path )
    {
        $rootScope.$broadcast( 'loadingPosts' );

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

String.prototype.capitalizeFirstLetter = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};