define([
    'hatchet/core/Node',
    'hatchet/util/SortedList'
], function (Node, SortedList) {
    // Entity class.
    var Entity = WinJS.Class.mix(
        WinJS.Class.derive(
            Node,
            function (name) {
                /// <summary>Creates a new entity.</summary>
                /// <param name="name" type="String">The name for this entity.</param>
                Node.call(this, name); // call super constructor
                this.components = new SortedList(function(a, b) {
                    return a.state - b.state;
                });
            }, {
                components: null,
                init: function () {
                    /// <summary>Initializes the entity.</summary>
                    this.dispatchEvent('entity:init', { source: this });
                },
                update: function () {
                    /// <summary>Updates the entity and its components.</summary>
                    Node.prototype.update.apply(this); // call the parent implementation
                    this.components.update(); // sort the components
                    var i, len, component;
                    for (i = 0, len = this.components.size(); i < len; i++) {
                        component = this.components.get(i);
                        if (component.enabled && typeof component.update === 'function') {
                            component.update();
                        }
                    }
                },
                addComponent: function (component) {
                    /// <summary>Adds the given component to the entity.</summary>
                    /// <param name="component" type="Component">The component to add.</param>
                    /// <returns type="Entity">The current scope.</returns>
                    component.owner = this;
                    this.components.add(component);
                    return this;
                },
                removeComponent: function (component) {
                    /// <summary>Removes the given component from the entity.</summary>
                    /// <param name="component" type="Component">The component to remove.</param>
                    /// <returns type="Entity">The current scope.</returns>
                    this.components.remove(component);
                    return this;
                },
                getComponent: function (name) {
                    /// <summary>Returns the component with the given name.</summary>
                    /// <param name="name" type="String">The name of the component.</param>
                    /// <returns type="Component">The component.</returns>
                    var component;
                    for (var i = 0, len = this.components.size(); i < len; i++) {
                        component = this.components.get(i);
                        if (component.name === name) {
                            return component;
                        }
                    }
                    return null;
                },
                getProperty: function (componentName, name) {
                    /// <summary>Returns the value of the given component property.</summary>
                    /// <param name="componentName" type="String">The name of the component.</param>
                    /// <param name="name" type="String">The name of the property.</param>
                    /// <returns type="Object">The value.</returns>
                    var component = this.getComponent(componentName);
                    if (!component) {
                        throw new Error('Entity.getProperty: Component not found.');
                    }
                    return component[name];
                },
                setProperty: function (componentName, name, value) {
                    /// <summary>Sets the value of the given component property.</summary>
                    /// <param name="componentName" type="String">The name of the component.</param>
                    /// <param name="name" type="String">The name of the property.</param>
                    /// <param name="value" type="Object">The value of the property.</param>
                    var component = this.getComponent(componentName);
                    if (!component) {
                        throw new Error('Entity.setProperty: Component not found.');
                    }
                    component[name] = value;
                    return this;
                },
                broadcastMessage: function (msg) {
                    /// <summary>Broadcasts a message to all the components.</summary>
                    /// <param name="msg" type="String">The message text.</param>
                    var component;
                    for (var i = 0, len = this.components.size() ; i < len; i++) {
                        component = this.components.get(i);
                        if (component && typeof component.handleMessage === 'function') {
                            component.handleMessage(msg);
                        }
                    }
                    this.handleMessage(msg);
                },
                handleMessage: function (msg) {
                    /// <summary>Handles the given message if necessary.</summary>
                    /// <param name="msg" type="String">The message text.</param>
                    switch (msg) {
                        case 'destroy':
                            this.destroy();
                            break;
                    }
                },
                destroy: function () {
                    /// <summary>Destroys the entity.</summary> 
                    this.dispatchEvent('entity:destroy', { source: this });
                }
            }
        ),
        WinJS.Utilities.eventMixin // Add event dispatcher mixin
    );

    return Entity;
});