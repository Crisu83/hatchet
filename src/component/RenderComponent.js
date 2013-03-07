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
            this.dependencies = ['spatial', 'sprite'];
        }, {
            name: 'render',
            zIndex: 0,
            visible: true,
            system: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                Component.prototype.init.apply(this);

                this.system = this.getSystem('render');

                if (!this.system) {
                    throw new Error('RenderComponent.init: Cannot initializes component without its system.');
                }
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                if (this.visible) {
                    var spatial = this.spatial,
                        sprite = this.sprite;

                    this.system.register(this.zIndex, function (context) {
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

    return RenderComponent;
});