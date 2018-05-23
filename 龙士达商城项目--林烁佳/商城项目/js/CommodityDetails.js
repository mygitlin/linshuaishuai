$(function () {
    $('.Running_Left div').mouseenter(function (e) {
        createMagnifier($(this),e);
    });

    $('.Running_Left ul li img').click(function () {
        changeSrc($(this),$('.Running_Left span img'),'src')
    });
    $('.Middle_bj4 li img').click(function () {
        changeBorderColor($('.Middle_bj4 li img'),$('.Middle_bj4 li img').index(this),'border-color','rgb(0,0,0)','rgb(204,204,204)');
    });
    $('.Middle_bj5 li div button').eq(0).click(function () {
        jia($('.Middle_bj5 li input'),0,4158);
    });
    $('.Middle_bj5 li div button').eq(1).click(function () {
        jianShao($('.Middle_bj5 li input'),0,0);
    });
    $('.Middle_bj6 a').eq(0).click(function () {
        judge($('.Middle_bj5 li input'),$(this),'Payment.html');
    });
    $('.Middle_bj6 a').eq(1).click(function () {
        judge($('.Middle_bj5 li input'),$(this),'ShoppingCart.html');
    });
    $('.Recommend_box1_img a img').mouseenter(function () {
        createMask($(this),'rgba(0,0,0,0.3)','#');
        console.log('move');
    });
    $('.hotCommodity_left_box1 a img').mouseenter(function () {
        createMask($(this),'rgba(0,0,0,0.3)','#');
    });
    $('.hotCommodity_left_h div').click(function () {
        changeBorderColor($('.hotCommodity_left_h div'),$('.hotCommodity_left_h div').index(this),'background','#e51e1e','#f7f7f7');
        changeBorderColor($('.hotCommodity_left_h div'),$('.hotCommodity_left_h div').index(this),'color','#fff','#666');
    });
    $('.hotCommodity_right_h a div').click(function () {
        changeBorderColor($('.hotCommodity_right_h a div'),$('.hotCommodity_right_h a div').index(this),'color','#fff','#666');
        changeBorderColor($('.hotCommodity_right_h a div'),$('.hotCommodity_right_h a div').index(this),'background','#e51e1e','#f7f7f7');
    });
    var rightUlone=$(".running_right").children().clone(true);
    $(".running_right2").append(rightUlone);
    slide($(".wrap"),'top',501,$(".bntone"),$(".bnttwo"));
});