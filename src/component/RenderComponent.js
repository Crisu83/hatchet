define([
    'hatchet/core/Component'
], function (Component) {
    // Render component class.
    var RenderComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.RENDER;
        }, {
            name: 'render',
            zIndex: 0,
            update: function () {
                /// <summary>Updates the component.</summary>
                var system = this.getSystem('render'),
                    spatial = this.getComponent('spatial'),
                    sprite = this.getComponent('sprite');

                if (system && sprite && spatial) {
                    system.add(this.zIndex, function(context) {
                        context.drawImage(
                            sprite.image,
                            sprite.x, sprite.y, // image x, y
                            spatial.w, spatial.h, // image w, h
                            spatial.x, spatial.y, // canvas x, y
                            spatial.w, spatial.h // canvas w, h
                        );
                    });
                }
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.Component', {
        RenderComponent: RenderComponent
    });

    return RenderComponent;
});