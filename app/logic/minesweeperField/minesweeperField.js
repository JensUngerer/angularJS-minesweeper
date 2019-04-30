/**
 * An ECMA-Script 5 "class"-constructor function for the minesweeper-field logic.
 *
 * @param {*} x The x-coordinate within the game-fields.
 * @param {*} y The y-coordinate within the game-fields.
 */
function MinesweeperField(x, y) {
    var state;
    Object.defineProperties(this, {
        "x": {
            value: 0,
            writable: true
        },
        "y": {
            value: 0,
            writable: true
        },
        "value": {
            value: 0,
            writable: true
        },
        "state": {
            get: function () {
                return state;
            },
            set: function (_state) {
                state = _state;
            }
        },
        "mark": {
            value: function mark() {
                if (this.state !== minesweeperFieldState.Revealed) {
                    this.state = minesweeperFieldState.Marked;
                }
            }
        },
        "reveal": {
            value: function reveal() {
                if (this.state === minesweeperFieldState.Revealed) {
                    return;
                }
                this.state = minesweeperFieldState.Revealed;

                if (this.value === 0) {
                    this.neighbours.forEach(function (neighborField) {
                        neighborField.reveal();
                    });
                }
            }
        },
        "reset": {
            value: function reset() {
                this.value = 0;
                this.state = minesweeperFieldState.Unrevealed;
            }
        }
    });

    this.x = x;
    this.y = y;
    this.state = minesweeperFieldState.Unrevealed;
}
