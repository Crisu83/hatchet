define([
    
], function () {
    return WinJS.Class.define(
        function () {
            
        }, {
            subscribers: {},
            on: function (type, fn, data) {
                if (!this.subscribers[type]) {
                    this.subscribers[type] = [];
                }

                this.subscribers[event].push(fn);

                return this;
            },
            off: function (type, fn) {
                if (this.subscribers[type]) {
                    var subscribers = this.subscribers[type],
                        i, len;

                    for (i = 0, len = subscribers.length; i < len; i++) {
                        if (subscribers[i] === fn) {
                            subscribers.splice(i, 1);
                            break;
                        }
                    }
                }

                return this;
            },
            fire: function (event) {
                if (typeof event === "string") {
                    event = { type: event };
                }

                if (!event.target) {
                    event.target = this;
                }

                if (!event.type) {
                    throw new Error('Publisher.fire: Event type is not defined.');
                }

                if (this.subscribers[type]) {
                    var subscribers = this.subscribers[type],
                        i, fn;
                    for (i = 0, len = subscribers.length; i < len; i++) {
                        fn = this.subscribers[type][i];
                        fn.apply(this, Array.prototype.slice.call(arguments, 1));
                    }
                }

                return this;
            }
        }
    );
});