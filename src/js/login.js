// $(function () {
    

// })
define(['jquery','md5'],function($,md5){
    return {
        reg:function(selector){
            inp = $('.register_nav>input');
    submit = $('registerSubmit');
    reminder = $('.reminder');

    reg = {
        "username": /^1[3-9]\d{9}$/,
        "password": /^\w{6,16}$/,
    };

    inp = Array.from(inp); //转换成数组
    inp.forEach((elm, i) => {
        elm.onkeyup = function () {
            // if(this.value==''){
            //     $(this .reminder).css("display","none");
            // }
            if (!reg[this.id].test(this.value)) {
                console.log('未通过');
                this.dataset.pass = false;
                $(this).nextAll(reminder).css("display","block");
                
            } else {
                console.log('通过验证');
                this.dataset.pass = true;
                $(this).nextAll(reminder).css("display","none");
                $('#prefixC').css("display","block");
            }
            check();
        }
    });

    function check() {
        allPass = $('.register_nav>input[data-pass="true"]');
        // console.log(allPass.length);
        if (allPass.length == 2) {
           //提交数据
           console.log('remove');
           $('#login-btn-submit').removeAttr('disabled');
           console.log('2');
        }
    }
        },
        loginEv:function(selector){
            $('#login-btn-submit').on('click',function(){
                $.ajax({
                    url:'http://127.0.0.1:8080/rose-only.com/lib/login.php',
                    type:'post',
                    dataType:'json',
                    data:{
                        username:$('#username').val(),
                        password:$.md5($('#password').val()),
                    },
                    success:function(res){
                        console.log(res);
                        alert(res.msg);
                        window.location.href = res.url;
                    },
                    error:function (error) {
                        console.error();
                    }
                    
                })
            });
        }
    }
})