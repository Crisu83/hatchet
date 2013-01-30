define([
    'hatchet/core/Component'
], function (Component) {
    // Bound component class.
    var BoundComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.LOGIC;
        }, {
            name: 'bound',
            x: 0,
            y: 0,
            w: 0, 
            h: 0,
            x2: function () {
                return this.x + this.w;
            },
            y2: function() {
                return this.y + this.h;
            },
            update: function () {
                var spatial = this.getComponent('spatial');
                if (spatial) {
                    if (spatial.x <= this.x) {
                        spatial.x = this.x;
                    }
                    if (spatial.y <= this.y) {
                        spatial.y = this.y;
                    }
                    if (spatial.x2() >= this.x2()) {
                        spatial.x = this.x2() - spatial.w;
                    }
                    if (spatial.y2() >= this.y2()) {
                        spatial.y = this.y2() - spatial.h;
                    }
                }
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.Component', {
        BoundComponent: BoundComponent
    });

    return BoundComponent;
});