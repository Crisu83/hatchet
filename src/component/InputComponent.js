define([
    'hatchet/core/Component'
], function (Component) {
    return WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
        }, {
            name: 'input',
            isKeyDown: function (keyCode) {
                /// <summary>Returns whether the given key is pressed.</summary>
                /// <param name="keyCode" type="Number">The key code.</param>
                /// <returns type="Boolean">Whether the key was pressed.</returns>
                var system = this.getSystem('input');
                if (system) {
                    return system.isKeyDown(keyCode);
                }
                return false;
            }
        }
    )
});