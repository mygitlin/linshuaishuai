$(function () {
    $('.m_left1').on('click','.More',function () {
        $('.m_left1').addClass('hidden');
        setTimeout(function () {
            $('.m_left2').addClass('active');
        },10)
        $('.m_left2').css({'display':'block'});
    });
    $('.m_left2').on('click','.More',function () {
        $('.m_left1').removeClass('hidden');
        $('.m_left2').removeClass('active').css({'display':'none'});
    });
    $('.gun_right').on('click',function () {
        $('.gun_img ul').animate({'left':-250},300)
        $(this).hide();
        $('.gun_left').show()
    }).mouseover(function () {
        $(this).animate({'right':20},200)
    }).mouseout(function () {
        $(this).animate({'right':30},200)
    });
    $('.gun_left').on('click',function () {
        $('.gun_img ul').animate({'left':0},300)
        $(this).hide();
        $('.gun_right').show()
    }).mouseover(function () {
        $(this).animate({'left':20},200)
    }).mouseout(function () {
        $(this).animate({'left':30},200)
    });
    $('.more').on('click',function () {
        setTimeout(function () {
            $('.m_left2').addClass('active');
        },10)
        $('.m_left2').css({'display':'block'});
    })

});