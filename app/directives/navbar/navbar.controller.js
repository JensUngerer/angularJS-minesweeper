(function() {
  "use strict";

  angular
    .module('minesweeperApp')
    .controller('NavbarController', NavbarController);

  /**
   * An ECMA-Script 5 function which defines the controller of the <navbar>-directive.
   *
   */
  function NavbarController() {
    "ngInject";
    var vm = this;

    vm.title = "AngularJS-Minesweeper";
  }
})();