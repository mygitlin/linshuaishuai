$(function () {
    //大轮播图
    $(".picBox div").eq(0).show().siblings().hide();
//调用时间定时器方法
    getTimer($(".picBox div"),$(".tag"),2000,'bg');
    ouli($(".lis"),$(".picBox div"),$(".tag"),2000,'bg');

    // 小轮播方法
    Carousel($(".bigPic_ul img"),2000,0);
    Carousel($(".bannerPic1 img"),2000,2);
    Carousel($(".recomWidth2 img"),2000,3);
    Carousel($(".bannerPic img"),2000,1);

    //超链接
    $('.picBox div').click(function () {
        location.href="Evaluate.html";
    });
    $('.hotRight1 img').click(function () {
        location.href="Evaluate.html";
    });
    $('.hotRight2 img').click(function () {
        location.href="Evaluate.html";
    });
    $('#logo img').click(function () {
        location.href="HomePage.html";
    });
    $('#dropDown dd').click(function () {
        location.href="ProductList.html";
    });
    $('.picImg1 img').click(function () {
        location.href="Evaluate.html";
    });
    $('.bigPic img').click(function () {
        location.href="Evaluate.html";
    });

    //下拉菜单
    $('.hd_cen2 span').click(function (event) {
        $('#dropDown').slideDown(1000);
        event.stopPropagation();
    });
    $(document.documentElement).click(function () {
        $('#dropDown').css({display:"none"});
    });

    //动态生成蒙版
    // createMask(obj,color,oHref);
    $(".newSpot img").mouseenter(function(){
        createMask($(this),'rgba(178,181,135,.2)',"Evaluate.html");
    });
    $(".recomMend img").mouseenter(function(){
        createMask($(this),'rgba(178,181,135,.2)',"Evaluate.html");
    });
    $(".sellingBox img").mouseenter(function(){
        createMask($(this),'rgba(70,180,170,.2)',"Evaluate.html");
    });
    $(".hotBox img").mouseenter(function(){
        createMask($(this),'rgba(70,180,70,.2)',"Evaluate.html");
    });
    // $(".smallPic2 img").mouseenter(function(){
    //     createMask($(this),'rgba(70,180,70,.2)',"Evaluate.html");
    // });
    // $(".hotLeft1 img").mouseenter(function(){
    //     createMask($(this),'rgba(70,180,70,.2)',"Evaluate.html");
    // });

});