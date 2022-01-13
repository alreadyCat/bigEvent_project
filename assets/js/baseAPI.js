//每次调用ajax，get，post请求都会先调用这个函数

$.ajaxPrefilter(function(options){
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})