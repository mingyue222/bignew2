$(function() {
    $('.link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('.link_login').on('click', function() {

        $('.reg_box').hide()
        $('.login_box').show()
    })
    var form = layui.form

    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            var psd = $('.reg_box [name=password]').val()
            if (psd !== value) {
                return '两次密码不一样'
            }
        }
    })
})