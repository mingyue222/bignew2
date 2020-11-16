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
    var layer = layui.layer
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
        //给注册表单添加ajax数据请求
    $('#register').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/reguser',
                type: 'post',
                data: {
                    username: $('#register [name = username]').val(),
                    password: $('#register [name = password]').val()
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                            // return console.log(res.message);
                    }
                    layer.msg('注册成功')
                        // console.log('注册成功');
                    $('.link_login').click()
                }
            })
        })
        //给登陆表单添加ajax数据请求
    $('#login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                    //如果登陆成功了 服务器会返回我们一个token数据，将这个数据储存起来
                localStorage.setItem('token', res.token)
                    //登陆成功后我们 将页面跳转到主页
                location.href = '/index.html'
            }


        })
    })
})