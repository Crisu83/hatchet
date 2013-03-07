define([
    'hatchet/core/Component',
    'hatchet/util/Rect'
], function (Component, Rect) {
    // Bound component class.
    var BoundComponent = WinJS.Class.mix(
        WinJS.Class.derive(
            Component,
            function (game) {
                /// <summary>Creates a new component.</summary>
                /// <param name="game" type="Game">The game that this component belongs to.</param>
                Component.call(this, game); // call super constructor
                this.state = Component.states.LOGIC;
                this.dependencies = ['spatial'];
            }, {
                name: 'bound',
                update: function () {
                    /// <summary>Updates the component.</summary>
                    Component.prototype.update.apply(this);

                    if (this.spatial.x <= this.x) {
                        this.spatial.x = this.x;
                    }
                    if (this.spatial.y <= this.y) {
                        this.spatial.y = this.y;
                    }
                    if (this.spatial.x2() >= this.x2()) {
                        this.spatial.x = this.x2() - this.spatial.w;
                    }
                    if (this.spatial.y2() >= this.y2()) {
                        this.spatial.y = this.y2() - this.spatial.h;
                    }
                }
            }
        ),
        Rect // Add rectangle mixin
    );

    return BoundComponent;
});