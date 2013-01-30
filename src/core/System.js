define([
    'hatchet/core/System'
], function (System) {
    // Base system class.
    var System = WinJS.Class.define(
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="Game">The game that this system belongs to.</param>
            this.game = game;
        }, {
            game: null
        }
    );
    
    WinJS.Namespace.define('Hatchet.Core', {
        System: System
    });

    return System;
});