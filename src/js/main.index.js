require.config({
    paths:{
        jquery:"./lib/jquery",
        index:"./lib/index",
        cookie:"./lib/cookie",
        lazy:"./lib/jquery.lazyload",
        lazyloding:"./lazyloding"
    },
    shim:{
        lazy:['jquery'],
        lazyloding:['jquery']
    }
});

require(['jquery','index'],function($,index){
    index.render();
});