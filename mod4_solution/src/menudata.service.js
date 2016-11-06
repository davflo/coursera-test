(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'MenuApiBasePath'];
    function MenuDataService($http, MenuApiBasePath) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: 'GET',
                url: MenuApiBasePath + 'categories.json'
            }).then(function (response) {
                return response.data;
            });
        };

        service.getItemsForCategory = function (categoryShortName) {

            console.log('categoryShortName', categoryShortName);
            return $http({
                method: 'GET',
                url: MenuApiBasePath + 'menu_items.json',
                params: {category: categoryShortName}
            }).then(function (response) {
                return response.data;
            });
        };
    }
})();