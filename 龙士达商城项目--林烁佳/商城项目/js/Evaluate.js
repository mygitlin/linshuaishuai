$(function () {
    btn();
    //评论详情
    $('.middle_bj4 img').click(function () {
        orderQuantity(this,'borderImg');
    });
    $('.running_left>ul>img ').click(function () {
        orderQuantity(this,'borderImg');
    });

    //给标题添加点击切换颜色效果
     $('.content_right_top1 li').click(function () {
            contentComment($(this));
      });
     $('.left_top li').click(function () {
        contentComment($(this));
     });

    // 评论详情中评论图片的缩放
    $('.content_right_top5_img img').click(function () {
         changimgbig($(this));
    });
    //放大镜
    $('.running_left  div').mouseenter(function (e) {
        createMagnifier($(this),e);
    });
    // contentComment();
    like();// 评论详情中评论图片的点赞

    //图片上下滚动
    var rightUlone=$(".running_right").children().clone(true);
    $(".running_right2").append(rightUlone);
    slide($(".wrap"),'top',501,$(".bntone"),$(".bnttwo"));

    //给图片加蒙版
    $(".left_picture img").mouseover(function () {
        createMask($(this),'rgba(120,180,200,.2)',"CommodityDetails.html");
    });
    $('.tail_picture ul li img').mouseover(function () {
        createMask($(this),'rgba(120,180,200,.2)',"CommodityDetails.html");
    });

    //翻页
    $("#pagination2").pagination({
        currentPage: 3,
        totalPage: 10,
        isShow: false,
        count: 6,
        prevPageText: "< 上一页",
        nextPageText: "下一页 >"
    });

});

// 评论详情中评论图片的点赞
function like() {
    var i=0;
    $('.like1').click(function () {
        // var index=$('.like1').length;
        console.log($(this).index());
        // var arry=[];
        i++;
        if(i%2==1){
            $('.like1 i').css('color','red');
            $('.like2').html('1');
        }
        else if(i%2==0){
            $('.like1 i').css('color','#cccccc');
            $('.like2').html('0');
        }
        console.log( $('.like2').length);
    });
}

//评论详情购物添加量
function btn() {
    var i=Number($('#input1').val());
    $('.btn1').click(function () {
        i++;
        $('#input1').val(i);
        $('.btn1').css({'color':'#fff','background':'#ff0036'}).siblings().css({'color':'#ccc','background':'#666'})
    });
    $('.btn2').click(function () {
        // var t=i;
        $('.btn2').css({'color':'#fff','background':'#ff0036'}).siblings().css({'color':'#ccc','background':'#666'});
        // t-=1;
        if(i>0){
            $('#input1').val(i -= 1);
        }
    })
}