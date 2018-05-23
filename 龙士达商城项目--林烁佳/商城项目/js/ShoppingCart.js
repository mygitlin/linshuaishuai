$(function () {
    //我的购物车全选事件
    $('input[name="quanxuan"]').click(function () {
        inputSelect(this,$('input[type="checkbox"]'));
        $('input[name="check"]').click(function () {
            $('input[name="quanxuan"]').prop("checked",false);
        })
    });
    //点击复选框时，计算商品数量和总价格
    $('input[type="checkbox"]').click(function () {
        changeNumSum($('input[name="check"]'),$('.Subtotal span'),$('.commodity_input'));
    });
    //加减购买数量
    //减
    $('.decrease').click(function () {
        var i = $('.decrease').index(this);//每次点击$('.decrease')，获取下标并赋值给i;涉及删除后下标的重定向,不能省略
        jianShao($('.commodity_input'),i,0);//参数1：文本框的val减1，参数2是文本框的下标
        $('.Subtotal span').eq(i).text('￥'+getText($('.unit_price span'),i,1)*getVal($('.commodity_input'),i,0)+'.00');
        changeNumSum($('input[name="check"]'),$('.Subtotal span'),$('.commodity_input'));
    });
    //加
    $('.increase').click(function () {
        var i = $('.increase').index(this);//每次点击$('.decrease')，获取下标并赋值给i;涉及删除后下标的重定向,不能省略
        jia($('.commodity_input'),i,10);//参数1：文本框的val加1，参数2是文本框的下标，第三个是数量上限
        $('.Subtotal span').eq(i).text('￥'+getText($('.unit_price span'),i,1)*getVal($('.commodity_input'),i,0)+'.00');
        changeNumSum($('input[name="check"]'),$('.Subtotal span'),$('.commodity_input'));
    });
    //当鼠标移入图片时，动态生成一层蒙版，移出蒙版自动删除；
    $('.commodity_img img').mouseenter(function () {
        createMask($(this),'rgba(0,0,0,0.3)');//第一个参数是对象本身，第二个参数是蒙版颜色，第三个对象点击后链接的网址；
    });
    //点击删除时，删除自身的商品列，并重新计算选中商品的总数量和总价格
    $('.operation a:contains("删除")').click(function () {
        var i = $('.operation a:contains("删除")').index(this);
        $('.commodity').eq(i).remove();
        changeNumSum($('input[name="check"]'),$('.Subtotal span'),$('.commodity_input'));
    })
});
