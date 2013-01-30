define([

], function () {
    // Base component class.
    var Component = WinJS.Class.define(
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
            this.game = game;
        }, {
            game: null,
            owner: null,
            state: null,
            enabled: true,
            getSystem: function (name) {
                /// <summary>Returns the system with the given name.</summary>
                /// <param name="name" type="String">Name of the system.</param>
                /// <returns type="System">The system.</returns>
                return this.game ? this.game.getSystem(name) : null;
            },
            getComponent: function (name) {
                /// <summary>Returns the component with the given name for the entity that this component belongs to.</summary>
                /// <param name="name" type="String">Name of the component.</param>
                /// <returns type="Component">The component.</returns>
                return this.owner ? this.owner.getComponent(name) : null;
            }
        }, {
            states: {
                INIT: 1,
                LOGIC: 2,
                PHYSICS: 3,
                MOVEMENT: 4,
                RENDER: 5
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.Core', {
        Component: Component
    });

    return Component;
});