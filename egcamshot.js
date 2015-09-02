var egCamShot = function(videoEle, canvasEle) {
    var that = this;
    var thumbSize = {
        h: 60,
        w: 80
    };
    var fullSize = {
        h: 240,
        w: 320
    };

    var video = videoEle;
    var canvas = canvasEle;
    var ctx = canvas.getContext('2d');
    var localMediaStream = null;

    canvas.width = thumbSize.w;
    canvas.height = thumbSize.h;

    this.power = "off";

    this.takePic = function() {
        if (localMediaStream) {
            $(canvas).hide();
            var r = {
                full: _getImageBase64(fullSize),
                thumb: _getImageBase64(thumbSize)
            }
            $(canvas).show();
            return r;
        }
    }

    var _getImageBase64 = function(settings) {
        canvas.height = settings.h;
        canvas.width = settings.w;
        ctx.drawImage(video, 0, 0, settings.w, settings.h);
        return canvas.toDataURL();
    }
    this.turnOn = function() {
        that.power = "on";
        navigator.webkitGetUserMedia({
            video: {
                mandatory: {
                    maxWidth: fullSize.w
                }
            },
            audio: false
        }, function(stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
            video.onloadedmetadata = function(e) {

            };
        }, function(e) {
            console.log("Error on loading cam stream.", e);
        });
    }
    this.turnOff = function() {
        localMediaStream.stop();
        that.power = "off";
    }

};
