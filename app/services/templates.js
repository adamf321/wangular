(function()
{
    angular.module('ngpress').factory('templatesService',
        ['$http', function ($http)
        {
            const API_URL = '/wp-json/ngpress/v1/templates';

            return {

                get: function( templateSlug, callback, failure )
                {
                    var config = {
                        params: { templateSlug: templateSlug }
                    };

                    $http.get( API_URL, config ).then( callback, failure );
                }
            }
        }]);
}());