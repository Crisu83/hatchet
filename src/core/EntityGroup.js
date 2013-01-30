define([
    'hatchet/core/Entity',
    'hatchet/util/List'
], function (Entity, List) {
    // Entity group class.
    var EntityGroup = WinJS.Class.derive(
        List,
        function () {
            /// <summary>Creates a new group.</summary>
            List.call(this); // call super constructor
        }, {
            add: function (entity) {
                /// <summary>Adds the given entity to the group.</summary>
                /// <param name="object" type="Object">The entity to add.</param>
                /// <returns type="Object">The current scope.</returns>
                if (entity instanceof Entity) {
                    this.listen(entity);
                    List.prototype.add.apply(this, [entity]);
                }
            },
            listen: function (entity) {
                /// <summary>Starts listening to the entity remove event in order to do gc.</summary>
                /// <param name="object" type="Entity">The entity to listen to.</param>
                var that = this;
                entity.addEventListener('entity:remove', function (event) {
                    var source = event.detail.source;
                    if (source) {
                        source.removeEventListener('entity:remove', this);
                        that.remove(source);
                    }
                });
            },
            update: function () {
                /// <summary>Updates the entities in the group.</summary>
                var i, len, entity;
                for (i = 0, len = this.objects.length; i < len; i++) {
                    entity = this.objects[i];
                    if (entity) {
                        entity.update();
                    }
                }
            }
        }
    );
    
    WinJS.Namespace.define('Hatchet.Core', {
        EntityGroup: EntityGroup
    });

    return EntityGroup;
});