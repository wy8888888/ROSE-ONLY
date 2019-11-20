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
                        let sumPrice='';
                        res.forEach(elm => {
                            console.log(elm);
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
                            <td><input type="checkbox" name="ck_carno" data-num="1" id="ck_carno${elm.p_id}" value="${elm.p_id}"
                                    checked="checked"> </td>
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
                            <td class="td_price_${elm.p_id}">${Number(elm.p_price).toFixed(1)}</td>
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
                            <td class="td_sum">${(arr[0].num*elm.p_price).toFixed(1)}</td>
                            <td><a href="javascript:" class="cart_del">删除</a></td>
                        </tr>
                        <script>
                            $(function () {
                                $('.cart_up').on('click', function () {
                                    let num = $(this).parent().parent().find('.shopping_cart_sl').val();
                                    let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');
                                    if (num < maxnum) num++;
                                    else num = maxnum;
                                    $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                                    console.log(num);
                                });
                                $('.cart_down').on('click', function () {
                                    let num = $(this).parent().parent().find('.shopping_cart_sl').val();
                                    let maxnum = $(this).parent().parent().find('.shopping_cart_sl').attr('maxlength');
                                    if (num > 1) num--;
                                    else num = 1;
                                    $(this).parent().parent().find('.shopping_cart_sl').val([num]);
                                    console.log(num);
                                });
                            })
                        </script>
                            `;
                            sumPrice=Number((arr[0].num*elm.p_price).toFixed(1));//商品总价

                            // console.log(sumPrice);
                        });
                        console.log(sumPrice);
                        $('.shopping_cart_title').after(tempstr);//购物车列表
                        $('#cart_total').append(sumPrice);
                        let cartNum = document.getElementById('cartNum');
                        let sum = shop.length;
                        cartNum.innerHTML = '(' + sum + ')';
                        // console.log(cartNum);
                    }
                });
            }
        }
    }
});
// ${(arr[0].num*elm.p_price).toFixed(2)}  总价