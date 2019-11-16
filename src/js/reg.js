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
            if (!ref[this.id].test(this.value)) {
                reminder[i].innerHTML = "未通过验证！";
                reminder[i].style.color = "red";
                this.dataset.pass = false;
            }else{
                // reminder[i].innerHTML = "未通过验证！";
                // reminder[i].style.color = "red";
                this.dataset.pass = true;
            }
        }
    });
    function check() {
        var allPass = document.querySelectorAll('.register_nav>input[data-pass="true"]');
        if (allPass.length == 2&&ck_agres[checked="checked"]) {
            submit.removeAttribute('disabled');
        }
    }

})()