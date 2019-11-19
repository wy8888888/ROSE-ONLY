$(function () {
    var page = (function () {
        var p = 1;
        return {
            get: function () {
                return p;
            },
            plus: function () {
                p++;
                console.log(p);
            }
        }
    })();

    // 滚动事件 下拉到底部 加载数据
    // scroll resize
    $(window).on('scroll resize', function () {
        // 如何判断滚动条滚动到了底部
        // 滚动条底部的距离+滚动条滚动距离 == 文档的高度-窗口的高度
        // 滚动条滚动的距离+窗口的高度 == 文档的高度

        var windowHeight = $(window).height(); //窗口的高
        var scrollTop = $(window).scrollTop(); // 当前滚动的距离
        var docHeight = $(document).height(); //获得文档高度
        // console.log(windowHeight+scrollTop+200>docHeight);
        if (scrollTop + windowHeight + 400 == docHeight) {
            console.log(1);
            page.plus();
            getData();
        }
    });
    getData();
    function getData() {
        let baseUrl = "http://localhost:8080/rose-only.com";
        // 加载数据
        $.ajax({
            url: `http://localhost:8080/rose-only.com/lib/getallLst.php`,
            type: 'get',
            data: {
                page: page.get()
            },
            dataType: 'json',
            success: function (res) {
                // console.log(res);
                let temp = '';
                if (res.length) { // 只要有数据就加载数据
                    res.forEach(elm => {
                        title = elm.p_title;
                        title1 = title.slice(0, 4);
                        title2 = title.slice(7);
                        temp += `
                            <li class="item">
                            <a href="${baseUrl}/src/html/product.html?id=${elm.p_id}">
                                <div class="li_img">
                                    <img class="lazy"
                                        data-original="${baseUrl}/src/img/${elm.p_img}" alt="${elm.p_title}"
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
                } else {
                    $(window).off('scroll resize');
                }
            }
        })
    }
});
