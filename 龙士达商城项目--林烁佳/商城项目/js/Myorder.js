$(function () {
    //点击出现红框和文字效果
    $('.nveBox ul li').click(function () {
        effect($(this));
    });
    //点击弹出confirm()判断是否删除;若是删除,若否不删除
    Confirm($('.small span a'),"确认取消订单码？");
});