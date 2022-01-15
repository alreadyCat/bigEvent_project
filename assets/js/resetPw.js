$(function(){
    var form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位'],
        samePwd:function(value){
            if($('input[name="newPwd"]').val() !== value){
                return '两次密码必须一致'
            }
        },
        newOldPw:function(value){
            if($('input[name="oldPwd"]').val() === value){
                return '新密码与旧密码相同'
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('出现未知错误')
                }
                layer.msg('修改密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})