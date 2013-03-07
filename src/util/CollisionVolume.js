define([
    'hatchet/util/Rect'
], function (Rect) {
    // Collision volume class.
    var CollisionVolume = WinJS.Class.mix(
        WinJS.Class.define(
            null, {
                entity: null,
                collidesWith: null,
                fn: null,
                collides: function (other) {
                    /// <summary>Returns whether the volume collides with the given volume.</summary>
                    /// <param name="other" type="Object">The other volume.</param>
                    /// <returns type="Boolean">The result.</returns>
                    return this.collidesWith.indexOf(other.entity.name) !== -1 && this.intersects(other);
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

    return CollisionVolume;
});