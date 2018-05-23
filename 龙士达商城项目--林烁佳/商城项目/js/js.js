$(function () {

   $('.Running_Left span').mouseenter(function (e) {
       createMagnifier($(this),e);
   });
   $('.Running_Left ul li img').click(function () {
       changeSrc($(this))
   })

});

//点击弹出confirm()判断是否删除;若是删除,若否不删除
function Confirm(obj,text) {
    obj.click(function () {
        var com;
        com=confirm(text);
        if(com==true){
            $(this).parent().parent().parent().parent().remove();
        }
    });
}
//点击出现红框和文字效果
function effect(obj) {
    obj.css({borderBottom:"2px solid #ff0000"}).siblings().css({borderBottom:"1px solid #9f9f9f"});
    obj.children('a').css({color:"#ff0000"}).parent().siblings().children('a').css({color:"#666666"});
}
//确认收货
//移除模块
function receipt(obj,text) {
    obj.empty();
    alert(text);
}
//banner的单独的轮播
var timer;
var iTwo = 0;   //obj是图片对象 oem是一个数字 oli是包住oem的对象 speed是时间停留的速度
function ouli(oli,obj,oem,speed,styleColor) { //鼠标移上数字的事件
    oli.hover(function() {
        iTwo = oli.index($(this));    //通过相应的列表下标找到对应的图片
        show(obj,oem,styleColor);             //调用显示方法
        clearInterval(timer);      //清除时间定时器
    }, function() {
        getTimer(obj,oem,speed,styleColor);   //获取到新的图片下标后重新绑定时间定时器
    });

    obj.hover(function () {
        clearInterval(timer);
    },function () {
        getTimer(obj,oem,speed,styleColor);
    })
}
//设置时间定时器，时间设置为4执行一次
function getTimer(obj,oem,speed,styleColor) {
    timer = setInterval(function() {
        iTwo++;             //执行下一张图片
        if (iTwo == obj.length) {//如果播放到最后一张，就调回第一张，循环播放
            iTwo = 0;
        }
        show(obj,oem,styleColor);
    }, speed);
}
//轮播图的循环显示方法
function show(obj,oem,styleColor) {
    //显示图片
    obj.eq(iTwo).show().siblings().hide();
    oem.parent().eq(iTwo).children().addClass(styleColor).parent().siblings().children().removeClass(styleColor);
}


//其他小轮播方法
var timerArr = [];
var index = 0;
//obj是对象,speed是停留的时间,index获取下标
function Carousel(obj,speed,index) {
    obj.first().show().siblings().hide();
    timerArr[index] = flashing(obj,speed);
}
//轮播的功能
function flashing(obj1,speed) {//obj是对象,speed是停留的时间
    var iOne = 0;
    var timer1;
    timer1 = setInterval(function(){
        iOne++;//执行下一张图片
        if (iOne == obj1.length) { //如果播放到最后一张，就调回第一张，循环播放
            iOne = 0;
        }
        obj1.eq(iOne).show().siblings().hide();
        hover(obj1,timer1,speed);
    }, speed);
    return timer1;
}
//当鼠标已经图片上清楚定时器，离开启动定时器
function hover(obj1,timer1,speed) {
    obj1.mouseover(function () {
        clearInterval(timer1);
        obj1.css({cursor:"pointer"});
    });
    obj1.mouseout(function () {
        flashing(obj1,speed)
    })
}
//图片滑动方法,控制方向滑动
var timerThree='';//设置一个滑动的定时器
var $left;//速度
var scroll;//obj是包住ul盒子，arr是obj的属性值，num是移动的像素，obc是最外层显示可视的大小的盒子,but1和but2是控制对象滑动的方向
function slide(obj,arr,num,but1,but2) {
    $left=parseInt(obj.css(arr));//获取.box的left值
    scroll=function(){
        $left-=1;//设置滚动速度
        obj.css(arr,$left+'px');
        if($left<-num){
            obj.css(arr);
            $left=0;}//当对象值小于属性值，重置.box 属性值为0；
        timerThree =setTimeout(scroll);
    };
    but1.click(function () {
        scroll=function() {
            $left -= 1;//设置滚动速度
            obj.css(arr, $left + 'px');
            if ($left < -num) {
                obj.css(arr);
                $left = 0;}//当对象值小于属性值，重置.box 属性值为0；
            timerThree = setTimeout(scroll);
        };
    });
    but2.click(function () {
        scroll=function() {
            $left += 1;//设置滚动速度
            obj.css(arr, $left+ 'px');
            if ($left ==0) {
                obj.css(arr);
                $left =-num;}//当对象值等于0，重置.box 属性值为-num；
            timerThree = setTimeout(scroll);
        }
    });
    setTimeout(scroll);
    obj.hover(function(){
        clearTimeout(timerThree);
    },function(){
        setTimeout(scroll);
    });
}

//登录页面效果
function Login(button,obj1,obj2) {//button是按钮对象,obj1是作为判断对象1，obj2是判断对象2
    button.click(function () {
        if(obj1.val()==""||obj2.val()==""){//当对象1或对象2的val为“null”时
            obj1.val("用户名或密码不能为空");//对象1出现这个文字，颜色为红色
            obj1.css({color:"#ff0000"});
            obj1.click(function () {
                if(obj1.val("用户名或密码不能为空")){//单对象1有触发过上面的事件时若相等，再次点击时回复原来的形式
                    obj1.val("");
                    obj1.css({color:"#666666"})
                }
            });
            return false;
        }
    });
}
//用户转换扫码登录
//obj1和obj2是被点击的对象,left1和right2是被先显示或被隐藏的对象
function Scan_code(obj1,obj2,left1,right2) {
    obj1.click(function () {
        $(this).css({background:"#333333",color:"#fff"});//obj1对象被点击改背景颜色和文本颜色
        obj2.css({background:"#dcdcdc",color:"#333333"});//obj2对象被点击改背景颜色和文本颜色
        left1.css({display:'none'});
        right2.css({display:'block'});
    });
    obj2.click(function () {
        $(this).css({background:"#333333",color:"#fff"});//obj2对象被点击改背景颜色和文本颜色
        obj1.css({background:"#dcdcdc",color:"#333333"});//obj1对象被点击改背景颜色和文本颜色
        left1.css({display:'block'});
        right2.css({display:'none'});
    })
}
//确认注册页面的资料是否被填写完成。
function regiSter(obj1,obj2,text,color1,color2) {//clor1是改变val第一次颜色值
    obj1.click(function () {                    //clor2是改变val返回默认颜色值
        if(obj2.val()==""){
            obj2.css({color:color1});
            obj2.val(text);
            obj2.click(function () {
                if(obj2.val(text)){
                    obj2.css({color:color2});
                    obj2.val("");
                }
            });
            return false;
        }

    })
}
//正则判断方法
function regArry(obj,regarry,text1) {
    var str =obj.val();
    var ret =regarry;
    if(ret.test(str)){
        alert('验证成功');
    }else{
        alert(text1);
    }
}
//判断密码和确认密码是否一致//确认密码不低于6位字符
function objpassWord(obj1,obj2) {//obj1是对象1，obj2是对象2，
    if(obj1.val()!=obj2.val()){//判断对象1的val值和对象2的val值是否一样
        alert('密码不一至');
    }
    if(obj1.val()==""||obj2.val()==""){
        alert('密码不能为空');
    }
}
//点击获取验证手机号码倒计时60秒
function Count_down(obj) {
    var s = 60;//秒数
    var timer_down;
    timer_down=setInterval(function () {
        s--;
        s=checkZero(s);
        obj.css({color:"#ffffff",fontSize:'16px'});
        if(s<=10){
            obj.css({color:"#ff0000",fontSize:'16px'});
        }
        if(s<=0){
            // s=0;
            s="重新获取";
            obj.css({color:"#666666",fontSize:'12px'});
            clearInterval(timer_down);
        }
        obj.text(s) ;
    },1000);
    function checkZero(s) {
        if(s<10){
            s = "0" + s;
        }return s;
    }
}

//支付密码的6个密码框连续输入，obj是密码框；index是对应的下标
//这是一个内嵌式调用方法
//这是一个js的方法
function moveNext(object,index){  //objecr是输入的对象,index是对象的下标
    if(object.value.length == 1){
        document.forms[0].elements[index+1].focus();
    }
    window.document.onkeydown = function (ev) {  //这个方法是可以在输入错误的时候退后
        var oEvent=ev||event;
        switch (oEvent.keyCode){
            case 8:
                if(object.value.length == 0){
                    document.forms[0].elements[index-1].focus();
                }
                break;
        }
    }
}
function showResult(){
    var f = document.forms[0];
    var result="";
    for(var i = 0; i<6 ;i++){
        result += f.elements[i].value;
    }
    if(result=="123456"){        //当6个密码框的val值连在一起与写死的值相等时跳转支付成功；
        location.href="PaymentSuccess.html";
    }else {                     //当6个密码框的val值连在一起与写死的值相等时跳转支付失败；
        location.href="FailureOfPayment.html";
    }
    // alert('您输入的密码是'+result);
}
//通过添加classname来加边框
function orderQuantity(obj,clName) {
    obj = $(obj);
    obj.toggleClass(clName).siblings().removeClass(clName);
}
//给父级加边宽和移除
function borderClass(obj) {
    obj.parent().css('border', '1px solid red').siblings().css('border', 'none');
}
//给标题添加点击切换颜色效果
function contentComment(obj) {
    obj.css({'background':'#ff0036'}).children().css('color','#ffffff').end().siblings().css({'background':'#eee'}).children().css('color','#666')
}
//图片缩放
function changimgbig(obj1) {
    // $('.content_right_top5_img img').click(function () {
    obj1.css('z-index','999');
    var wvalue = 2.5*$(obj1).width();
    var hvalue = 2.5*$(obj1).height();

    obj1.stop().animate({
        width: wvalue,
        height: hvalue
    },1000).mouseleave(function(){
        obj1.stop().animate({
            width: "50",
            height: "50"
        }, 1000 );
    });
}
// function changeSrc(obj,obj2) {
//     obj2.attr('src',obj.attr（"src" ))
// }



/*上一页下一页，页面跳转 index当前被添加了id或者class的标签的下标加或者减1，obj1 已经添加元素的选择器，obj2 想要新添加的选择器，lie 想要添加元素的属性名 zhi 想要添加元素的属性值
   下一页功能调用时，需要在事件里面再加判断语句，判断当前页数的下标下于n*/
function clickPageJump2(font) {
    var index = font.index;
    var obj1 = font.obj1;
    var obj2 = font.obj2;
    var lie = font.lie;
    var zhi = font.zhi;
    if(index>-1){
        clickPageJump(obj1,obj2.eq(index),lie,zhi);
    }
}
//跳转页面的点击数字跳页，obj是当前页面，obj2是点击想要跳转的页面，lie是属性名，zhi是lie的属性值；
function clickPageJump(obj,obj2,lie,zhi) {
    obj.attr(lie,'');
    obj2.attr(lie,zhi);
}
//让文本自减1
function changeSpanTextjian(obj,n) {
    if(obj.text()>n)
        obj.text(parseInt(obj.text())-1);
}
//让文本自加1
function changeSpanTextjia(obj,n) {
    if(obj.text()<n)
        obj.text(parseInt(obj.text())+1);
}
//当obj的val值等于0时，obj2的href属性变成ohref
function judge(obj,obj2,ohref) {
    if(obj.val() == 0){
        alert('请输入你要购买的数量');
    }else {
        obj2.attr('href',ohref);
    }
}
//选中切换css，obj当前点击的指定对象，obj2,当前的对象下标
function changeBorderColor(obj,obj2,csstext,newcss,newcss2) {
    obj.each(function (i) {
        if(i == obj2){
            obj.eq(i).css(csstext,newcss);
        }else {
            obj.eq(i).css(csstext,newcss2);
        }
    });
}
//obj2继承obj的某个attr属性
function changeSrc(obj,obj2,attr) {
    var href = obj.attr(attr);
    obj2.attr(attr,href);
}
//获取鼠标在obj盒子里面的X坐标
function getX(obj,e) {
        var x = Math.floor(e.pageX-obj.offset().left);
        if(x<0){
            x=0
        }
    return x;
}
//获取鼠标在obj盒子里面的Y坐标
function getY(obj,e) {
    var y = Math.ceil(e.pageY-obj.offset().top);
    if(y<0){
        y=0
    }
    return y;
}
//放大镜,obj为需要放大图片的父级元素；
function createMagnifier(obj,e) {
    var oObj = obj.children();
    oObj.after("<div id='Magnifier'><img src='"+oObj.attr('src')+"'/></div>").parent().css('position','relative');
    oObj.after("<div id='newMask'></div>");
    $('#newMask').css({'width':oObj.innerWidth()/4,'height':oObj.innerHeight()/4,'position':'absolute','top':getY(oObj,e)-oObj.innerHeight()/8,'left':getX(oObj,e)-oObj.innerWidth()/8,'background':'rgba(255,255,255,0.5)'});
    $('#Magnifier').css({'width':oObj.innerWidth()/2,'height':oObj.innerHeight()/2,'position':'absolute','top':'0','left':oObj.innerWidth(),'overflow':'hidden'});
    $('#Magnifier img').css({'width':oObj.innerWidth()*2,'height':oObj.innerHeight()*2,'position':'absolute'});
    obj.mouseleave(function () {
        $('#Magnifier').remove();
        $('#newMask').remove();
    });
    //重复获取鼠标的X,Y
    $('#newMask').mousemove(function (e) {
        var y = getY(oObj,e)-oObj.innerHeight()/8;
        var x = getX(oObj,e)-oObj.innerWidth()/8;
        console.log(oObj.innerHeight());
        console.log(y);
        if(y<=0){
            y=0;
        }
        if(y>=oObj.innerHeight()-oObj.innerHeight()/4){
            y=oObj.innerHeight()-oObj.innerHeight()/4
        }
        if(x<=0){
            x=0;
        }
        if(x>=oObj.innerWidth()-oObj.innerWidth()/4){
            x=oObj.innerWidth()-oObj.innerWidth()/4;
        }
        $('#newMask').css({'top':y,'left':x});
        $('#Magnifier img').css({'top':-y*2,'left':-x*2});
    });
}
//判断objval的长度，低于或等于n时，出现弹框，大于n时，让btn链接到WWW网址；
function testsVal(obj,btn,www,n) {
    if(obj.val().length <= n){
        alert('评论字数低于15个字');
    }else {
        alert('提交成功');
        btn.attr('href',www);
    }
}
//给obj对象添加类名，并切换
function toggerClsaa(obj,classname) {
    obj.toggleClass(classname);
}
//解除绑定事件
function relieveBind(obj,bind) {
    obj.off(bind)
}
//通过事件获取到的下标跟一个元素子集的所以下标做判断，得出下标，改变某些子集的attr属性
function changeStarColor(gather) {
    var a = gather.obj;                            //获取一个obj对象，并赋值给a；
    var index = gather.index;                      //获取一个下标，并赋值给index；
    var attr = gather.attr;
    var new1 = gather.new1;                        //获取图片1，并赋值给img1
    var new2 = gather.new2;                        //获取图片2，并赋值给img2
    a.each(function (i) {                          //通过遍历a，获取所以a的下标值i
        if(i<=index){                              //判断i是否小于或等于index
            a.eq(i).prop(attr,new1);              //下标值为i的a的src属性变成img1;
        }else {
            a.eq(i).prop(attr,new2);              //如何i大于index,下标值为i的a的src属性变成img2;
        }
    })
}
//动态生成图片蒙版，obj为要创建蒙版的图片选择器；color:动态生成蒙版的背景颜色，用rgba格式 ；点击oHref：所要链接的网址
function createMask(obj,color,oHref) {
    obj.after("<div id='Mask'></div>");          //在obj后面创建一个跟它自身同级的div，类名为Mask
    obj.parent().css('position','relative');        //给obj的父级元素设置position样式为relative；
    $('#Mask').css({'width':obj.innerWidth(),'height':obj.innerHeight(),'position':'absolute','top':'0','left':'0','background':color});
    $('#Mask').click(function () {                  //点击创建的div时，链接到某个网址；
       location.href = oHref;
    });
    $('#Mask').mouseleave(function () {             //当鼠标移出创建的div时，删除创建的div
        $(this).remove();
    })
}
//选中商品的数量和总价格
function changeNumSum(obj,obj2,obj3) {
    var sum= 0;
    var sl = 0;
    obj.each(function (i) {                       //通过去遍历obj
        if(obj.eq(i).is(":checked") == true){      //去判断obj的checked是否的值是否为true
            sum += getText(obj2,i,1);               //获取obj2的值，并自加
            sl += getVal(obj3,i);                   //获取obj3的值,并自加
        }
    });
    $('.buyCart_footer_right li span').eq(1).text(sl);
    $('.zonShu').text('￥'+sum+'.00');
}
//全选按钮input判断  obj全选按钮 obj2商品按钮
function inputSelect(obj,obj2) {
    if(obj.checked == true){                    //当obj的checked属性值为true时，让obj2的checked的值为true；为false时反之；
        obj2.prop("checked",true);
    }else {
        obj2.prop("checked",false);
    }
}
//input加法运算
function jianShao(obj,index,n) {
    if(getVal(obj,index)>n){                       //当obj的val值大于n时，自减
        obj.eq(index).val(getVal(obj,index)-1);
    }
}
//input减法运算
function jia(obj,index,n) {
    if(getVal(obj,index)<n){                    //当obj的val值小于n时，自加
        obj.eq(index).val(getVal(obj,index)+1);
    }
}
//获取val并转为整型
function getVal(obj,index,n) {                  //参数1：需要获取的对象；参数2：获取对象的下标；参数3：从左到右，删除多少个字符，不删为0；
    return parseInt(obj.eq(index).val().substring(n));
}
//获取文本内容转为整型
function getText(obj,i,n) {                        //参数1：需要获取的对象；参数2：获取对象的下标；参数3：从左到右，删除多少个字符，不删为0；
    return parseInt(obj.eq(i).text().substring(n));
}

