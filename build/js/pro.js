(function ($, root) {
    var duration;
    var startTime;
    var lastPer = 0;
    var frameId;
    function renderAllTime (time) {//渲染总时间,将时间插入到html结构中
        duration = time;
        lastPer = 0;
        var fTime = formatTime(time);
        $('.all-time').html(fTime);
    }

    function formatTime (time) {//处理时间格式 253--> 04:57
        time = Math.floor(time);
        var min = Math.floor(time / 60);
        var sec = time % 60;
        if(min < 10) {
            min = '0' + min;
        }
        if(sec < 10) {
            sec = '0' + sec;
        }
        return min + ':' + sec;
    }

    function update (per) {
        //接收百分比，更新进度条位置以及当前时间
        
        var perTage = (per - 1) * 100 + '%';
        $('.pro-top').css('transform', 'translateX(' + perTage + ')');
        var time = formatTime(duration * per);
        $('.cur-time').html(time);
    }

    function stop () {
        // 暂停， 移动

        var stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000)
        cancelAnimationFrame(frameId);
    }
    function start (time) {
        // 开始播放，默认移动

        cancelAnimationFrame(frameId);
        lastPer = time == undefined ? lastPer : time;
        startTime = new Date().getTime();
        function frame () {
            var endTime = new Date().getTime();
            var per = lastPer + (endTime - startTime) / (duration * 1000);
            if(per < 1) {
                frameId = requestAnimationFrame(frame);
                update(per);    
            } else {
                cancelAnimationFrame(frameId);
                $('.next-btn').trigger("click");
            }
        }
        frame();
    }
    root.pro = {
        renderAllTime: renderAllTime,
        update: update,
        stop: stop,
        start: start
    }

    // root.pro.renderAllTime();
})(window.Zepto, window.player || (window.player = {}))