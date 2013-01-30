define([
    'hatchet/core/Component'
], function (Component) {
    // Sprite component class.
    var SpriteComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
        }, {
            name: 'sprite',
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            image: null
        }
    );
    
    WinJS.Namespace.define('Hatchet.Component', {
        SpriteComponent: SpriteComponent
    });

    return SpriteComponent;
});