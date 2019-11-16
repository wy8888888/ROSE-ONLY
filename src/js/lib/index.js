let baseUrl = "http://localhost:8080/1910/day36/shopcar";

define(['jquery'],function($){
    return {
        render:function(){
            $.ajax({
                url:`${baseUrl}/lib/getall.php`,
                type:'get',
                dataType:'json',
                success:function(res){
                    console.log(res);
                    let temp = '';
                    res.forEach(elm=>{
                        let pic = JSON.parse(elm.pic);
                        console.log(pic);
                        temp+=`
                            <li class="item">
                                <a href="${baseUrl}/src/html/product.html?id=${elm.id}">
                                    <div class="p-pic">
                                        <img src="${baseUrl}/src/${pic[0].src}" alt="${pic[0].title}">
                                    </div>
                                    <div class="p-title">
                                        ${elm.title}
                                    </div>
                                    <div class="p-price">
                                        <span class="yuan">￥</span>${elm.price}
                                    </div>
                                </a>
                            </li>`;
                    });
                    $('.list').append(temp);
                }
            })
        }
    }
});