let baseUrl = "http://localhost:8080/rose-only.com";
define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let shop = cookie.get('shop');
            if (shop) {
                shop = JSON.parse(shop);
                let idList = shop.map(elm => elm.id).join(); //取id并且用,连接
                $.ajax({
                    url: `${baseUrl}/lib/shop.php`,
                    type: 'get',
                    data: {
                        idlist: idList
                    },
                    dataType: 'json',
                    success: function (res) {
                        // console.log(res);
                        let tempstr = '';
                        // let sumPrice = '';
                        res.forEach(elm => {
                            // console.log(elm);
                            // let pic = JSON.parse(elm.img);
                            let arr = shop.filter((val, i) => {
                                // 从购物车cookie数据中取出于本条遍历数据相同id的元素
                                return val.id == elm.p_id;
                            });

                            // sumPrice=Number(arr[0].num)*Number(elm.p_price).toFixed(1);
                            // console.log(sumPrice);

                            tempstr += `
                            <tr height="120" class="wg_cart_list" data-price="${elm.p_price}" id="cart_tr_${elm.p_id}" data-id="${elm.p_id}"
                            data-maxnum="40">
                            <td><input type="checkbox" name="ck_carno"  class="ck_carno" data-num="1" id="ck_carno${elm.p_id}" value="${elm.p_id}"> </td>
                            <td>
                                roseonly</td>
                            <td>
                                <img src="${baseUrl}/src/img/${elm.p_img}"
                                    class="shopping_cart_img" alt="产品图" style="cursor:pointer;"
                                    onclick="window.open('${baseUrl}src/html/product.html?id=${elm.p_id}')">
                                <div class="shopping_cart_name">
                                    <label for="ck_carno${elm.p_id}">
                                        ${elm.p_title}</label>
                                </div>
                            </td>
                            <td class="td_price">${Number(elm.p_price).toFixed(1)}</td>
                            <td>
                                <a href="javascript:" class="cart_down"><img border="0" class="jia_jian" alt=""
                                        src="../img/index/cart02.png"></a>
                            </td>
                            <td>
                                <input type="text" value="${arr[0].num}" id="cart_count_${elm.p_id}" maxlength="${elm.p_num}" data-num="40"
                                    class="shopping_cart_sl">
                            </td>
                            <td align="right"><a href="javascript:void(0);" class="cart_up"><img border="0"
                                        class="jia_jian" alt=""
                                        src="../img/index/cart03.png"></a>
                            </td>
                            <td class="td_sum">${(arr[0].num * elm.p_price).toFixed(1)}</td>
                            <td><a href="javascript:" class="cart_del">删除</a></td>
                        </tr>
                        // <script>
                        //     $(function () {
                        //         $('.cart_up').on('click', function () {
                        //             let num = $(this).parent().parent().find('.shopping_cart_sl').val();
                        //             let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');
                        //             if (num < maxnum) num++;
                        //             else num = maxnum;
                        //             $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                        //             console.log(num);
                        //         });
                        //         $('.cart_down').on('click', function () {
                        //             let num = $(this).parent().parent().find('.shopping_cart_sl').val();
                        //             let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');
                        //             if (num > 1) num--;
                        //             else num = 1;
                        //             $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                        //             console.log(num);
                        //         });
                        //     })
                        // </script>
                            `;
                            // sumPrice = Number((arr[0].num * elm.p_price).toFixed(1));//商品总价
                            // console.log(sumPrice);
                        });

                        // console.log(sumPrice);
                        $('.shopping_cart_title').after(tempstr);//添加购物车列表
                        callback && callback(res.p_id, res.p_price);//callback
                        // console.log(res.p_id, res.p_price);
                        // $('#cart_total').append(sumPrice);//添加商品总价
                        let cartNum = document.getElementById('cartNum');
                        let sum = shop.length;
                        cartNum.innerHTML = '(' + sum + ')';//购物车商品种类数量
                        // console.log(cartNum);

                        $(function () {
                            // console.log($('.wg_cart_list').length);
                            let num1 = 0;
                            let price = 0;
                            $('.wg_cart_list').each(function (i) {
                                var num = $(this).find('.shopping_cart_sl').val();
                                num1 += Number(num);
                                price = $(this).find('.td_price').val();
                                // console.log(price);
                            })
                            // console.log(num1);

                            $('.cart_totalNum').text(num1);//商品总数量


                            $('.cart_up').on('click', function () {
                                let num = $(this).parent().parent().find('.shopping_cart_sl').val();//商品数量
                                let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');//库存量
                                let totalPrice = $('#cart_total').val();//购物车总金额
                                // let totalNum = $('.cart_totalNum').text();//商品总数量
                                let price = $(this).parent().parent().find('.td_price').text();//商品单价  
                                let price1 = $(this).parent().parent().find('.td_sum').text();//商品小计
                                // console.log((price1));
                                // console.log(totalNum);
                                if (num < maxnum) {
                                    num = Number(num) + 1;
                                    num1++;
                                    // $('.cart_totalNum').text(totalNum);
                                    $('.cart_totalNum').text(num1);
                                    // console.log(totalNum);
                                    //商品小计
                                    // console.log(num);
                                    $(this).parent().parent().find('.td_sum').text((Number(num) * Number(price)).toFixed(1));
                                    // console.log(totalNum);

                                }
                                else {
                                    num = maxnum;
                                    $(this).parent().parent().find('.td_sum').text((Number(maxnum) * Number(price)).toFixed(1));
                                }
                                $(this).parent().parent().find('.shopping_cart_sl').val([num]);

                                // $('.cart_totalNum').text(totalNum);
                                // $('.wg_cart_list').each(function (i) {
                                //     var num=$(this).find('.shopping_cart_sl').val();
                                //     // console.log(num);
                                //     num1+=Number(num);
                                //     console.log(num);
                                // })
                                // $('.cart_totalNum').text(num1);
                                //商品小计



                            });
                            $('.cart_down').on('click', function () {
                                let num = $(this).parent().parent().find('.shopping_cart_sl').val();//商品数量
                                let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');//库存量
                                let totalPrice = $('#cart_total').val();//购物车总金额
                                // let totalNum = $('.cart_totalNum').text();//商品总数量
                                let price = $(this).parent().parent().find('.td_price').text();//商品单价  
                                let price1 = $(this).parent().parent().find('.td_sum').text();//商品小计
                                // console.log((price1));
                                if (num > 2) {
                                    num = Number(num) - 1;
                                    num1--;
                                    if (num1 <= 0) {
                                        num1 = 0
                                        console.log('商品总数为0');
                                    }
                                    // $('.cart_totalNum').text(totalNum);
                                    $('.cart_totalNum').text(num1);
                                    //商品小计价格
                                    $(this).parent().parent().find('.td_sum').text((Number(num) * Number(price)).toFixed(1));
                                }
                                else {
                                    num = 1;
                                    $(this).parent().parent().find('.td_sum').text(price);//如果商品数量为1，则小计等于单价
                                }

                                $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                                // $('.cart_totalNum').text(totalNum);
                                // $('.wg_cart_list').each(function (i) {
                                //     var num=$(this).find('.shopping_cart_sl').val();
                                //     num1+=Number(num);
                                // })
                                // $('.cart_totalNum').text(num1);
                            });
                        })
                    }
                })
            }
        },
        del: function (id, price, num) {
            let shop = cookie.get('shop');
            shop = JSON.parse(shop);
            let product = {
                id: id,
                price: price,
                num: num
            };
            $('.cart_del').on('click', function () {
                console.log(1);
                $('.model_bg').fadeIn(300);
                $('.my_model').fadeIn(300);
                
            });
            //关闭模态框
            $('.closeModel').click(function () {
                    closeM();
                });
                $('.dialog-close').click(function () {
                    closeM();
                });
                function closeM() {
                    $('.model_bg').fadeOut(300);
                    $('.my_model').fadeOut(300);
                }
                //确定按钮，移除商品
                $('.dialog-sure').click(function () {
                    
                    closeM();

                })
            $('.cart_del').on('click', function () {
                let did = 0;
                dataid = $(this).parent().parent().attr('data-id');
                $.each(shop, function (i, elm) {
                    console.log(elm.id);
                    console.log('i'+i);
                    if (elm.id == dataid) {
                        // console.log(elm.id);
                        $(this).parent().parent().remove();
                        // alert('删除成功！');
                        var s= shop.filter((p) => {    //返回一个数组
                            return p.id == dataid;
                        });
                        var index = shop.indexOf(s[0]);    //获取对象的下标
                        console.log('下标：'+index);
                        if (index > -1) {
                            shop.splice(index, 1);
                            console.log(shop);
                        }
                    }
                    // console.log(shop);

                })
            })
            // shop.forEach(elm => {
            //     elm.id == id ? elm.num = Number(num)+Number(elm.num) : null;
            //     console.log(shop);
            // });
            // console.log(this);
            // console.log('删除');
        }
    }
});
// ${(arr[0].num*elm.p_price).toFixed(2)}  总价


