(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var app = angular.module('ngPress', ['ngSanitize'], function($locationProvider)
{
    $locationProvider.html5Mode(true);
});

app.run( ['$rootScope', 'postsService', '$location',
    function($rootScope, postsService, $location)
{
    $rootScope.loadPosts = function( path )
    {
        $rootScope.$broadcast( 'loadingPosts' );

        $location.path( path );

        postsService.loadByPath(
            path,
            function( response )
            {
                $rootScope.$broadcast( 'postsLoaded', response.data );
            },
            function()
            {
                $rootScope.$broadcast( 'postsLoadFailed', null );
            }
        );
    };

    $rootScope.$on( 'loadPosts', function(event, filter)
    {
        $rootScope.loadPosts( filter );
    });

    angular.element(document).ready(function()
    {
        $rootScope.loadPosts( $location.path() );
    });
}]);

String.prototype.capitalizeFirstLetter = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};
},{}],2:[function(require,module,exports){
(function ()
{
    angular.module('ngPress').directive('ngpCurrPostAttr',
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
},{}],3:[function(require,module,exports){
(function ()
{
    angular.module('ngPress').directive('a',
        ['postsService', '$location', function (postsService, $location)
    {
        var link = function(scope, element, attrs)
        {
            var parser = document.createElement('a');

            parser.href = attrs.href;

            if( parser.hostname === $location.host() && parser.pathname.indexOf('/wp-admin') !== 0 )
            {
                element.on('click', function( event )
                {
                    scope.$emit(
                        'loadPosts',
                        parser.pathname
                    );

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
},{}],4:[function(require,module,exports){
(function ()
{
    angular.module('ngPress').directive('ngpLoader',
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
//App
require('./app');

//Services
require('./services/posts');
require('./services/templates');

//Directives
require('./directives/links');
require('./directives/curr-post-attr');
require('./directives/loader');
require('./directives/posts-list');
},{"./app":1,"./directives/curr-post-attr":2,"./directives/links":3,"./directives/loader":4,"./directives/posts-list":5,"./services/posts":7,"./services/templates":8}],7:[function(require,module,exports){
(function()
{
    angular.module('ngPress').factory('postsService',
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
},{}],8:[function(require,module,exports){
(function()
{
    angular.module('ngPress').factory('templatesService',
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
},{}]},{},[6]);
