(function() {
  "use strict";
  
  angular
  .module('minesweeperApp')
  .controller('AboutController', AboutController);

  /**
   * An AngularJS-Controller which is bound in the index.js to the $routeProvider for the about-view.
   */
  function AboutController() {
    "ngInject";

    var vm = this;
  }
})();