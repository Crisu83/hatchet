define([
    'hatchet/core/Component'
], function (Component) {
    // Input component class.
    var InputComponent = WinJS.Class.derive(
        Component,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="Game">The game that this component belongs to.</param>
            Component.call(this, game); // call super constructor
            this.state = Component.states.INIT;
        }, {
            name: 'input',
            system: null,
            init: function () {
                /// <summary>Initializes the component.</summary>
                Component.prototype.init.apply(this);

                this.system = this.getSystem('input');

                if (!this.system) {
                    throw new Error('InputComponent.init: Cannot initializes component without its system.');
                }
            },
            isKeyDown: function (keyCode, release) {
                /// <summary>Returns whether the given key is pressed.</summary>
                /// <param name="keyCode" type="Number">The key code.</param>
                /// <param name="release" type="Boolean">Whether the key should be force-released.</param>
                /// <returns type="Boolean">Whether the key is pressed.</returns>
                return this.system ? this.system.isKeyDown(keyCode, release) : false;
            }
        }
    );

    return InputComponent;
});