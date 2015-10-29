'use strict';

describe('ngPress', function()
{
    beforeEach(module('ngPress'));

    describe('ngpLoader directive', function()
    {
        it('replace the tag with the template', function()
        {
            inject(function($compile, $rootScope)
            {
                var scope = $rootScope.$new();

                var element = $compile('<ngp-loader type=\"posts\"></ngp-loader>')(scope);

                expect( element[0].tagName ).toEqual( 'DIV' );

                expect( element[0].className ).toContain( 'loader' );
            });
        });
    });
});