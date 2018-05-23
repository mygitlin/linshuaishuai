$(function () {
    $('.new_address button').click(function () {
        $(".new_address_text").eq(0).after($(".new_address_text").eq(0).clone(true));
        $(".new_address_text").eq($(".new_address_text").length-1).find('dd').text('');
    });
    $('.bianji').click(function () {
        var obj1 = $(".new_address_text").eq($(".new_address_text").length-1);
        obj1.find('dd').css('display','none')
        obj1.find('input').toggleClass('none');
        $(this).text('确定');
        $('.text1').val($('.dd1').text());
        $('.text2').val($('.dd2').text());
        $('.text3').val($('.dd3').text());
        $('.text4').val($('.dd4').text());
        $('.text5').val($('.dd5').text());
        $('.text6').val($('.dd6').text());
        $('.text7').val($('.dd7').text());
        $('.text8').val($('.dd8').text());
        $('.dd1').text($('.text1').val());
        $('.dd2').text($('.text2').val());
        $('.dd3').text($('.text3').val());
        $('.dd4').text($('.text4').val());
        $('.dd5').text($('.text5').val());
        $('.dd6').text($('.text6').val());
        $('.dd7').text($('.text7').val());
        $('.dd8').text($('.text8').val());
    })
});