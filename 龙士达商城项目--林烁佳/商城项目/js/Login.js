$(function () {
    $('.submit').mouseover(function () {
        $(this).css({background:"#8B008B"})
    });
    $('.submit').mouseout(function () {
        $(this).css({background:"#ff0000"})
    });
//登录效果
    Login($('#loGin'),$("#userBox"),$("#passWord"));
//转换扫码效果
    Scan_code($('.Scan'),$('.account'),$('.input_User'),$('#scan_Code'));
});
