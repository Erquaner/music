(function ($, root) {
    var $scope = $(document.body);
    var control;
    var $playList = $("<div class = 'play-list'>"+
                        "<div class ='play-header'>播放列表</div>" + 
                        "<ul class = 'list-wrapper'></ul>" +
                        "<div class ='close-btn'>关闭</div>"+
                    "</div>");
    
    function renderList (songList) {//渲染播放列表
        var html = '';
        for(var i = 0; i < songList.length; i++) {
            html += '<li><h3>' + songList[i].song + '<span>--' + songList[i].singer + '</span></h3></li>';
        }
        $playList.find('ul').html(html);
        $playList.appendTo($scope);
        bindEvent();
    }

    function show (controlmanager) {//显示playList
        control = controlmanager;
        $scope.find('.play-list').addClass('show');
        signSong(control.index);
    }

    function bindEvent () {
        $('.close-btn').on('click', function () {
            $('.play-list').removeClass('show');
            console.log('close');
        })
        $('.play-list').find('li').on('click', function () {
            var playIndex = $(this).index();
            control.index = playIndex;
            signSong(playIndex);
            audio.status = 'play';
            $('.play-btn').addClass("playing");
            $scope.trigger('play:change', playIndex);
            setTimeout(function () {
                $('.play-list').removeClass('show');                
            }, 150);
            console.log('find');

        })
    }
    function signSong (index) {//显示当前播放的歌曲
        $('.play-list').find('.sign').removeClass('sign');        
        $('.play-list').find('ul li').eq(index).addClass('sign');
    }

    root.playList = {
        renderList: renderList,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))