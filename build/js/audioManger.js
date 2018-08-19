(function ($, root) {

    function audioManager () {
        this.audio = new Audio();
        this.staus = 'pause';
    }
    audioManager.prototype = {
        getAudio: function (info) {
            this.audio.src = info.audio;
            this.audio.load();
        },
       play: function () {
            this.audio.play();
            this.staus = 'play';
        },
        pause: function () {
            this.audio.puse();
            this.staus = 'pause';
        }
 
    }
    root.audioManager = audioManager;

})(window.Zepto, window.player || (window.player = {}))