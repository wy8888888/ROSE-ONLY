let baseUrl = "http://localhost:8080/rose-only.com";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function () {
            $.ajax({
                url: `${baseUrl}/lib/getall.php`,
                type: 'get',
                dataType: 'json',
                success: function (res) {
                    // console.log(res);
                    let temp = '';
                    res.forEach(elm => {
                        title = elm.p_title;
                        title1 = title.slice(0, 4);
                        title2 = title.slice(7);
                        temp += `
                            <li class="item">
                            <a href="${baseUrl}/src/html/product.html?id=${elm.p_id}">
                                <div class="li_img">
                                    <img class="lazy" data-original="${baseUrl}/src/img/${elm.p_img}" width="260" height="260" alt="${elm.p_title}"
                                        src="${baseUrl}/src/img/${elm.p_img}" alt="${elm.p_title}"
                                        style="display: inline;">
                                </div>
                                <b class="f14">鲜花玫瑰 - ${title1}系列</b>
                                <p class="f12">${title2}</p>
                                <b class="f14">￥${elm.p_price}</b>
                            </a>
                        </li>`
                    });
                    $('#productList').append(temp);
                }
            })
        }
    }
    render();
});


