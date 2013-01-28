define([

], function () {
    return WinJS.Class.define(
        function () {
            this.pressed = {};
        }, {
            pressed: null,
            registerEvent: function (event, down) {
                this.pressed[event.keyCode] = down;
            },
            isDown: function (keyCode, release) {
                var down = this.pressed[keyCode];
                if (release) {
                    this.pressed[keyCode] = false;
                }
                return down;
            }
        }, {
           
        }
    )
});