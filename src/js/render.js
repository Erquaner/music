(function ($, root) {
    var $scope = $(document.body);
    function renderInfo(info) {
        var html = '<div class="song-name">' + info.song + '</div>' +
                   '<div class="singer-name">' + info.singer + '</div>' +
                   '<div class="album-name">' + info.album + '</div>';
        $scope.find('.song-info').html(html);
    }

    function renderImg(info) {
        $scope.find('.song-img img').attr('src', info.image);
        var img = new Image();
        img.src = info.image;
        img.onload = function () {
            root.blurImg(img, $scope);
        }
    }

    function renderLike(isLike) {
        isLike ? $scope.find('.like-btn').addClass('liking'):
                $scope.find('.like-btn').removeClass('liking');
    }
    
    root.render = function (info) {
        renderInfo(info);
        renderImg(info);
        renderLike(info.isLike);
    }

})(window.Zepto, window.player || (window.player = {})) 