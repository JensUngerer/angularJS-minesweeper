(function() {
  "use strict";

  angular
    .module('minesweeperApp')
    .directive('navbar', navbar);

  /**
   * An ECMA-Script 5 function which defines the <navbar>-directive.
   *
   * @returns
   */
  function navbar() {
    return {
      restrict: 'E',
      templateUrl: 'directives/navbar/navbar.template.html',
      controller: 'NavbarController',
      controllerAs: 'vm'
    };
  }
})();