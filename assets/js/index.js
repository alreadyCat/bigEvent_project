
$(function(){
    getUserInfo()
})

//用户信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        }
    })
}

//渲染头像
function renderAvatar(user){
    var name = user.nickname || user.username

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(user.user_pic != null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name.slice(0,1).toUpperCase()).show()
    }
}

//退出登录
$('#logout').on('click',function(){
    layui.layer.confirm('确认退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href="/login.html"

        
        //关闭confirm询问框
        layer.close(index);
      });
})
