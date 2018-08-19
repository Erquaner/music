// npm install 下载插件
var root = window.player;
var render = root.render;

var index = 0;
var songList ;
var control;
var audio = new root.audioManager();
var $scope = $(document.body);
var $slider = $('.slider-point');

function bindEvent (data) {
    // 移动端 click 300ms延迟 --> 新增touch模块 --> on('tap')
    
    $scope.on('play:change', function (e, index) {
        render(data[index]); 
        root.pro.renderAllTime(data[index].duration);
        audio.getAudio(data[index]);
        if(audio.status == 'play') {
            audio.play();
            root.pro.start(0);
        }
        root.pro.update(0);
    })

    $('.prev-btn').on('click', function () {
        index = control.prev();
        // render(data[index]);
        // audio.getAudio(data[index]);
        $scope.trigger('play:change', index);
    })
    $('.next-btn').on('click', function () {
        index = control.next();
        // render(data[index]);
        // audio.getAudio(data[index]);
        $scope.trigger('play:change', index);
    })
    $('.play-btn').on('click', function () {
        if(audio.status == 'pause') {
            audio.play();
            root.pro.start();
        } else {
            audio.pause();
            root.pro.stop();
        }
        $(this).toggleClass('playing');
    })
    $('.like-btn').on('click', function () {
        // $(this).toggleClass('liking');
        if($scope.find('.liking').length) {
            $(this).removeClass('liking');
            data[index].isLike = false;
        } else {
            $(this).addClass('liking');
            data[index].isLike = true;
        }
    })
    $('.list-btn').on('click', function () {
        root.playList.show(control);
    })
   
}


function bindTouch (data) {
    var width = $('.pro-wrapper').offset().width;
    var left = $('.pro-wrapper').offset().left;        
    
    $slider.on('touchstart', function () {
        //时间，进度条移动暂停

        root.pro.stop();
    }).on('touchmove', function (e) {
        // 根据当前拖动的位置，渲染时间和进度条位置
        // console.log(e.changedTouches[0].clientX);
       
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0 || per > 1) {
            per = 0;
        }
        root.pro.update(per);

    }).on('touchend', function (e) {
        // 播放当前结束时间点对应的音乐


        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per < 0 || per > 1) {
            per = 0;
        }
        //跳到当前这首歌对应的时间
        var time = data[control.index].duration * per;
        audio.playTo(time);
        $('.play-btn').addClass('playing');
        root.pro.start(per);
    })
}

function getData (url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            // songList = data;
            control = new root.controlManager(data.length);
            bindEvent(data);
            bindTouch(data);
            $scope.trigger('play:change', 0)
            audio.getAudio(data[0]);
            songList = data;
            root.playList.renderList(data);
        },
        error: function () {
            console.log('error');
        }
    })
}
getData('../mock/data.json');

