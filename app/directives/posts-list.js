(function ()
{
    angular.module('ngPress').directive('ngpPostsList',
        ['$compile', 'templatesService', function($compile, templatesService)
        {
            var link = function(scope, element, attrs)
            {
                scope.posts = [];

                scope.$on(
                    'postsLoaded',
                    function( event, data )
                    {
                        templatesService.get(
                           data.template,
                           function( response )
                           {
                               element.html( response.data );

                               $compile( element.contents() )(scope);
                           }
                        );

                        scope.posts = data.posts;
                    }
                );

            };

            return {
                link: link,
                restrict: 'E',
                replace: true,
                template: '<div class="posts-list"></div>',
                scope: {}
            };
        }]);
}());