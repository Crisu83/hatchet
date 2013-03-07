define([
    'hatchet/core/Component',
    'hatchet/util/CollisionVolume'
], function (Component, CollisionVolume) {
    // Collision component class.
    var CollisionComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.PHYSICS;
            this.collidesWith = [];
            this.dependencies = ['spatial'];
        }, {
            name: 'collision',
            collidesWith: null,
            system: null,
            collide: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                Component.prototype.init.apply(this);

                this.system = this.getSystem('collision');

                if (!this.system) {
                    throw new Error('CollisionComponent.init: Cannot initializes component without its system.');
                }
            },
            update: function () {
                /// <summary>Updates the component.</summary>
                Component.prototype.update.apply(this);

                var volume = this.createCollisioinVolume();
                this.system.register(volume);
            },
            createCollisioinVolume: function () {
                var volume = new CollisionVolume;
                volume.entity = this.owner;
                volume.collidesWith = this.collidesWith;
                volume.x = this.spatial.x;
                volume.y = this.spatial.y;
                volume.w = this.spatial.w;
                volume.h = this.spatial.h;
                volume.fn = this.collide;
                return volume;
            }
        }
    );

    return CollisionComponent;
});