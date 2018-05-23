$(function () {
    $('.payment_img>li>input').click(function () {
        changcolor($(this));
    });
    $('.payment_img2>li>input').click(function () {
        changcolor($(this));
    });
});
//
function changcolor(obj) {
    obj.parent().css('border-color','red').siblings().css('border-color','#ccc');
}
