(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];


    function ToBuyController(ShoppingListCheckOffService) {
        this.toBuy = ShoppingListCheckOffService.uncheckedList;

        this.buyItem = function (item) {
            ShoppingListCheckOffService.checkOffItem(item);
        };
    }

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.bought = ShoppingListCheckOffService.checkedOffList;
    }

    function ShoppingListCheckOffService() {
        this.uncheckedList =
            [
                {name: "cookies", quantity: 10},
                {name: "beers", quantity: 4},
                {name: "Milk", quantity: 1},
                {name: "Cheese", quantity: 1},
                {name: "Pizza", quantity: 1}
            ];

        this.checkedOffList = [];

        this.checkOffItem = function (item) {
            var itemIndex = this.uncheckedList.indexOf(item);
            if (itemIndex != -1) {
                this.uncheckedList.splice(itemIndex, 1);
                this.checkedOffList.push(item);
            }
        };
    }
}());