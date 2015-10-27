(function()
{
    angular.module('ngpress').factory('postsService',
        ['$http', function ($http)
        {
            const WP_API_URL = '/wp-json/wp/v2/posts';

            const NGP_API_URL = '/wp-json/ngpress/v1/url-to-content';

            return {

                loadByParams: function( filter, callback, failure )
                {
                    filter['type'] = 'type' in filter ? filter['type'] : 'any';

                    var config = { params: {} };

                    angular.forEach( filter, function(value, key)
                    {
                        config.params['filter['+key+']'] = value;
                    });

                    $http.get( WP_API_URL, config ).then( callback, failure );
                },

                loadByPath: function( path, callback, failure )
                {
                    var config = {
                        params: { path: path }
                    };

                    $http.get( NGP_API_URL, config ).then( callback, failure );
                }
            }
        }]);
}());