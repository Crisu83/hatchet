define([
    'hatchet/core/Component'
], function (Component) {
    // Spatial component class.
    var SpatialComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
        }, {
            name: 'spatial',
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            x2: function() {
                return this.x + this.w;
            },
            y2: function() {
                return this.y + this.h;
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.Component', {
        SpatialComponent: SpatialComponent
    });

    return SpatialComponent;
});