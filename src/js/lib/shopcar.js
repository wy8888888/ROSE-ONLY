let baseUrl = "http://localhost:8080/rose-only.com";
define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function () {
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
                            <tr height="120" class="wg_cart_list" data-price="${elm.p_price}"  data-id="${elm.p_id}"
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
                        // callback && callback(res.p_id, res.p_price);//callback
                        // console.log(res.p_id, res.p_price);
                        // $('#cart_total').append(sumPrice);//添加商品总价
                        let cartNum = document.getElementById('cartNum');
                        let sum = shop.length;
                        cartNum.innerHTML = '(' + sum + ')';//购物车商品种类数量
                        // console.log(cartNum);



                        $(function () {
                            // console.log($('.wg_cart_list').length);
                            //商品总数量
                            function totalNum() {
                                let num1 = 0;
                                // $('.wg_cart_list').each(function (i) {
                                //     var num = $(this).find('.shopping_cart_sl').val();
                                //     num1 += Number(num);
                                //     $('.cart_totalNum').text(num1);
                                // })
                                // console.log(num1);
                            }

                            //checkbox
                            function checked() {
                                let checkedList = $(".ck_carno:checked");
                                console.log(checkedList);
                                let totalPrice = 0;
                                let num1 = 0;
                                $.each(checkedList, function (i, elm) {
                                    console.log(this);
                                    let sum1 = $(this).parent().parent().find('.td_sum').text();
                                    totalPrice += Number(sum1);
                                    let num = $(this).parent().parent().find('.shopping_cart_sl').val();
                                    num1 += Number(num);
                                    console.log(num1);
                                })
                                $('#cart_total').text(totalPrice);
                                $('.cart_totalNum').text(num1);
                            }
                            //选择商品
                            $('.ck_carno').on('click', function () {
                                checked();
                            });
                            //全选商品
                            $('#ck_all').on('click', function () {
                                checked();
                            });
                            //清空购物车
                            $('#cart_del_all').on('click', function () {
                                $('.wg_cart_list').remove();
                                console.log($('.wg_cart_list'));
                                // let shop = cookie.get('shop');
                                // shop = JSON.parse(shop);
                                // console.log(shop);
                                // shop=[];
                                // cookie.set('shop', JSON.stringify(shop), 1);
                            });

                            $('.cart_up').on('click', function () {
                                let num = $(this).parent().parent().find('.shopping_cart_sl').val();//商品数量
                                let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');//库存量
                                let price = $(this).parent().parent().find('.td_price').text();//商品单价  
                                let price1 = $(this).parent().parent().find('.td_sum').text();//商品小计
                                if (num < maxnum) {
                                    num = Number(num) + 1;
                                    $(this).parent().parent().find('.td_sum').text((Number(num) * Number(price)).toFixed(1));
                                }
                                else {
                                    num = maxnum;
                                    $(this).parent().parent().find('.td_sum').text((Number(maxnum) * Number(price)).toFixed(1));
                                }
                                $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                                checked();
                            });


                            $('.cart_down').on('click', function () {
                                let num = $(this).parent().parent().find('.shopping_cart_sl').val();//商品数量
                                let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');//库存量
                                let price = $(this).parent().parent().find('.td_price').text();//商品单价  
                                let price1 = $(this).parent().parent().find('.td_sum').text();//商品小计
                                if (num > 2) {
                                    num = Number(num) - 1;

                                    $(this).parent().parent().find('.td_sum').text((Number(num) * Number(price)).toFixed(1));
                                }
                                else {
                                    num = 1;
                                    $(this).parent().parent().find('.td_sum').text(price);//如果商品数量为1，则小计等于单价
                                }

                                $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                                checked();
                            });

                            $(function () {

                                let shop = cookie.get('shop');
                                shop = JSON.parse(shop);
                                // console.log(shop);

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
                                    $('.model_bg').fadeIn(300);
                                    $('.my_model').fadeIn(300);
                                    let dataid = 0;
                                    dataid = $(this).parent().parent().attr('data-id');
                                    console.log(dataid);
                                    $(this).parent().parent().remove();//删除行
                                    shop.forEach(function (elm, i) {
                                        // console.log(elm.id);
                                        if (elm.id == dataid) {
                                            // $(this).parent().parent().parent().remove();//删除行
                                            console.log($(this));
                                            shop.splice(i, 1);//删除shop的数据
                                        }
                                    })
                                    cookie.set('shop', JSON.stringify(shop), 1);
                                    console.log(shop);
                                })
                            })


                        })
                    }
                })
            }
        }

    }
});
// ${(arr[0].num*elm.p_price).toFixed(2)}  总价




// let totalPrice = $('#cart_total').val();//购物车总金额
// let totalNum = $('.cart_totalNum').text();//商品总数量
// let price = $(this).parent().parent().find('.td_price').text();//商品单价  
// let price1 = $(this).parent().parent().find('.td_sum').text();//商品小计
// $('.cart_totalNum').text(totalNum);
//                                 $('.wg_cart_list').each(function (i) {
//                                     var num = $(this).find('.shopping_cart_sl').val();
//                                     // console.log(num);
//                                     num1 += Number(num);
//                                     console.log(num);
//                                 })
//                                 $('.cart_totalNum').text(num1);
//                                 //商品小计

