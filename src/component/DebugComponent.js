define([
    'hatchet/core/Component'
], function (Component) {
    // Debug component class.
    var DebugComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.RENDER;
            this.dependencies = ['spatial'];
        }, {
            name: 'debug',
            zIndex: 1,
            color: 'rgb(255, 0, 255)',
            system: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                Component.prototype.init.apply(this);

                this.system = this.getSystem('render');

                if (!this.system) {
                    throw new Error('DebugComponent.init: Cannot initializes component without its system.');
                }
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                var color = this.color,
                    spatial = this.spatial;
                
                this.system.register(this.zIndex, function (context) {
                    context.strokeStyle = color;
                    context.strokeRect(spatial.x, spatial.y, spatial.w, spatial.h);
                });
            }
        }
    );

    return DebugComponent;
});