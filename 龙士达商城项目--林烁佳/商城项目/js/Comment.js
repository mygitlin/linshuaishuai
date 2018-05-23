$(function () {
    //评论详情商品图片蒙版链接
    $('.evaluate_img img').mouseenter(function () {
        createMask($(this),'rgba(0,0,0,0.3)','Evaluate.html');
    });
    //宝贝与描述符合 和 物流服务的质量 的星级评定。
    $('.star_level span').each(function (index) {
        $('.star_level span:nth-child('+(index+1)+') img').mouseenter(function () {
            changeStarColor({
                obj : $('.star_level span:nth-child('+(index+1)+') img'),
                index : $(this).index(),
                attr : 'src',
                new1 : 'image/评论页/xinxinred.jpg',
                new2 : 'image/评论页/xinxin.jpg'
            })
        });
        //当点击确定星级时，解除鼠标移入事件
        $('.star_level span:nth-child('+(index+1)+') img').click(function () {
            relieveBind($('.star_level span:nth-child('+(index+1)+') img'),'mouseenter');
        })
    });
    //买家印象，点击改变背景颜色，轮回切换
    $('.impression span').click(function () {
        toggerClsaa($(this),'redBorder');
    });
    //提交评论按钮
    $('#cen_btn').click(function () {
        testsVal($('#evaluate'),$('#cen_btn'),'HomePage.html',15);
    })
});