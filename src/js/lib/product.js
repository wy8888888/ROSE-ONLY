let baseUrl = "http://localhost:8080/rose-only.com";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let id = location.search.split('=')[1];
            $.ajax({
                url: `${baseUrl}/lib/getitem.php`,
                type: 'get',
                data: {
                    id: id
                },
                dataType: 'json',
                
                
                success: function (res) {
                    // console.log(res);

                    title = res.p_title;
                    // console.log(title);
                    title1 = title.slice(0, 4);//系列名
                    title2 = title.slice(7);//商品名
                    smallpic = res.p_smallpic.split(',');//转成数组 小图

                    //商品大图
                    let bigPic=`
                    <img id="detail_main_img" style="width: 350px;height: 350px;"
                    src="${baseUrl}/src/img/${smallpic[0]}" border="0"
                    alt="${title1}" title="${title2}">
                    <div class="movebox"></div>
                    `;

                    //商品放大镜大图
                    let bigpic=`
                    <div class="big">
                        <img src="" alt="" class="bigpic">
                    </div>
                    `;

                    //商品小图
                    let smallPicList=`
                    <div class="f1" style="float:left"></div>
                    <a href="javascript:;" rel="1" class="img_selected"><img class="detail_img" border="0"
                            src="${baseUrl}/src/img/${smallpic[0]}"
                            data-imgpath="${baseUrl}/src/img/${smallpic[0]}"></a>
                    <a href="javascript:;" rel="2"><img class="detail_img" border="0"
                            src="${baseUrl}/src/img/${smallpic[1]}"
                            data-imgpath="${baseUrl}/src/img/${smallpic[1]}"></a>
                    <a href="javascript:;" rel="3"><img class="detail_img" border="0"
                            src="${baseUrl}/src/img/${smallpic[2]}"
                            data-imgpath="${baseUrl}/src/img/${smallpic[2]}"></a>
                    <a href="javascript:;" rel="4"><img class="detail_img" border="0"
                            src="${baseUrl}/src/img/${smallpic[3]}"
                            data-imgpath="${baseUrl}/src/img/${smallpic[3]}"></a>
                    <div class="fr"></div>
                    <script>
                $(function () {
                    mainImg = $('#detail_main_img');//小图
                    detailImg = $('.detail_img');//缩略图
                    selected = $('.jewel_paging>a');//被选中的缩略图
                    smallWindow = $('.image_reel1');//小图的window
                    Window=$('.big_window');
                    bigWindow = $('.big');//大图的window
                    bigpic = $('.bigpic');//大图
                    movebox = $('.movebox');//移动块

                    // 遍历小图
                    for (var i = 0; i < detailImg.length; i++) {
                        var imgOne = detailImg[i];
                        imgOne.onmouseover = function () {
                            mainImg[0].src = this.src;
                        }
                    }
                    //缩略图被选中效果
                    detailImg.on('mouseover', function () {
                        $('.jewel_paging>a').removeClass('img_selected');
                        $(this).parent().addClass('img_selected');
                    });

                    //鼠标移入显示bigWindow
                    smallWindow.on('mouseover', function () {
                        movebox.addClass('show');
                        Window.addClass('show');
                        bigWindow.addClass('show');
                        bigpic[0].src = mainImg[0].src;

                        //鼠标移动
                        smallWindow.on('mousemove', function (ev) {
                            var top = ev.pageY - smallWindow.offset().top - (100 / 2);
                            var left = ev.pageX - smallWindow.offset().left - (100 / 2);
                            // console.log(ev.pageX, ev.pageY);
                            // console.log(smallWindow.offset().top, smallWindow.offset().left);
                            // console.log(movebox.offset().height, movebox.offset().width);

                            // 移动比例计算
                            var ratio = 600/350
                            // console.log(bigpic.offset());

                            if (left <= 0) {
                                left = 0;
                            } else if (left > 350 - 100) {
                                left = 350 - 100 ;
                            }

                            if (top <= 0) {
                                top = 0;
                            } else if (top > 350 - 100) {
                                top = 350- 100;
                            }

                            movebox.css({ //修改定位
                                left: left + 'px',
                                top: top + 'px'
                                
                            });

                            bigpic.css({
                                left: -left * ratio + 'px',
                                top: -top * ratio + 'px'
                            });
                        });
                    });
                    smallWindow.on('mouseout', function () {
                        movebox.removeClass('show');
                        Window.removeClass('show');
                        bigWindow.removeClass('show');
                    });
                }); 
            </script>
                    `;

                    //商品信息
                    let tit=`${title2}`;//商品名
                    let series=`-${title1}系列`;//商品系列
                    let price=`<span>价格：</span>￥${res.p_price}`;//商品价格

                    //商品详情
                    let details = `
                        <div class="details_img">
                            <img src="${baseUrl}/src/img/${res.p_detail}" alt="${res.p_title}">
                        </div>`;

                    //加入购物车数量
                    let cartnum=`
                    <span class="right_font_tit">数量：</span>
                    <input type="text" value="1" class="right_number num" maxlength="${res.p_num}">
                    <div class="right_u_d">
                        <a href="javascript:;" class="right_up"></a>
                        <a href="javascript:;" class="right_down"></a>
                    </div>
                    <script>
                        $(function () {
                            let num = $('.num').val();
                            let maxnum = $('.num').attr('maxlength');
                            $('.right_up').on('click', function () {
                                if (num < maxnum) num++;
                                else{
                                    num = maxnum;
                                    $(".right_up").off();
                                }
                                $('.num').val([num]);
                            });
                            $('.right_down').on('click', function () {
                                if (num > 1) num--;
                                else{
                                    num = 1;
                                    $(".right_down").off();
                                }
                                $('.num').val([num]);
                            });
                        })
                    </script>
                    <div class="clear"></div>
                    `;

                    $('.image_reel1').append(bigPic);//添加大图
                    $('.big_window').append(bigpic);//添加放大镜大图
                    $('.jewel_paging').append(smallPicList);//添加四张小图
                    $('.right_tit').append(tit);//添加商品标题
                    $('.right_pay').append(price);//添加商品价格
                    $('.right_xxc').append(series);//添加商品系列名
                    $('.div_details1').append(details);//添加商品详情

                    $(".right_select").append(cartnum);//添加加入购物车数量
                    callback && callback(res.p_id, res.p_price);//callback
                    console.log(res.p_id,res.p_price);
                }
            })
        },
        addItem: function (id, price, num) {
            let shop = cookie.get('shop'); // 获取cookie数据 判断是否存在
            // 如果有cookie  修改cookie
            // 如果有cookie  添加cookie
            let product = {
                id: id,
                price: price,
                num: num
            };
            if (shop) {
                alert('添加成功！')
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = Number(num)+Number(elm.num) : null;
                        console.log(shop);
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = []; // 购物车没有内容 新建一个购物车
                shop.push(product); //将商品放入购物车
                console.log(shop);
                alert('添加成功！')
            }
            let cartNum=document.getElementById('cartNum');
            let sum=shop.length;
            cartNum.innerHTML='('+sum+')';
            console.log(cartNum);
            cookie.set('shop', JSON.stringify(shop), 1);
            // console.log(shop);
            let idList = shop.map(elm=>elm.id).join(); //取id并且用,连接
            console.log(idList);
        },
        toBuy:function (id, price, num) {
            let shop = cookie.get('shop'); // 获取cookie数据 判断是否存在
            // 如果有cookie  修改cookie
            // 如果有cookie  添加cookie
            let product = {
                id: id,
                price: price,
                num: num
            };
            if (shop) {
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = Number(num)+Number(elm.num) : null;
                        console.log(shop);
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = []; // 购物车没有内容 新建一个购物车
                shop.push(product); //将商品放入购物车
                console.log(shop);
            }
            let cartNum=document.getElementById('cartNum');
            let sum=shop.length;
            cartNum.innerHTML='('+sum+')';
            console.log(cartNum);
            cookie.set('shop', JSON.stringify(shop), 1);
            // console.log(shop);
            let idList = shop.map(elm=>elm.id).join(); //取id并且用,连接
            console.log(idList);
            window.location.href = './cart.html';

        }
    }
});