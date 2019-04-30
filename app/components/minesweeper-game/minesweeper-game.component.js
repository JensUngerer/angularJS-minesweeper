(function () {
    "use strict";

    var minesweeperGameComponent = {
        templateUrl: 'components/minesweeper-game/minesweeper-game.tpl.html',

        controller: controller,
        controllerAs: 'minesweeperGameCtrl'
    };

    angular
        .module('minesweeperApp')
        .component('minesweeperGame', minesweeperGameComponent);

    /**
     * An ECMA-Script 5 function which defines the controller of the <minesweeper-game>-component.
     * A MinesweeperGame-object is being created. Than, the MinesweeperField-objects are bound to the UI.
     * Furthermore, the reset-function of the UI is bound to the game.reset-function.
     */
    function controller() {
        var vm = this;
        // vm.title = 'Minesweeper-Game-Component from the ctrl';
        // DEBUGGING:
        // console.log(vm.title);

        vm.reset = reset;
        vm.game = new MinesweeperGame(5, 8, 7);

        //constructor
        var tabledFields = [];
        vm.game.fields.forEach(function (row, rowIndex) {
            row.forEach(function (field, columnIndex) {
                if (!tabledFields[columnIndex]) {
                    tabledFields[columnIndex] = [];
                }
                tabledFields[columnIndex][rowIndex] = field;
            });
        });
        vm.tabledFields = tabledFields;

        function reset() {
            vm.game.reset();
        }
    }
})();