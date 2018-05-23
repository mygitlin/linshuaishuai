$(function () {
	/*--------------------------鸿楷--------------------------*/
    //导航变色
	daoHangBianSe();
    //动态赋值高度 跟 动态加margin值
	getMarginAndHeight();
	//获取当前系统时间
	getNowTime();//目的是进来先自动加载当前时间
	setInterval(getNowTime());
	//轮播banner大图
	startMove();
	//右上角广告滚动
	GGscroll();
	//推荐品牌图片淡入淡出
	imgDanRDanC();
	diBuTxt();
	// console.log($(document.documentElement));
    // $(document.documentElement).click(function () {
    //     $('.gouWuChe1_span3Input').each(function () {
    //
    //         if($('.gouWuChe1_span3Input').css(display)== 'block'){
    //             var index = $('.gouWuChe1_span3Input').index(this);
    //             changeSpan(index);
    //
    //         }
    //     });
    // })
    // console.log($('.gouWuChe1_span3Input').css('display')=='none');
	/*-------------------------------------------------------*/

	/*--------------------------超梅--------------------------*/
	$("li").mouseover(function () {
		var idex = $(this).index();
		$(this).addClass("liGaiBian").siblings().removeClass("liGaiBian");
		if(idex > 0){
			$("li").eq(0).removeClass("firstli");
		}
		$(".xiangQingXiaFang div").eq(idex).css("display","block").siblings("div").css("display","none");
		$(".xiangQingXiaFang div").eq(idex).addClass("xS").siblings().removeClass("xS");
	})
	$("#xiangQingJieShao3 p").eq(0).css("color","gray");
	$("#xiangQingJieShao3 span").eq(0).css({
		"color":"gray",
		"text-decoration":"line-through"
	});
	var trLength = $("tr").length;
	for(var i = 0;i<trLength;i++){
		if(i%2 == 0){
			$("tr").eq(i).children().addClass("tdbg1");
		}else{
		}
	}
	$("li").mouseover(function () {
            var idex = $(this).index();
            $(this).addClass("liBianSe").siblings().removeClass("liBianSe");
	});
	/*--------------------------------------------------------*/
	// 登录
    login();
    // 购物车
    // 点击按钮出现输入框
    $('.changeNumer').click(function (e) {
    	var oBtnindex = $('.changeNumer').index(this);
        changeInput(oBtnindex);
        e.stopPropagation();
	});
	//点击文档隐藏输入框
//     $(document.documentElement).click(function () {
//         $('.gouWuChe1_span3Input').each(function () {
//                 console.log($('.gouWuChe1_span3Input').eq($(this).index()));
// 			}
//           // var index = $(this).index();
//             // changeSpan();
//             else{
//         		alert(111);
// 			}
// 		})
//     });
// });

var GGstop=null;
var timer=null;
/*----------------------------------------------------------
						【JQuery函数】
-----------------------------------------------------------*/
//获取当前时间
function getNowTime() {
	var nowTime = new Date();   //定义一个变量来保存当前时间
	var year ,day,month,today=0; //定义年、月、日、星期
	today = nowTime.getDay();   //获取时间
	year = nowTime.getFullYear();
	month = nowTime.getMonth();
	day = nowTime.getDate();
	nowTime.getDay();
	switch (today)//判断数字星期几转变中文
	{
		case 1:today= "星期一";break;
		case 2:today= "星期二";break;
		case 3:today= "星期三";break;
		case 4:today= "星期四";break;
		case 5:today= "星期五";break;
		case 6:today= "星期六";break;
		case 0:today= "星期日";break;
	}
	$('#nowTime').html(year+"/"+(month+1)+"/"+day+" "+today);
}
//获取li索引值与li鼠标移入移出改变颜色
function startMove() {
	var stop=null;//用来保存计时器
	$('#dtDaoHang li').mouseover(function(){
		//获取光标指向的li的索引值
		var liIndex = $('#dtDaoHang li').index(this);
		//滚动li的background
		$('#dtDaoHang ul li').eq(liIndex).addClass('daoHangActive')
		.siblings().removeClass('daoHangActive');
	}).hover(function () {
		//获取光标的时候 让当前图片+1往上top-166
		$('#zyZJ_Tu img').eq($('#dtDaoHang li').index(this)).css('top',0).siblings().css('top',-166);
	});
	var i=0;
	$('#zyZj_daTu').hover(function () {
		clearInterval(stop);
	},function () {
		//每2S轮播一次li的background
		stop= setInterval(function () {
			showImage(i);
			i++;
			if(i==10){
				i=0;
			}
		},2000);
	}).mouseleave();
}
//图片和li轮播
function showImage(liIndex){
	$('#zyZJ_Tu img').eq(liIndex).animate({'top':0},500).siblings().css('top',-166);
	if(liIndex==0){
		$('#zyZJ_Tu img').eq(9).css('top',0);
	}
	else{
		$('#zyZJ_Tu img').eq(liIndex-1).css('top',0);
		//为了能在翻页的时候看得到下面有内容，所以页面每次会有两张图片top是0
	}
	//加亮光标指向的li
	$('#dtDaoHang ul li').eq(liIndex).addClass('daoHangActive')
	.siblings().removeClass('daoHangActive');
}
//获取高度来算margin值
function getMarginAndHeight() {
	$('.flTXTlist').each(function () {
		var i =$('.flTXTlist').index(this);
		$('.flTXTlistImg').eq(i).height($(this).outerHeight());
		$('.flTXT li').eq(i).height(($(this).outerHeight()));
		$('.flTXTlistImg img').eq(i).css("margin-top" ,(($('.flTXTlistImg').eq(i).outerHeight(true)-60)/2));
		//获取flTXTlistImg的高度赋值给 flTXTlistImg 里面的图片img outerHeight(true) == height+padding+border+margin
		//outerHeight()==height+padding+border
	});
}
// 导航条移入移出变色功能
function daoHangBianSe() {
	$('.dtDaoHang ul li').click(function () {
		$(this).addClass('daoHangActive').siblings().removeClass('daoHangActive');
	});
}
//图片的淡入淡出
function imgDanRDanC() {
	$('#zyZhongJian img').mouseenter(function () {
		$(this).stop().fadeTo('show',1);
		var i = $('#zyZhongJian img').index(this);
	}).mouseout(function () {
		$(this).stop().fadeTo('show',0.7)
	});
	$('.zyZB_tuiJianPP ul li img').mouseenter(function () {
		$(this).css({'box-shadow':'0px 2px 10px rgba(125,125,125,0.4)'});
	}).mouseout(function () {
		$(this).css('box-shadow','none');
	})
	$('.zyYB_fenLeiTJ ul li a').mouseenter(function () {
		$('.zyYB_fenLeiTJ ul li img').stop().eq($('.zyYB_fenLeiTJ ul li a').index(this)).fadeTo('show',0.7);
	}).mouseout(function () {
		$('.zyYB_fenLeiTJ ul li img').stop().eq($('.zyYB_fenLeiTJ ul li a').index(this)).fadeTo('show',1);
	})
	
}
//底部介绍文本动画功能
function diBuTxt() {
	$('.diBu_01 ul li a').mouseenter(function () {
		$(this).stop().animate({'border-width':'10px',
			'opacity':'1'},800);
		$(this).css('color','skyblue');
	}).mouseleave(function(){
			$(this).stop().animate({'border-width':'1px','opacity':'0'},function() {
					$(this).stop().animate({'opacity':'1'},500);
				});
		$(this).css('color','#666');
	});
}
/*----------------------------------------------------------
						【JaveScript函数】
-----------------------------------------------------------*/
//右上角广告滚动鼠标鼠标移入移出
function GGscroll() {
	var GGmove = document.getElementById('GGmove');
	var GGmoveLi = GGmove.getElementsByTagName('li');
	GGmove.style.height = GGmoveLi[0].offsetHeight*GGmoveLi.length+"px";//动态获取高度
	GGmove.innerHTML += GGmove.innerHTML;
	GGStartNow(); //加载页面时候先执行一次
	GGmove.onmouseover=function () {
		clearInterval(GGstop);
	};
	GGmove.onmouseout=function () {
		GGStartNow();
	};
}
//广告滚动函数
function GGStartNow() {
	GGstop = setInterval(function (){
		var i = -1; //设置滚动的速度
		if(GGmove.offsetTop==-60)
		{ //就是把它滚到-32的位置时候再拉回来滚
			GGmove.style.top=0+"px";
		}
		else {
			GGmove.style.top =GGmove.offsetTop +i+"px";
		}
	},50);
}

// 登录页面用户密码确认
function login() {
    $('#login').click(function () {
        if($('#uname').val() === '123456'){
            if($('#pw').val() === '123456'){
                alert('登录成功');
                $('#login').attr('href','主页面.html');
            }else {
                alert('密码错误');
            }
        }else {
            alert('用户名错误');
        }
    });
}
// 显示，隐藏input和span
function changeInput(index) {
	$('.gouWuChe1_span3Input').eq(index).css('display','block').val($('.buyNume').eq(index).text());
	$('.buyNume').eq(index).css('display','none');
}
function changeSpan() {
    $('.buyNume').eq(1).css('display','block').text
	($('.gouWuChe1_span3Input').eq(1).val());
    $('.gouWuChe1_span3Input').eq(1).css('display','none');
}



/*------------------------烁佳 JS代码-----------------------------*/
// window.onload = function (ev) {
//     CancelDg();
//     changeNumer();
//     changeColor();
//     login();
//     hd_GouWuChe();
// };
// function getClass(oclass){
//     return document.getElementsByClassName(oclass);
// }
// // 取消订购
// function CancelDg() {
//     var oButton = getClass('cancelDG');
//     var gouWuCheUl = getClass('gouWuCheUl');
//     for(var i=0;i<oButton.length;i++){
//         oButton[i].index = i;
//         oButton[i].onclick = function () {
//             gouWuCheUl[this.index].innerHTML = '';
// 				changeColor();
// 				changeNumer();
//         };
//
//     }
//
// }
// // 购物车列表的背景色
// function changeColor() {
//     var ulClass = getClass('gouWuCheUl');
//     for(var i=0;i<ulClass.length;i++){
//         var oLi = ulClass[i].getElementsByTagName('li');
//         for(var k=0;k<oLi.length;k++){
//             if(i%2==0){
//                 oLi[k].style.backgroundColor = 'rgb(255,255,255)';
//             }else {
//                 oLi[k].style.backgroundColor = 'rgb(245,245,245)';
//             }
//         }
//     }
// }
// // 更改数量
// function changeNumer() {
//     var oButton = getClass('changeNumer');
//     var oSpanNum = getClass('buyNume');
//     var oInputNUm = getClass('gouWuChe1_span3Input');
//     var oGouWuCheUl =getClass("gouWuCheUl");
//     for(var i=0;i<oGouWuCheUl.length;i++){
//         oButton[i].index = i;
//         oButton[i].onclick = function (e) {
//             oSpanNum[this.index].style.display = 'none';
//             oInputNUm[this.index].style.display = 'block';
//             oInputNUm[this.index].focus();
//             oInputNUm[this.index].select();
//             e.stopPropagation();
//         };
//     }
//     document.documentElement.onclick=function () {
//         for(var k=0;k<oSpanNum.length;k++){
//             if(oSpanNum[k].style.display = 'none'){
//                 oSpanNum[k].style.display = 'block';
//                 oInputNUm[k].style.display = 'none';
//                 oSpanNum[k].innerHTML = oInputNUm[k].value;
//             }
//         }
//         heJiJiaGe();
//     }
// }
// // 商品合计,积分,总计商品数量
// function heJiJiaGe() {
//     var ospdanJia = getClass('spdanJia');
//     var obuyNume = getClass('buyNume');
//     var spHeJi = getClass('spHeJi');
//     var spZongJi = getClass('spZongJi');
//     var gouWuCheJiFen = getClass('gouWuCheJiFen')[0];
//     var spsl = getClass('shangPinShuLiang');
//     var spdanjia = [];
//     var buynum = [];
//     var sum = [];
//     var zongJi = 0;
//     var spNum = 0;
//     for(var i=0;i<ospdanJia.length;i++) {
//         spdanjia[i] = parseInt(ospdanJia[i].innerHTML);
//         buynum[i] = parseInt(obuyNume[i].innerHTML);
//         sum[i] = spdanjia[i]*buynum[i];
//         spHeJi[i].innerHTML = sum[i]+'.00';
//         zongJi += sum[i];
//         spNum = spNum+buynum[i];
//     }
//     for(var s=0;s<spsl.length;s++){
//         spsl[s].innerHTML = spNum;
//     }
//     for(var j=0;j<spZongJi.length;j++){
//         spZongJi[j].innerHTML = '￥'+zongJi+'.00元';
//         gouWuCheJiFen.innerHTML = zongJi;
//     }
// }
// // 登录界面
// function login() {
//     var oLogin = document.getElementById('login');
//     oLogin.onclick = function (ev) {
//         if(usernPw()){
//             oLogin.href = '主页面.html';
//         }
//     }
// }
// function usernPw() {
//     var uName = document.getElementsByClassName('uname')[0];
//     var oPw = document.getElementsByClassName('pw')[0];
//     var newName = '123';
//     var newPw = '123';
//     if(uName.value==newName){
//         if(oPw.value==newPw){
//             return true;
//         }else {
//             alert('密码错误');
//         }
//     }else {
//         alert('用户名错误');
//     }
// }
// // 结算
// function hd_GouWuChe() {
//     var hdG = document.getElementById('hdGWC');
//     var oSPSL = getClass('shangPinShuLiang');
//     var zenPin = document.getElementById('ZenPin2');
//     var kaHao = 123456;
//     var miMao = 123456;
//     if(oSPSL[0].innerHTML == 0){
//         hdG.innerHTML = "购物车暂时为空";
//     }else {
//         hdG.innerHTML = "购物车："+oSPSL[0].innerHTML + "件商品";
//     }
//     var spjg = parseInt(getClass('gouWuCheJiFen')[0].innerHTML);
//     zenPin.onclick = function (ev) {
//         if(3000-spjg>0){
//             alert("您还差"+(3000-spjg)+"即可获得此物品");
//         }
//     };
//     document.getElementById('yanzhen').onclick = function () {
//         if(kaHao == getClass('userKaName')[0].value){
//             if(miMao == getClass('Kapw')[0].value){
//                 alert("验证成功");
//             }else {
//                 alert("密码错误");
//             }
//         }else {
//             alert("没有这个卡号");
//         }
//     };
//     var oName = getClass('name');
//     var dianHua = getClass('dianHua');
//     var email = getClass('email');
//     var diZhi = getClass('diZhi');
//     var youBian = getClass('youBian');
//     document.getElementById('fzXinXi').onclick = function (ev) {
//         oName[1].value = oName[0].value;
//         dianHua[1].value = dianHua[0].value;
//         email[1].value = email[0].value;
//         diZhi[1].value = diZhi[0].value;
//         youBian[1].value = youBian[0].value;
//     }
// }
