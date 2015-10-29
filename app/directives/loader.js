(function ()
{
    angular.module('ngpress').directive('ngpLoader',
        [function ()
        {
            var link = function(scope, element, attrs)
            {
                scope.loading = false;

                scope.$on( 'loading'+scope.type.capitalizeFirstLetter(), function()
                {
                    scope.loading = true;
                });

                scope.$on( scope.type+'Loaded', function()
                {
                    scope.loading = false;
                });

                scope.$on( scope.type+'LoadFailed', function()
                {
                    scope.loading = false;
                });
            };

            return {
                link: link,
                restrict: 'E',
                replace: true,
                template: '<div class="loader" ng-show="loading"></div>',
                scope: {
                    type: '@'
                }
            };
        }]);
}());