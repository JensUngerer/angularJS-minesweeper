(function () {
    "use strict";
    
    angular.module('minesweeperApp').directive('rightClick', rightClick);

    rightClick.$inject = ['$parse'];

    /**
     * //cf: http://stackoverflow.com/questions/15731634/how-do-i-handle-right-click-events-in-angular-js
     * //cf: http://jsfiddle.net/b0sx1ae1/
     *
     * @param {*} $parse
     * @returns
     */
    function rightClick($parse) {
        return function (scope, element, attrs) {
            var fn = $parse(attrs.rightClick);
            element.bind('contextmenu', function (event) {
                scope.$apply(function () {
                    event.preventDefault();
                    fn(scope, { $event: event });
                });
            });
        };
    }
})();