(function ()
{
    angular.module('ngPress').directive('ngpPostsList',
        ['$compile', 'templatesService', function($compile, templatesService)
        {
            var link = function(scope, element, attrs)
            {
                scope.posts = [];

                scope.templateSlug = scope.templateSlug ? scope.templateSlug : 'templates/posts-list';

                templatesService.get(
                    scope.templateSlug,
                    function( response )
                    {
                        element.html( response.data );

                        $compile( element.contents() )(scope);
                    }
                );

                scope.$on(
                    'postsLoaded',
                    function( event, posts )
                    {
                        scope.posts = posts;
                    }
                );

            };

            return {
                link: link,
                restrict: 'E',
                replace: true,
                template: '<div class="posts-list"></div>',
                scope: {
                    templateSlug: '@'
                }
            };
        }]);
}());