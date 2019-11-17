(function () {
    var inp = document.querySelectorAll('.register_nav>input');
    var submit = document.querySelector('.register_button')
    var username = document.getElementById('username');
    var password = document.getElementById('password');
    var prefixC = document.getElementById('prefixC');
    var agres = document.getElementById('ck_agres');
    var reminder = document.getElementsByClassName('reminder');

    var reg = {
        "username": /^1[3-9]\d{9}$/,
        "password": /^\w{6,16}$/
    }
    inp = Array.from(inp);
    inp.forEach((elm, i) => {
        elm.onkeyup = function () {
            if (!reg[this.id].test(this.value)) {
                // reminder[i].innerHTML = "未通过验证！";
                // reminder[i].style.color = "red";
                this.dataset.pass = false;
                console.log("未通过验证！")
            }else{
                // reminder[i].innerHTML = "通过验证！";
                // reminder[i].style.color = "green";
                this.dataset.pass = true;
                console.log("通过验证！")
            }
        }
    });
    function check() {
        var allPass = document.querySelectorAll('.register_nav>input[data-pass="true"]');
        if (allPass.length == 2) {
            submit.removeAttribute('disabled');
        }
    }

})()

define(['jquery','md5'],function($,md5){
    return {
        regEv:function(selector){
            // console.log($.md5($('#password').val()));
            $(selector).on('click',function(){
                $.ajax({
                    url:'http://localhost:8080/roseonly/lib/reg.php',
                    type:'post',
                    data:{
                        username:$('#username').val(),
                        password:$.md5($('#password').val()),
                    },
                    success:function(res){
                        console.log(res);
                    }
                })
            });
        }
    }
})