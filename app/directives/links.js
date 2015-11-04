(function ()
{
    angular.module('ngPress').directive('a',
        ['$location', function ($location)
    {
        var link = function(scope, element, attrs)
        {
            var parser = document.createElement('a');

            parser.href = attrs.href;

            if( parser.hostname === $location.host() && parser.pathname.indexOf('/wp-admin') !== 0 )
            {
                element.on('click', function( event )
                {
                    scope.$emit( 'loadPosts', parser.pathname );

                    event.preventDefault();
                });
            }
        };

        return {
            link: link,
            restrict: 'E'
        };
    }]);
}());