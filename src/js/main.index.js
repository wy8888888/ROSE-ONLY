require.config({
    paths:{
        jquery:"./lib/jquery",
        index:"./lib/index"
    },
    shim:{}
});

require(['jquery','index'],function($,index){
    index.render();
});