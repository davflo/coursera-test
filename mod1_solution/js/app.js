(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.dishesString = '';

        $scope.checkIfTooMuch = function () {
            var dishesList = null;
            if ($scope.dishesString.length) {
                dishesList = $scope.dishesString.split(',');
                $scope.message = (dishesList.length > 3) ? 'Too much!' : 'Enjoy!';
            } else {
                $scope.message = 'Please enter data first';
            }
        };

        $scope.clearMessage = function () {
            $scope.message = '';
        };

        $scope.clearMessage();
    }
})();