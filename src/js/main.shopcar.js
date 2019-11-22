require.config({
    paths:{
        jquery:"./lib/jquery.min",
        cookie:"./lib/cookie",
        shopcar:"./lib/shopcar"
    },
    shim:{}
});

require(['jquery','shopcar'],function($,shopcar){
    shopcar.render(function (id,price) {
        $('.cart_del').hover(function () {
            shopcar.del(id,price,$('.num').val());
        })
    });
});