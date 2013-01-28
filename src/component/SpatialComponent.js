define([
    'hatchet/core/Component'
], function(Component) {
    return WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
        }, {
            name: 'spatial',
            x: 0,
            y: 0,
            w: 0,
            h: 0,
        }
    );
});