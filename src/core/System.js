define([
    'hatchet/core/System'
], function (System) {
    return WinJS.Class.derive(
        System,
        function (game) {
            /// <summary>Creates a new system.</summary>
            /// <param name="game" type="CanvasGame">The game that this system belongs to.</param>
            this.game = game;
        }, {
            game: null
        }
    );
});