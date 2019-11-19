//登录
//配置
require.config({
    paths:{ // 模块和路径
        jquery:"./lib/jquery.min",
        md5:"./jquery.md5",
        login:"./login"
    },
    shim:{
        md5:['jquery']
    }
});

require(['jquery','login'],function($,login){
    login.reg('.reg');
    login.loginEv('.login');
})