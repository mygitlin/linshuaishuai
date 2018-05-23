$(function () {
    $('.address input').click(function () {
        borderClass($(this));
        $(this).parent().find('p').css('display','block').parent().parent().siblings().find('p').css('display','none');
        $(this).parent().find('a').css('display','block').parent().siblings().find('a').css('display','none');

    });
    $('.address_button span').click(function () {
        location.href="ReceiptList.html"
    })

});
