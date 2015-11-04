(function ()
{
    angular.module('ngPress').directive('ngpPostsList',
        ['$compile', 'templatesService', function($compile, templatesService)
        {
            var link = function(scope, element, attrs)
            {
                scope.$watch(
                    'current.template',
                    function( template )
                    {
                        templatesService.get(
									template,
                           function( response )
                           {
                               element.html( response.data );

                               $compile( element.contents() )(scope);
                           }
                        );
                    }
                );

            };

            return {
                link: link,
                restrict: 'E',
                replace: true,
                template: '<div class="posts-list"></div>'
            };
        }]);
}());