(function()
{
    angular.module('ngpress').factory('postsService',
        ['$http', function ($http)
        {
            const URL = WP_API_Settings.root + '/posts';

            return {

                load: function( filter, callback )
                {
                    filter['type'] = 'type' in filter ? filter['type'] : 'any';

                    var config = { params: {} };

                    angular.forEach( filter, function(value, key)
                    {
                        config.params['filter['+key+']'] = value;
                    });

                    $http.get( URL, config ).then( callback );
                }
            }
        }]);
}());