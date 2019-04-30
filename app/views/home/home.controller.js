(function() {
  "use strict";
  
  angular
    .module('minesweeperApp')
    .controller('HomeController', HomeController);

  /**
   * An AngularJS-Controller which is bound in the index.js to the $routeProvider for the home-view.
   */
  function HomeController() {
    "ngInject";
    var vm = this;
  }
})();