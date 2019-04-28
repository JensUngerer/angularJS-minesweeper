(function() {
  "use strict";

  angular
    .module('minesweeperApp')
    .controller('NavbarController', NavbarController);

  function NavbarController() {
    "ngInject";
    var vm = this;

    vm.title = "AngularJS-Minesweepers";
  }

})();