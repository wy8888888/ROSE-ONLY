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
                    speed: 500, // 动画速度
                    delay: 2000 // 延迟
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

// (function($) {
//     $.fn.Slider = function(options) {
//       "use strict";
    
//       var settings = $.extend({
//         isAuto: true,
//         transTime: 4000,
//         animateSpeed: 1000,  
//         sliderMode: 'slide', //'slide | fade',
//         pointerControl: true,
//         pointerEvent: 'click',//'hover' | 'click',
//         arrowControl: true,
//       }, options);
//       var interval;
//       var isAnimating     = false;
//       var $slider         = $(this);
//       var $sliderWrap     = $slider.find('.slider-inner');
//       var sliderCount     = $sliderWrap.find('> .item').length;
//       var sliderWidth     = $slider.width();
//       var currentIndex    = 0;
    
//       var sliderFun = {
//         controlInit: function() {
//           // pointerControl
//           if (settings.pointerControl) {
            
//             var html = '';
//             html += '<ol class="slider-pointer">';
//             for (var i = 0; i < sliderCount; i++) {
//               if (i == 0) {
//                 html += '<li class="active"></li>'
//               }else{
//                 html += '<li></li>'
//               }
//             }
//             html += '</ol>'
//             $slider.append(html);
//               // 指示器居中
//             var $pointer = $slider.find('.slider-pointer');
//             $pointer.css({
//               left: '50%',
//               marginLeft: - $pointer.width()/2
//             });
//           }
//           // pointerControl
//           if (settings.arrowControl) {
//             var html = "";
//             html += '<span class="slider-control prev">&lt;</span>';
//             html += '<span class="slider-control next">&gt;</span>'
//             $slider.append(html);
//           }
//           $slider.on('click', '.slider-control.prev', function(event) {
//             sliderFun.toggleSlide('prev');
//           });
//           $slider.on('click', '.slider-control.next', function(event) {
//             sliderFun.toggleSlide('next');
//           });
//         },
//         // slider
//         sliderInit: function() {
//           sliderFun.controlInit();
//           // 模式选择
//           if (settings.sliderMode == 'slide') {
//             // slide 模式
//             $sliderWrap.width(sliderWidth * sliderCount);
//             $sliderWrap.children().width(sliderWidth);
//           }else{
//             // mode 模式
//             $sliderWrap.children().css({
//               'position': 'absolute',
//               'left': 0,
//               'top': 0
//             });
//             $sliderWrap.children().first().siblings().hide();
//           }
//           // 控制事件
//           if (settings.pointerEvent == 'hover') {
//             $slider.find('.slider-pointer > li').mouseenter(function(event) {
//               sliderFun.sliderPlay($(this).index());
//             });
//           }else{
//             $slider.find('.slider-pointer > li').click(function(event) {
//               if (currentIndex != $(this).index()) {
//                     sliderFun.sliderPlay($(this).index())
//                 }
//             });
//           }
//           // 自动播放
//           sliderFun.autoPlay();
//         },
//         // slidePlay
//         sliderPlay: function(index) {
//           sliderFun.stop();
//           isAnimating = true;
//           $sliderWrap.children().first().stop(true, true);
//           $sliderWrap.children().stop(true, true);
//           $slider.find('.slider-pointer').children()
//             .eq(index).addClass('active')
//             .siblings().removeClass('active');
//           if (settings.sliderMode == "slide") {
//             // slide
//             if (index > currentIndex) {
//               $sliderWrap.animate({
//             left: '-=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
//         }, settings.animateSpeed, function() {
//             sliderFun.stop();
//             isAnimating = false;
//             sliderFun.autoPlay()
//         });
//             } else if (index < currentIndex) {
//               $sliderWrap.animate({
//                 left: '+=' + Math.abs(index - currentIndex) * sliderWidth + 'px'
//               }, settings.animateSpeed, function() {
//                 isAnimating = false;
//                 sliderFun.autoPlay();
//               });
//             } else {
//               return;
//             }
//           }else{
//             // fade
//             if ($sliderWrap.children(':visible').index() == index) return;
//             $sliderWrap.children().fadeOut(settings.animateSpeed)
//               .eq(index).fadeIn(settings.animateSpeed, function() {
//                 isAnimating = false;
//                 sliderFun.autoPlay();
//               });
//           }
//           currentIndex = index;
//         },
//         // toggleSlide
//         toggleSlide: function(arrow) {
//           if (isAnimating) {
//             return;
//           }
//           var index;
//           if (arrow == 'prev') {
//             index = (currentIndex == 0) ? sliderCount - 1 : currentIndex - 1;
//             sliderFun.sliderPlay(index);
//           }else if(arrow =='next'){
//             index = (currentIndex == sliderCount - 1) ? 0 : currentIndex + 1;
//             sliderFun.sliderPlay(index);
//           }
//         },
//         // autoPlay
//         autoPlay: function() {
//           if (settings.isAuto) {
//             interval = setInterval(function () {
//               var index = currentIndex;
//               (currentIndex == sliderCount - 1) ? index = 0: index = currentIndex + 1;
//               sliderFun.sliderPlay(index);
//             }, settings.transTime);
//           }else{
//             return;
//           }
//         },
//         //stop
//         stop: function() {
//           clearInterval(interval);
//         },
//       };
//       sliderFun.sliderInit();
//     }
//     })(jQuery);
//     jQuery(document).ready(function($) {
//       $('#slider').Slider();
//     });