(function () {
    "use strict";
    
    const minesweeperFieldComponent = {
        templateUrl: 'components/minesweeper-field/minesweeper-field.tpl.html',
    };

    angular
    .module('minesweeperApp')
    .component('minesweeperField', minesweeperFieldComponent);
})();