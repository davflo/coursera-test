(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('MenuApiBasePath', ' https://davids-restaurant.herokuapp.com/')
        .directive('foundItems', foundItems);

    NarrowItDownController.$inject = ['MenuSearchService'];
    MenuSearchService.$inject = ['$http', '$q', 'MenuApiBasePath'];

    function NarrowItDownController(MenuSearchService) {
        var controller = this;
        controller.found = [];

        controller.narrowItDown = function () {
            var promise = MenuSearchService.getMatchedMenuItems(controller.searchTerm);
            var successHandler = function (result) {
                controller.found = result;
                controller.message = (result.length) ? '' : 'Nothing found';
            };
            promise.then(successHandler);

            controller.message = 'Searching..';
        };

        controller.removeItem = function (itemIndex) {
            controller.found.splice(itemIndex, 1);
        };
    }

    function MenuSearchService($http, $q, MenuApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var result, promise, deferred = null;

            if (angular.isString(searchTerm)) {
                promise = $http({
                    method: 'GET',
                    url: MenuApiBasePath + 'menu_items.json'
                });

                var successHandler = function (response) {
                    var menuItems = null, found;

                    if (response.data && response.data.hasOwnProperty('menu_items')) {
                        menuItems = response.data.menu_items;
                        if (angular.isArray(menuItems)) {
                            found = menuItems.filter(function (item) {
                                return (
                                    item.hasOwnProperty('description') &&
                                    item.description.match(searchTerm)
                                )
                            });
                            return found;
                        }

                    }
                };

                result = promise.then(successHandler);
            } else {
                deferred = $q.defer();
                deferred.resolve([]);
                result = deferred.promise;
            }

            return result;
        };
    }

    function foundItems() {
        var ddo = {
            restrict: 'E',
            templateUrl: 'templates/foundItems.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            transclude: true
        };

        return ddo;
    }

})();
