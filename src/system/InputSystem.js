define([
    'hatchet/core/System'
], function (System) {
    // Input system class.
    var InputSystem = WinJS.Class.derive(
        System,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            System.call(this, game); // call super constructor
            this.keysDown = {};
            var that = this;
            window.addEventListener('keydown', function(event) {
                that.keysDown[event.keyCode] = true;
            });
            window.addEventListener('keyup', function(event) {
                that.keysDown[event.keyCode] = false; 
            });
        }, {
            name: 'input',
            keysDown: null,
            isKeyDown: function (keyCode) {
                /// <summary>Returns whether the given key is pressed.</summary>
                /// <param name="keyCode" type="Number">The key code.</param>
                /// <returns type="Boolean">Whether the key is pressed.</returns>
                return this.keysDown[keyCode];
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.System', {
        InputSystem: InputSystem
    });

    return InputSystem;
});