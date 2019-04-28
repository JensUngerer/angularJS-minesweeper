(function () {
    "use strict";

    const minesweeperGameComponent = {
        templateUrl: 'components/minesweeper-game/minesweeper-game.tpl.html',
        controller: function () {
            var vm = this;
            vm.title = 'Minesweeper-Game-Component from the ctrl';
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
        },
        controllerAs: 'minesweeperGameCtrl'
    };

    angular
        .module('minesweeperApp')
        .component('minesweeperGame', minesweeperGameComponent);
})();