$(function () {
    $('.shopcontent a li img').each(function (i) {
        $('.shopcontent a li img').eq(i).mouseenter(function () {
            createMask($('.shopcontent a li img').eq($('.shopcontent a li img').index(this)),'rgba(0,0,0,0.3)','CommodityDetails.html')
        })
    });
    $('.brand_selection2_left li').click(function () {
        changeBorderColor($('.brand_selection2_left li'),$('.brand_selection2_left li').index(this),'color','#fff','#666');
        changeBorderColor($('.brand_selection2_left li i'),$('.brand_selection2_left li').index(this),'color','#fff','#666');
        changeBorderColor($('.brand_selection2_left li'),$('.brand_selection2_left li').index(this),'background','#e51e1e','#f7f7f7');
    });
    $('.FlipRight').click(function () {
        if($('.number2').text() > 0){
            $('.FlipLeft').css('background','#fff')
        }
        changeSpanTextjia($('.number2'),100);
    });
    $('.FlipLeft').click(function () {
        if($('.number2').text() < 3){
            $('.FlipLeft').css('background','#f1f1f1')
        }
        changeSpanTextjian($('.number2'),0);
    });
    $('.Page_Jump_1 ul li').click(function () {
        clickPageJump($('#bdback a'),$(this).children(),'class','acolor');
        clickPageJump($('#bdback'),$(this),'id','bdback');
    });
    $('.Page_Jump_1 button').eq(0).click(function () {
        clickPageJump2({index : $('#bdback').index()-1,obj1 : $('#bdback a'), obj2 : $('.Page_Jump_1 ul li a'), lie : 'class', zhi : 'acolor'});
        clickPageJump2({index : $('#bdback').index()-1,obj1 : $('#bdback'), obj2 : $('.Page_Jump_1 ul li'), lie : 'id', zhi : 'bdback'});
    });
    $('.Page_Jump_1 button').eq(1).click(function () {
        if($('#bdback').index()<6){
            clickPageJump2({index : $('#bdback').index()+1, obj1 : $('#bdback a'), obj2 : $('.Page_Jump_1 ul li a'), lie : 'class', zhi : 'acolor'});
            clickPageJump2({index : $('#bdback').index()+1, obj1 : $('#bdback'), obj2 : $('.Page_Jump_1 ul li'), lie : 'id', zhi : 'bdback'});
        }
    });
    $('.Page_Jump_1 button').eq(2).click(function () {
        var i1 = getVal($('.jump'),0,0);
        clickPageJump($('#bdback a'),$('.Page_Jump_1 ul li a').eq(i1-1),'class','acolor');
        clickPageJump($('#bdback'),$('.Page_Jump_1 ul li').eq(i1-1),'id','bdback');
    });
    $('.guess_like_box a div img').mouseover(function () {
        var i = $('.guess_like_box a div img').index(this);
        createMask($('.guess_like_box a div img').eq(i),'rgba(0,0,0,0.3)','CommodityDetails.html')
    })
});