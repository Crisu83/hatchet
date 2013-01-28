define([

], function () {
    return WinJS.Class.define(
        null, {
        }, {
            images: {},
            load: function (url) {
                /// <summary>Loads an image from the given url.</summary>
                /// <param name="url" type="String">The url for the image to load.</param>
                /// <returns type="Image">The image.</returns>
                if (!this.images[url]) {
                    var image = new Image;
                    image.src = url;
                    this.images[url] = image;
                }
                return this.images[url];
            }
        }
    )
});