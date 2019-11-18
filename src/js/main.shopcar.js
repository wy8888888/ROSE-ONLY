require.config({
    paths:{
        jquery:"./jquery.min",
        cookie:"./lib/cookie",
        shopcar:"./lib/shopcar"
    },
    shim:{}
});

require(['jquery','shopcar'],function($,shopcar){
    shopcar.render();
});