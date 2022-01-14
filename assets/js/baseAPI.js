//每次调用ajax，get，post请求都会先调用这个函数

$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    
    //访问/my的api  全部配置headers 
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
        
    }
    
    //全局统一挂载
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            location.removeItem('token')
            location.href = '/login.html'
        }
    }
})