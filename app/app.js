var app = angular.module('ngpress', [], function($locationProvider)
{
    $locationProvider.html5Mode(true);
});

app.run( ['$rootScope', 'postsService', '$location',
    function($rootScope, postsService, $location)
{
    $rootScope.loadPosts = function( filter )
    {
        $rootScope.$broadcast( 'loadingPosts' );

        $location.path( filter.name );

        postsService.load(
            filter,
            function( response )
            {
                $rootScope.$broadcast( 'postsLoaded', response.data );
            }
        );
    };

    $rootScope.$on( 'loadPosts', function(event, filter)
    {
        $rootScope.loadPosts( filter );
    });

    angular.element(document).ready(function()
    {
        $rootScope.loadPosts( {name: $location.path()} );
    });
}]);

String.prototype.capitalizeFirstLetter = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};