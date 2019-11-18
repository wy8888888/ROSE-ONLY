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
                    // let pic = JSON.parse(res.pic);
                    console.log(res);
                    
                    // res.forEach(elm => {

                        title = res.p_title;
                        console.log(title);
                        title1 = title.slice(0, 4);//系列名
                        title2 = title.slice(7);//商品名
                        
                        smallpic=res.p_smallpic.split(',');//转成数组
                        console.log(smallpic);
                        console.log(smallpic[1]);

                        
                        //左边商品信息
                        let leftdetail = `
                        <div class="jewel_window">
                            <div class="image_reel1">
                                <img id="detail_main_img" style="width: 350px;height: 350px;"
                                    src="${res.p_smallpic.s1}" border="0"
                                    alt="roseonly诺誓 花篮-情动" title="花篮-情动">
                            </div>
                        </div>
                        <div class="jewel_paging">
                            <div class="f1" style="float:left"></div>
                            <a href="javascript:;" rel="1" class="img_selected"><img class="detail_img" border="0"
                                    src="${res.p_smallpic.s1}"
                                ></a>
                            <a href="javascript:;" rel="2"><img class="detail_img" border="0"
                                    src="${res.p_smallpic.s2}"
                                    ></a>
                            <a href="javascript:;" rel="3"><img class="detail_img" border="0"
                                    src="${res.p_smallpic.s3}"
                                    ></a>
                            <a href="javascript:;" rel="4"><img class="detail_img" border="0"
                                    src="${res.p_smallpic.s4}"
                                    ></a>
                            <div class="fr"></div>
                        </div>
                        `;

                        // 右边商品信息
                        let rightdetail = `
                    <div class="right_tit">${res.p_title}</div>
                    <div class="right_pay"><span>价格 :</span>
                       ${res.p_price}
                    </div>
                    <div class="right_select">
                        <span class="right_font_tit">数量：</span>
                        <input type="text" value="1" class="right_number" maxlength="${res.p_num}">
                        <div class="right_u_d">
                            <a href="javascript:void(0);" class="right_up"></a>
                            <a href="javascript:void(0);" class="right_down"></a>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <a href="javascript:tobuy(3949);" class="button_bar1 unsold btn_buy" name="for99clickToBuy">立即购买</a>
                    <a href="javascript:tocart(3949);" class="button_bar2 unsold btn_buy" name="for99clickToCar">加入购物车</a>
                    <a href="javascript:;" class="button_bar1" id="soldText" style="display:none"></a>
                    <div class="clear"></div>
                    <div class="fwcn_txt">服务承诺：官方正品&nbsp;&nbsp;&nbsp;免邮配送&nbsp;&nbsp;&nbsp;同城速递</div>
                    `;

                        //商品详情
                        let details = `
                        <div class="details_img">
                            <img src="${baseUrl}/src/img/${pic[i].p_detail}" alt="${pic[1].p_title}">
                        </div>`
                    // });
                    $('.details_num1_right').append(rightdetail);
                    callback && callback(res.id, res.price);
                    $('.div_details1').append(details);
                    $('.main_jewel').append(leftdetail);
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
                shop = JSON.parse(shop);
                if (shop.some(elm => elm.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product);
                }
            } else {
                shop = []; // 购物车没有内容 新建一个购物车
                shop.push(product); //将商品放入购物车
            }
            cookie.set('shop', JSON.stringify(shop), 1);
        }
    }
});