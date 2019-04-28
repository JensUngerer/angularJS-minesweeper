(function () {
    "use strict";

    const minesweeperFieldComponent = {
        templateUrl: 'components/minesweeper-field/minesweeper-field.tpl.html',
        controllerAs: 'minesweeperFieldCtrl',
        bindings: {
            field: '<',
            state: '<'
        },
        controller: ['$scope', function ($scope) {
            var vm = this;
            vm.mark = mark;
            vm.reveal = reveal;

            setText();
            setColor();

            this.$onChanges = changes;

            function changes(changesObj) {
                if (changesObj && changesObj.state) {
                    if (changesObj.state.currentValue) {
                        setText();
                        setColor();
                    }
                }
            }


            function mark(event) {
                vm.field.mark();
                event.preventDefault();
            }

            function reveal() {
                vm.field.reveal();
            }

            function setText() {
                var result;
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Unrevealed) {
                    result = '?';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Marked) {
                    result = '-';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value === -1) {
                    result = 'B';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value === 0) {
                    result = '0';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value > 0) {
                    result = vm.field.value;
                }
                vm.text = result;
            }

            function setColor() {
                var result;
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Unrevealed) {
                    result = 'blue';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Marked) {
                    result = 'grey';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value === -1) {
                    result = 'red';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value === 0) {
                    result = 'lightgreen';
                }
                if (vm && vm.field && vm.field.state === minesweeperFieldState.Revealed && vm.field.value > 0) {
                    result = 'green';
                }
                vm.color = result;
            }
        }]
    };

    angular
        .module('minesweeperApp')
        .component('minesweeperField', minesweeperFieldComponent);
})();