$(function () {
    $('.submit').mouseover(function () {
        $(this).css({background:"#8B008B"})
    });
    $('.submit').mouseout(function () {
        $(this).css({background:"#ff0000"})
    });

    //确认注册页面的资料是否被填写完成。
    regiSter($("#regSubit"),$("#userText"),"*请输入用户名",'#ff0000','#666');
    regiSter($("#regSubit"),$("#tel"),"*请输入常用的手机号码",'#ff0000','#666');
    regiSter($("#regSubit"),$("#vCation"),"*请输入正确的验证码",'#ff0000','#666');
    regiSter($("#regSubit"),$("#phone"),"*请点击获取手机验证输入",'#ff0000','#666');

    //判断密码和确认密码是否一致//确认密码不低于6位字符
    $('#regSubit').click(function () {
        objpassWord($('#passWord'),$('#confirmpassW'));
    });
    //手机验证倒计时60秒
    $('#btnBhone').click(function () {
        Count_down($('#btnBhone'));

    })
});