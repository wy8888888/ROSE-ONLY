require.config({
    paths:{
        jquery:"./lib/jquery",
        index:"./lib/index",
        cookie:"./lib/cookie"
    },
    shim:{}
});

require(['jquery','index'],function($,index){
    index.render();
});