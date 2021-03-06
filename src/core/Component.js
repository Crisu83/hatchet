﻿define([
    'hatchet/core/Node'
], function (Node) {
    // Base component class. 
    // All components should be extended from this class.
    var Component = WinJS.Class.derive(
        Node,
        function (game) {
            /// <summary>Creates a new component.</summary>
            /// <param name="game" type="CanvasGame">The game that this component belongs to.</param>
            Node.call(this, this.name); // call super constructor
            this.game = game;
            this.dependencies = [];
        }, {
            state: null,
            game: null,
            owner: null,
            dependencies: null,
            enabled: true,
            init: function () {
                /// <summary>Initializes the component.</summary>
                if (!this.owner) {
                    throw new Errror('Component.init: Cannot initialize component without an entity.');
                }

                this.initDependencies();
            },
            initDependencies: function () {
                /// <summary>Initializes the dependencies for the component.</summary>
                var numDependencies = this.dependencies.length;
                if (numDependencies > 0) {
                    var name, dependency;
                    for (var i = 0; i < numDependencies; i++) {
                        name = this.dependencies[i];
                        dependency = this.getComponent(name);
                        if (!dependency || this[name]) {
                            throw new Error('Component.initDependencies: Cannot initialize component without dependency.');
                        }
                        this[name] = dependency;
                    }
                }
            },
            getSystem: function (name) {
                /// <summary>Returns the system with the given name.</summary>
                /// <param name="name" type="String">Name of the system.</param>
                /// <returns type="System">The system.</returns>
                return this.game.getSystem(name);
            },
            getComponent: function (name) {
                /// <summary>Returns the component with the given name for the entity that this component belongs to.</summary>
                /// <param name="name" type="String">Name of the component.</param>
                /// <returns type="Component">The component.</returns>
                return this.owner.getComponent(name);
            },
            on: function (type, fn) {
                this.owner.addEventListener(type, fn);
            },
            off: function (type, fn) {
                this.owner.removeEventListener(type, fn);
            },
            fire: function (type, data) {
                /// <summary>Sends the given message to the entity that this component belongs to.</summary>
                /// <param name="msg" type="String>The message text.</param>
                data = data || {};
                data.source = this.owner;
                this.owner.dispatchEvent(type, data);
            }
        }, {
            // Component states in which they can choose to run.
            states: {
                INIT: 1,
                LOGIC: 2,
                PHYSICS: 3,
                MOVEMENT: 4,
                RENDER: 5
            }
        }
    );

    return Component;
});