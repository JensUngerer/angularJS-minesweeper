(function() {
    "use strict";
  
    const minesweeperGameComponent = {
        templateUrl: 'components/minesweeper-game/minesweeper-game.tpl.html'
    };

    angular
      .module('minesweeperApp')
      .component('minesweeperGame', minesweeperGameComponent);
})();