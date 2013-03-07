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
                removed: false,
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
                    var i, len, component;
                    for (i = 0, len = this.components.size(); i < len; i++) {
                        component = this.components.get(i);
                        if (component.name === name) {
                            return component;
                        }
                    }
                    return null;
                },
                getComponentProperty: function (componentName, propertyName) {
                    /// <summary>Returns the value of the given component property.</summary>
                    /// <param name="componentName" type="String">The name of the component.</param>
                    /// <param name="propertyName" type="String">The name of the property.</param>
                    /// <returns type="Object">The value.</returns>
                    var component = this.getComponent(componentName);
                    if (!component || !component[propertyName]) {
                        throw new Error('Entity.getComponentProperty: Component not found.');
                    }
                    return component[propertyName];
                },
                setComponentProperty: function (componentName, propertyName, propertyValue) {
                    /// <summary>Sets the value of the given component property.</summary>
                    /// <param name="componentName" type="String">The name of the component.</param>
                    /// <param name="propertyName" type="String">The name of the property.</param>
                    /// <param name="propertyValue" type="Object">The value of the property.</param>
                    var component = this.getComponent(componentName);
                    if (!component) {
                        throw new Error('Entity.setComponentProperty: Component not found.');
                    }
                    component[propertyName] = propertyValue;
                    return this;
                },
                remove: function () {
                    /// <summary>Marks the entity as removed.</summary>
                    this.dispatchEvent('entity:remove', { source: this });
                    this.removed = true;
                }
            }
        ),
        WinJS.Utilities.eventMixin // Add event dispatcher mixin
    );

    return Entity;
});