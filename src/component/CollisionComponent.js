define([
    'hatchet/core/Component',
    'hatchet/util/Rect'
], function (Component, Rect) {
    // Collision component class.
    var CollisionComponent = WinJS.Class.mix(
        WinJS.Class.derive(
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

                    this.x = this.spatial.x;
                    this.y = this.spatial.y;
                    this.w = this.spatial.w;
                    this.h = this.spatial.h;

                    this.system.register(this);
                },
                collides: function (other) {
                    /// <summary>Returns whether the volume collides with the given volume.</summary>
                    /// <param name="other" type="Object">The other entity.</param>
                    /// <returns type="Boolean">The result.</returns>
                    return this.collidesWith.indexOf(other.owner.name) !== -1 && this.intersects(other);
                },
                intersects: function (other) {
                    /// <summary>Returns whether the volume intersects the given volume.</summary>
                    /// <param name="other">The other collision volume.</param>
                    /// <returns type="Boolean">The result.</returns>
                    return !(other.x > this.x2() || other.x2() < this.x || other.y > this.y2() || other.y2() < this.y);
                }
            }
        ),
        Rect // Add rectangle mixin
    );

    return CollisionComponent;
});