(function ()
{
    angular.module('ngpress').directive('ngpCurrPostAttr',
        function()
        {
            var link = function(scope, element, attrs)
            {
                switch( scope.ngpCurrPostAttr )
                {
                    case 'content':
                    case 'excerpt':
                    case 'title':
                        scope.attribute = [ scope.ngpCurrPostAttr, 'rendered' ];
                        break;

                    default:
                        scope.attribute = [ scope.ngpCurrPostAttr ];
                }

                scope.$on(
                    'postsLoaded',
                    function( event, posts )
                    {
                        var post = posts[0];

                        var data = scope.attribute.length === 2 ?
                            post[scope.attribute[0]][scope.attribute[1]] : post[scope.attribute[0]];

                        element.html( data );
                    }
                );
            };

            return {
                link: link,
                restrict: 'AE',
                scope: {
                    ngpCurrPostAttr: '@'
                }
            };
        });
}());