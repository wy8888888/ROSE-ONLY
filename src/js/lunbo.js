(function() {
    $.fn.extend({
        slider: function(options) {
            // 函数式编程
            var main = null, //主函数
                init = null, //初始化
                start = null, //开始
                stop = null, //结束
                prev = null, //上一张
                next = null, //下一张
                timer = null, //计时器
                elms = {}, // 命名空间  存储元素
                defaults = {
                    speed: 800, // 动画速度
                    delay: 3000 // 延迟
                };

            $.extend(defaults, options); //合并参数


            init = function() {
                // 元素选取
                elms._index = 1; //当前播放的图片索引
                elms.sliderDiv = this.children('div'); //选取移动的div元素
                elms.btn = this.children('span'); //选取按钮
                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone()); // 克隆第一张图片
                console.log(this);

                // 事件绑定
                elms.btn.on('click', function() {
                    if (elms.btn.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });

                this.hover(function() {
                    stop();
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                })
            }.bind(this);


            start = function(direction) {
                var left = "-=1240px"; //设置移动的距离

                if (!direction) {
                    left = "+=1240px";
                    if (elms._index == 1) {
                        elms._index = 7;
                        var divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', '-' + (imgLeft - divLeft) + 'px');
                    }
                }

                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function() {
                    if (direction) elms._index++; // 索引+1
                    else elms._index--;


                    if (elms._index === 7) { //播放到最后一张
                        elms._index = 1; //修改成1
                        elms.sliderDiv.css('left', 0); //定位为0
                    }
                });
            }.bind(this);


            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }

            stop = function() {
                elms.sliderDiv.stop(true, true);
                clearInterval(timer);
            }

            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
            }

            main();
        }
    });
})();
