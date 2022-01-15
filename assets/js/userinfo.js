$(function(){
    initUserInfo()

    //自定义表单验证规则
    var form = layui.form
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '昵称长度在1 ~ 6个字符之间'
            }
        }
    })

    //重置表单
    $('#reset-form').on('click',function(e){
        e.preventDefault()
        initUserInfo()        
    })

    //监听修改信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                initUserInfo()
                layer.msg('更新用户信息成功！')
                
                //子页面调父页面的内容  ---iframe调用父级
                window.parent.getUserInfo()
            }
        })
    })
})

//初始化用户基本信息
function initUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        success:function(res){
            if(res.status !== 0){
                return layer.msg(res.data.message)
            }
            // $('.layui-input[name="username"]').val(res.data.username)
            //调用form.val快速赋值
            layui.form.val('userInfo-form',res.data)
        }
    })
}


//
