define([
    'hatchet/core/Component'
], function (Component) {
    return WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
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
                        console.log(sprite.x);
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
});