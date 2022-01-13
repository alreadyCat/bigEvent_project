
$(function(){

    //去登录|去注册
    $('#gotoReg').on('click',function(){
        $('.login').hide()
        $('.reg').show()
    })
    $('#gotoLogin').on('click',function(){
        $('.reg').hide()
        $('.login').show()
    })
    

    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过form.verify()函数自定义校验规则 
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pw = document.querySelector('.reg [name="password"]').value
            if(value !== pw){
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单提交请求
    $('#form-reg').on('submit',function(e){
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form-reg [name="username"]').val(),password:$('#form-reg [name="username"]').val()},function(res){
            if(res.status !== 0){
                return layer.msg(res.message);
            }

            layer.msg('注册成功,请登录')
            //跳转到登录
            $('#gotoLogin').click()
        })
    })

    //监听登录表单提交请求
    $('#form-login').on('submit',function(e){
        e.preventDefault()
        $.post('/api/login',{username:$('#form-login [name="username"]').val(),password:$('#form-login [name="password"]').val()},function(res){
            if(res.status !== 0){
                console.log(res.message);
                return layer.msg(res.message)
            }

            layer.msg('登录成功')
            // console.log(res.token);
            // 存token
            localStorage.setItem('token',res.token)
            location.href = '/index.html'
        })
    })
})