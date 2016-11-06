(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryDetailController', CategoryDetailController);

    CategoryDetailController.$inject = ['category'];
    function CategoryDetailController(categoryDetailData) {
        var categorydetail = this;

        categorydetail.name = categoryDetailData.category.name;
        categorydetail.menuItems = categoryDetailData.menu_items;

        console.log('categorydetail', categoryDetailData);

    }
})();