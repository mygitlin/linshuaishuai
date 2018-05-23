$(function () {
    SmallTime();
    let navH = $(".main_hd2").offset().top;
    $(window).scroll(function(){
        let scroH = $(this).scrollTop();
        if(scroH>=navH){
            $(".main_hd2").css({"position":"fixed","top":0});
        }else if(scroH<navH){
            $(".main_hd2").css({"position":"static"});
        }
        if($(document).scrollTop()>400){
            $('.Gtop').css('display','block');
        }else {
            $('.Gtop').css('display','none');
        }
    })
    for(let i=6;i<18;i++){
        $('.main section').eq(i).css({'display':'none'});
        $('.main hr').eq(i).css({'display':'none'});
    }
    let index = 6
    $('.main_foot').on('click',function () {
        for(let i=index;i<index+6;i++){
            $('.main section').eq(i).css({'display':'block'});
            $('.main hr').eq(i).css({'display':'block'});
        }
        index+=6;
        if(index == 18){
            $('.main_foot span').text('没有了');
            $('.main_foot').off('click');
        }
    })
    $('.Gtop').on('click',function () {
        $(document).scrollTop('0');
    })
    $('.main_hd2 li:eq(0)').on('click',function () {
        $('.meishi').toggleClass('block');
    })
});
function SmallTime() {
    let i = 0;
    let height = parseInt($('.img_main').height());
    setInterval(function () {
        i++;
        if(i<5){
            $('.img_main').animate({'top': -i*height},500);
        }else {
            i=1;
            $('.img_main').css({'top':0}).animate({'top': -height},500);
        }
    },2500)
}