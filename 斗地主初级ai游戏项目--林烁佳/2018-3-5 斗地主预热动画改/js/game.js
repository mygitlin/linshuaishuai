//玩家积分
$(function () {
    var integral = [100,100,100];
    //点击
    $('.index_box').click(function () {
        $('.index_box').unbind();
        $('.index_top').animate({'top':-50+'%'},1000);
        $('.index_end').animate({'top':50+'%'},1000)
        setTimeout(function () {
            $('#index1').hide();
        },1000);
        pkPoker();
    });
    function pkPoker() {
        //初始化游戏界面
        for(var i=0;i<3;i++){
            $('.jifen span  ').eq(i).text(integral[i]);
        }
        for(var i=0;i<3;i++){
            $('.play').eq(i).html(null);
        }
        $('.all_poker').html(null);
        $('.all_poker1').html(null);
        $('.getBtn').hide();
        $('.start_btn').show();
        $('.time').text(null);
        $('.robPoker li').css({'display':'none'});
        //1.创建牌堆
        for (var i = 0; i < 54; i++) {
            $li = $('<li />');
            $li.attr('class', 'back');
            $li.css({'top': -i / 3, 'left': -i / 6});
            $('.all_poker').append($li);
        }
        $('.all_poker li').css({'animation-play-state': 'paused'});
        //初始化扑克牌
        var pokerArr = [];
        for (var i = 1; i < 14; i++) {
            for (var j = 0; j < 4; j++) {
                pokerArr.push({'number': i, 'color': j});
            }
        }
        pokerArr.push({'number': 14, 'color': 0});
        pokerArr.push({'number': 14, 'color': 1});
        //玩家手牌
        var playArr = [
            {poker: [], role: 0, integral: 100},
            {poker: [], role: 0, integral: 100},
            {poker: [], role: 0, integral: 100}
        ];

        // 设置一个变量为对象，用于保存游戏里的数据
        var game = {'present': '-1'};
        // 设置一个变量对象，用于保存游戏中玩家选择牌的数据
        var select_poker = {
            'type': 0,
            'max': 0,
            'list': []
        };
        // 设置一个变量对象，用于保存游戏中桌面上牌的数据
        var desktop = {
            'type': 0,
            'max': 0,
            'list': []
        };
        //不出次数
        var passNum = -1;
        var timeNum = -1;
        //点击开始游戏按钮时，开始洗牌发牌
        $('.start_btn').on('click',function () {
             // 开始背景音频
            $(".bgmusic").get(0).play();
            $('.start_btn').unbind();
            // $('.all_poker li').css({'animation-play-state': 'running'});
            $('.start_btn').hide();
            pokerArr.sort(function () {
                return Math.random() - 0.5;
            });
            // setTimeout(function () {
            $('.all_poker li').css({'animation-play-state': 'paused'});
            dealPoker();
            // }, 11500);
            $('.start_btn').off('click');
        });
        //2.洗牌发牌

        //旧洗牌方法
        /*function clearPoker(){
            pokerArr.sort(function () {
                return Math.random()-0.5;
            });
            // console.log(pokerArr)
            $poker = $('.all_poker');
            $('.all_poker').detach();
            for(var i=0;i<3;i++){
                $ul = $('<ul />');
                $ul.attr('class','all_poker').css({'top': -i*265+'px'});
                for(var j=0;j<17;j++){
                    $li = $('<li />');		// 通过JS生成一个JQ的HTML（DOM）对象
                    $li.attr('class', 'back');
                    $li.css({'top':-j/3,'left':-j/6});
                    $ul.append($li);
                }
                $('.mid_top').append($ul);
            }
            for(var k=0;k<5;k++){
                $('.all_poker').eq(0).animate({'left':'-500px'},100).animate({'left':'0'},100);
                $('.all_poker').eq(1).animate({'left':'500px'},100).animate({'left':'0'},100);
            }
            setTimeout(function () {
                $('.mid_top').html($poker);
            },1000);
        }*/

        //发牌方法
        function dealPoker(num) {
            num = num || 0;
            //左边玩家
            $('.all_poker li:last').animate({'left': '-600px', 'top': '150px'}, 10);
            playArr[0].poker.push(pokerArr.pop());
            setTimeout(function () {
                $('.all_poker li:last').remove();
                // $('.play_1').append('<li class="back"></li>')
                $('.play_1').append(makePoker(playArr[0].poker[playArr[0].poker.length - 1]));
                $('.play_1 li').eq(num).css({'top': num * 30 + 'px'});
            }, 10);
            //中间玩家
            setTimeout(function () {
                $('.all_poker li:last').animate({'top': '600px'}, 10);
                playArr[1].poker.push(pokerArr.pop());
                setTimeout(function () {
                    $('.all_poker li:last').remove();
                    $('.play_2').append(makePoker(playArr[1].poker[playArr[1].poker.length - 1]));
                    $('.play_2 li').eq(num).css({'left': -300 + num * 40 + 'px'});
                }, 10)
            }, 20);
            //右边玩家
            setTimeout(function () {
                $('.all_poker li:last').animate({'left': '600px', 'top': '150px'}, 10);
                playArr[2].poker.push(pokerArr.pop());
                setTimeout(function () {
                    $('.all_poker li:last').remove();
                    // $('.play_3').append('<li class="back"></li>')
                    $('.play_3').append(makePoker(playArr[2].poker[playArr[2].poker.length - 1]));
                    $('.play_3 li').eq(num).css({'top': num * 30 + 'px'});
                    if (++num < 17) {
                        dealPoker(num);
                    } else {
                        $('.all_poker li:last').animate({'left': '-150px'}, 500);
                        $('.all_poker li:first').animate({'left': '150px'}, 500);
                        $('.play_2 li').animate({'left': 0}, 500);
                        setTimeout(function () {
                            $('.play_2 li').remove();
                            $('.play_1 li').remove();
                            $('.play_3 li').remove();
                            playArr[1].poker = sortArr(playArr[1].poker);
                            playArr[0].poker = sortArr(playArr[0].poker);
                            playArr[2].poker = sortArr(playArr[2].poker);
                            for (var i = 0; i < playArr[1].poker.length; i++) {
                                var li = makePoker(playArr[1].poker[i]);
                                $('.play_2').append(li);
                                $('.play_2 li').eq(i).animate({'left': i * 40 - 300 + 'px'}, 500);

                                var li1 = makePoker(playArr[0].poker[i]);
                                $('.play_1').append(li1);
                                $('.play_1 li').eq(i).animate({'top': i * 30 + 'px'}, 500);

                                var li2 = makePoker(playArr[2].poker[i]);
                                $('.play_3').append(li2);
                                $('.play_3 li').eq(i).animate({'top': i * 30 + 'px'}, 500);
                            }
                        }, 550);
                        setTimeout(function () {
                            juese()
                        }, 1050)
                    }
                }, 10)
            }, 40)
        }

        //     //制作牌面
        function makePoker(obj) {
            $pokerColor = [
                [0, -181],
                [-139, -181],
                [0, 0],
                [-139, 0]
            ];
            var x;
            var y;
            if (obj.number < 14) {
                x = $pokerColor[obj.color][0];
                y = $pokerColor[obj.color][1];
            } else if (obj.color == 0) {
                x = 0;
                y = 0;
            } else {
                x = -139;
                y = 0;
            }
            var newHtml = '<li data-poker="' + obj.number + '_' + obj.color + '" style="width: 121px; height: 159px; border-radius: 11px ; background: url(./images/' + (obj.number) + '.png) ' + x + 'px ' + y + 'px;"></li>';
            return newHtml;
        }

        //     //排序
        //大到小
        function sortArr(obj) {
            obj.sort(function (x, y) {
                if (x.number == y.number) {
                    return y.color - x.color;
                } else {
                    return y.number - x.number;
                }
            });
            return obj;
        }

        //小到大
        function sortArr2(obj) {
            obj.sort(function (x, y) {
                if (x.number == y.number) {
                    return x.color - y.color;
                } else {
                    return x.number - y.number;
                }
            });
            return obj;
        }

        //开局确定第一轮谁抢地主
        var timer;

        function juese(num, number) {
            clearInterval(timer);
            num = num || Math.round(Math.random() * (2 + 1) + (0 - 0.5));
            number = number || 0;
            //当number大于2时，没有人抢地主，流局；
            if (number > 2) {
                clearInterval(timer);
                $('.overgame').css({'display':'block'});
                $('.Resume p:eq(0) span:eq(1)').text('+0');
                $('.Resume p:eq(1) span:eq(1)').text('+0');
                $('.Resume p:eq(2) span:eq(1)').text('+0');
                $('.Resume p:eq(0) span:eq(2)').text(integral[0]);
                $('.Resume p:eq(1) span:eq(2)').text(integral[1]);
                $('.Resume p:eq(2) span:eq(2)').text(integral[2]);
                //点击再来一局
                $('.stratGame2').click(function () {
                    $('.overgame').css({'display':'none'});
                    pkPoker();
                });
                return;
            }
            if (num > 2) {
                num = 0;
            }
            //显示和隐藏抢地主和不抢按钮
            $('.time').text(null);
            $('.time').animate({"opacity": 0}, 200);
            $('.time').animate({'opacity': '1'}, 200);
            $('.robPoker li').css({"display": "block"});
            $('.robPoker li').css({"opacity": 0});
            $('.robPoker:eq(' + num + ') li').animate({'opacity': '1'}, 200);
            //点击不抢按钮，轮到下一玩家
            $('.noRob').eq(num).click(function () {
                // 不抢音频
                $(".buqiang").get(0).play();
                clearInterval(timer);
                num++;
                number++;
                juese(num, number);
                $(this).unbind();
            });
            //点击抢地主按钮，确认地主
            $('.robPoker .rob').eq(num).click(function () {
                //抢地主音频
                $(".qiang").get(0).play();
                if (s > 0) {
                    clearInterval(timer);
                    playArr[num].role = 1;
                    $(this).unbind();
                    getLandlordPoker(num);
                }
            });
            var s = 10;
            //抢地主计时器，秒数为0时，默认不抢
            timer = setInterval(function () {
                // console.log(num)
                $('.time').text(s);
                s--;
                if (s < 0) {
                    clearInterval(timer);
                    num++;
                    number++;
                    setTimeout(function () {
                        juese(num, number);
                    }, 1000)
                }
            }, 1000);
        }

        //生成地主牌
        function getLandlordPoker(num) {
            $('.robPoker').css('opacity', '0');
            $('.time').css('opacity', '0');
            var ul = document.querySelector('.all_poker');
            var x = 0;
            //翻转地主牌动画
            var time = setInterval(function () {
                x = x + 10;
                if (x >= 90) {
                    $('.all_poker li').remove();
                    clearInterval(time);
                    for (var i = 0; i < pokerArr.length; i++) {
                        var li = makePoker(pokerArr[i]);
                        $('.all_poker').append(li);
                        $('.all_poker li:eq(0)').css({'left': '150px'});
                        $('.all_poker li:eq(1)').css({'left': '0'});
                        $('.all_poker li:eq(2)').css({'left': '-150px'});
                    }
                    var time2 = setInterval(function () {
                        x = x - 10;
                        if (x <= 0) {
                            clearInterval(time2);
                            playArr[num].poker = playArr[num].poker.concat(pokerArr);
                            //如果num等于1，玩家2得到地主牌
                            if (num == 1) {
                                setTimeout(function () {
                                    $('.play_2 li').remove();
                                    playArr[1].poker = sortArr(playArr[1].poker);
                                    for (var i = 0; i < playArr[1].poker.length; i++) {
                                        var li = makePoker(playArr[1].poker[i]);
                                        $('.play_2').append(li);
                                        $('.play_2 li').eq(i).animate({'left': i * 40 - 300 + 'px'}, 500);
                                    }

                                }, 550);
                            }
                            //如果num等于0，玩家1得到地主牌
                            if (num == 0) {
                                setTimeout(function () {
                                    $('.play_1 li').remove();
                                    playArr[0].poker = sortArr(playArr[0].poker);
                                    for (var i = 0; i < playArr[0].poker.length; i++) {
                                        var li = makePoker(playArr[0].poker[i]);
                                        $('.play_1').append(li);
                                        $('.play_1 li').eq(i).animate({'top': i * 30 + 'px'}, 500);
                                    }
                                }, 550);
                            }
                            //如果num等于2，玩家3得到地主牌
                            if (num == 2) {
                                setTimeout(function () {
                                    $('.play_3 li').remove();
                                    playArr[2].poker = sortArr(playArr[2].poker);
                                    for (var i = 0; i < playArr[2].poker.length; i++) {
                                        var li = makePoker(playArr[2].poker[i]);
                                        $('.play_3').append(li);
                                        $('.play_3 li').eq(i).animate({'top': i * 30 + 'px'}, 500);
                                    }
                                }, 550);
                            }
                        }
                        //地主牌翻转
                        ul.style.transform = 'rotateY(' + x + 'deg)';
                    }, 50)
                }
                //地主牌翻转
                ul.style.transform = 'rotateY(' + x + 'deg)';
                $('.all_poker li').css({'animation-play-state': 'paused'});
            }, 50);
            game.present = num;
            setTimeout(function () {
                //开始打牌
                startGame(game.present);
            }, 2000);
        }

        // 开始打牌的方法
        function startGame() {
            // 1、确定谁是当前出牌的玩家
            if (passNum > 1 || passNum == -1) {
                $('.getBtn').hide();
                $('.getBtn').eq(game.present).show();
                $('.getBtn').eq(game.present).find('.noget').hide();
                passNum = 0;
            } else {
                $('.getBtn').hide();
                $('.getBtn').eq(game.present).show();
                $('.getBtn').eq(game.present).find('.noget').show();
            }
            // 2、调用绑定出牌事件的方法
            presentClick();
        }

        //选牌，出牌，不出的事件,打牌倒计时
        var timer2;
        function presentClick() {
            var s = 6;
            clearInterval(timer2);
            var str2;
            var arr2;
            var poker2;
            //选牌
            $('.play').eq(game.present).on('click', 'li', function () {
                $(this).unbind();
                var str = $(this).attr('data-poker');
                var arr = str.split('_');
                var poker = {'number': arr[0], 'color': arr[1]};
                //点击选中的牌时取消选中
                if ($(this).attr('class') == 'select' || $(this).attr('class') == 'select1' || $(this).attr('class') == 'select2') {
                    //当类名存在时，删除类名，取消选中
                    $(this).removeClass();
                    //取消选中，同时，删除选中数组中相对应的元素
                    for (var i = 0; i < select_poker.list.length; i++) {
                        if (poker.number == select_poker.list[i].number && poker.color == select_poker.list[i].color) {
                            select_poker.list.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    //选中牌时，让牌浮起
                    switch (game.present) {
                        case 0:
                            //玩家1选牌时，让牌往左移出
                            $(this).addClass('select1');
                            break;
                        case 1:
                            //玩家2选牌时，让牌往上移出
                            console.log($(this));
                            $(this).addClass('select');
                            break;
                        case 2:
                            //玩家3选牌时，让牌往右移出
                            $(this).addClass('select2');
                            break;
                    }
                    select_poker.list.push(poker);
                }
            });
            //点击不出时，下一位玩家出牌
            $('.getBtn:eq(' + game.present + ') li').eq(1).click(function () {
                //不出音频
                $(".buchu").get(0).play();
                $(this).unbind();
                $('.play:eq(' + game.present + ') li').removeClass();
                select_poker.list = [];
                game.present = (++game.present) > 2 ? 0 : game.present;
                passNum++;
                timeNum++;
                // 连续两不出牌把桌面的牌清空
                if (passNum > 1) {
                    desktop.type = 0;
                    desktop.max = 0;
                    desktop.list = [];
                }

                //点击不出时，把选中的牌全部取消选中，select数组清空
                $('.play').off();
                $('.getBtn').eq(game.present).find('.get').off();
                $('.getBtn:eq(' + game.present + ') li').eq(1).off();
                $('.getBtn:eq('+game.present+')').find('.Prompt').off();
                startGame(game.present);
            });
            //点击出牌，判断牌型是否正确，判断要打的牌比桌子上的牌大还是小，如果牌型正确而且比桌子上的牌大，则成功出牌
            $('.getBtn').eq(game.present).find('.get').click(function () {
                    timeNum = 0;
                    if (select_poker.list.length == 0) {
                        alert('请选中牌，再出牌')
                    } else {
                        if (checkPoker() && checkVS()) {
                            select_poker.list = sortArr(select_poker.list);
                            //初始化桌上上牌数组
                            desktop.type = 0;
                            desktop.max = 0;
                            desktop.list = [];
                            passNum = 0;
                            //将手中要出的牌替换桌子上的牌
                            desktop.type = select_poker.type;
                            desktop.max = select_poker.max;
                            var temp = {};
                            for (var i = 0; i < select_poker.list.length; i++) {
                                temp = {'number': select_poker.list[i].number, 'color': select_poker.list[i].color};
                                desktop.list.push(temp);
                                // console.log(desktop)
                            }
                        //判断牌型，开启相应的动画
                        //王炸
                        if(desktop.type == 110){
                            $(".huojian").get(0).play();
                            $(".huojian_1").get(0).play();
                            $('.animation_wangbomb').css({'display': 'block','animation-play-state': 'running'});
                            setTimeout(function () {
                            $('.animation_wangbomb').css({'display': 'none','animation-play-state': 'paused'});
                            }, 3000);
                        }
                        //炸弹
                        else if(desktop.type == 100){
                            $(".bomb").get(0).play();
                            $('.animation_bomb').css({'display': 'block','animation-play-state': 'running'});
                            setTimeout(function () {
                            $('.animation_bomb').css({'display': 'none','animation-play-state': 'paused'});
                            }, 500)

                        }
                        //飞机
                        else if(desktop.type == 8 ||desktop.type == 31 || desktop.type == 32 ||desktop.type == 43
                            ||desktop.type == 56 ||desktop.type ==7 || desktop.type == 77 
                            ||desktop.type == 777 ||desktop.type == 7777){
                            $(".plane").get(0).play();
                            $(".plane_1").get(0).play();
                            $('.animation_plane').css({'display': 'block','animation-play-state': 'running'});
                            setTimeout(function () {
                            $('.animation_plane').css({'display': 'none','animation-play-state': 'paused'});
                            }, 3000)
                        } 
                        //连对
                        else if(desktop.type == 66){
                            $(".liandui").get(0).play();
                            $(".liandui_1").get(0).play();
                            $('.animation_pair_left').css({'display': 'block','animation-play-state': 'running'});
                            $('.animation_pair_right').css({'display': 'block','animation-play-state': 'running'});
                            setTimeout(function () {
                            $('.animation_pair_left').css({'display': 'none','animation-play-state': 'paused'});
                            $('.animation_pair_right').css({'display': 'none','animation-play-state': 'paused'});
                            }, 500)
                        }
                        //顺子
                        else if(desktop.type == 6){
                            $(".shunzi").get(0).play();
                            $(".shunzi_1").get(0).play();
                            $('.animation_straight_jiantuo').css({'display': 'block','animation-play-state': 'running'});
                            $('.animation_straight_shun').css({'display': 'block','animation-play-state': 'running'});
                            setTimeout(function () {
                            $('.animation_straight_jiantuo').css({'display': 'none','animation-play-state': 'paused'});
                            $('.animation_straight_shun').css({'display': 'none','animation-play-state': 'paused'});
                            }, 500)
                        }
                        else if(desktop.type == 4){
                            $(".sandaiyi").get(0).play();
                        }
                        else if(desktop.type == 5){
                            $(".sandaier").get(0).play();
                        }
                        //加载动画end
                            //将之前桌子上的牌清空
                            $('.all_poker1 li').remove();
                            //将玩家手牌中对应的牌删除
                            removerPoker(playArr, select_poker);
                            //重新生成玩家手牌
                            $('.play:eq(' + game.present + ') li').remove();
                            //     console.log(playArr[1].poker)
                            for (var i = 0; i < playArr[game.present].poker.length; i++) {
                                var li = makePoker(playArr[game.present].poker[i]);
                                $('.play').eq(game.present).append(li);
                                switch (game.present) {
                                    case 0:
                                        $('.play').eq(game.present).find('li').eq(i).css({'top': i * 30 + 'px'});
                                        break;
                                    case 1:
                                        $('.play').eq(game.present).find('li').eq(i).css({'left': -300 + i * 40 + 'px'});
                                        break;
                                    case 2:
                                        $('.play').eq(game.present).find('li').eq(i).css({'top': i * 30 + 'px'});
                                        break;
                                }
                            }
                            // //将打出去的牌，生成牌面
                            tablePoker();
                            //判断玩家手牌是否为0，如果为0，则判断玩家是地主还是农民，如果是地主，则地主胜利；如果是农民，则农民胜利；
                            if ($('.play:eq(' + game.present + ') li').length == 0) {
                                clearInterval(timer2);
                                $('.time').hide();
                                // 玩家2是地主，并且手牌为0，地主吃鸡
                                if(game.present == 1&&playArr[game.present].role == 1){
                                    for (var i = 0; i < playArr.length; i++) {
                                        if (playArr[i].role == 0) {
                                            integral[i] -= 10;
                                            $('.Resume p:eq(1) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(2) span:eq(2)').text(integral[i]);
                                        } else {
                                            integral[i] += 20;
                                            $('.Resume p:eq(0) span:eq(2)').text(integral[i]);
                                        }
                                    }
                                    $('.overgame').css({'display':'block'});
                                    $('.win').html('大吉大利，地主吃鸡');
                                    $('.Resume p:eq(0) span:eq(1)').text('+20');
                                    $('.Resume p:eq(1) span:eq(1)').text('-10');
                                    $('.Resume p:eq(2) span:eq(1)').text('-10');
                                    $('.Resume p:eq(0) span:eq(0)').text('伏地魔2:');
                                    $('.Resume p:eq(1) span:eq(0)').text('伏地魔1:');
                                    $('.Resume p:eq(2) span:eq(0)').text('伏地魔3:');
                                    $('.stratGame2').click(function () {
                                        $('.overgame').css({'display':'none'});
                                        pkPoker();
                                    })
                                }
                                // 玩家2是农民，并且手牌为0，农民吃鸡
                                // 玩家2是农民，手牌为0的玩家也是农民，农民吃鸡
                                if(game.present == 1&&playArr[1].role == 0||playArr[1].role == 0&&playArr[game.present].role == 0){
                                    for (var i = 0; i < playArr.length; i++) {
                                        if (playArr[i].role == 0) {
                                            integral[i] += 10;
                                            $('.Resume p:eq(1) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(2) span:eq(2)').text(integral[i]);
                                        } else {
                                            integral[i] -= 20;
                                            $('.Resume p:eq(0) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(0) span:eq(0)').text('伏地魔'+(i+1)+':');
                                        }
                                    }
                                    $('.overgame').css({'display':'block'});
                                    $('.win').html('大吉大利，农民吃鸡');
                                    $('.Resume p:eq(0) span:eq(1)').text('-20');
                                    $('.Resume p:eq(1) span:eq(1)').text('+10');
                                    $('.Resume p:eq(2) span:eq(1)').text('+10');
                                    $('.Resume p:eq(1) span:eq(0)').text('伏地魔2:');
                                    $('.Resume p:eq(2) span:eq(0)').text('伏地魔'+(game.present+1)+':');
                                    $('.stratGame2').click(function () {
                                        $('.overgame').css({'display':'none'});
                                        pkPoker();
                                    })
                                }
                                //玩家2是地主，手牌为0的玩家不是地主，吃鸡失败
                                if(game.present != 1&& playArr[1].role == 1){
                                    for (var i = 0; i < playArr.length; i++) {
                                        if (playArr[i].role == 0) {
                                            integral[i] += 10;
                                            $('.Resume p:eq(1) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(2) span:eq(2)').text(integral[i]);
                                        } else {
                                            integral[i] -= 20;
                                            $('.Resume p:eq(0) span:eq(2)').text(integral[i]);
                                        }
                                    }
                                    $('.overgame').css({'display':'block'});
                                    $('.win').html('落地成盒，吃鸡失败');
                                    $('.Resume p:eq(0) span:eq(1)').text('-20');
                                    $('.Resume p:eq(1) span:eq(1)').text('+10');
                                    $('.Resume p:eq(2) span:eq(1)').text('+10');
                                    $('.Resume p:eq(0) span:eq(0)').text('伏地魔2:');
                                    $('.Resume p:eq(1) span:eq(0)').text('伏地魔1:');
                                    $('.Resume p:eq(2) span:eq(0)').text('伏地魔3:');
                                    $('.stratGame2').click(function () {
                                        $('.overgame').css({'display':'none'});
                                        pkPoker();
                                    })
                                }
                                //玩家2是农民，手牌为0的玩家是地主，吃鸡失败
                                if(playArr[1].role == 0 && playArr[game.present].role == 1){
                                    for (var i = 0; i < playArr.length; i++) {
                                        if (playArr[i].role == 0) {
                                            integral[i] -= 10;
                                            $('.Resume p:eq(1) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(2) span:eq(2)').text(integral[i]);
                                            if(i!=1){
                                                $('.Resume p:eq(2) span:eq(0)').text('伏地魔'+(i+1)+':');
                                            }
                                        } else {
                                            integral[i] += 20;
                                            $('.Resume p:eq(0) span:eq(2)').text(integral[i]);
                                            $('.Resume p:eq(0) span:eq(0)').text('伏地魔'+(i+1)+':');
                                        }
                                    }
                                    $('.overgame').css({'display':'block'});
                                    $('.win').html('落地成盒，吃鸡失败');
                                    $('.Resume p:eq(0) span:eq(1)').text('+20');
                                    $('.Resume p:eq(1) span:eq(1)').text('-10');
                                    $('.Resume p:eq(2) span:eq(1)').text('-10');
                                    $('.Resume p:eq(1) span:eq(0)').text('伏地魔2:');
                                    $('.stratGame2').click(function () {
                                        $('.overgame').css({'display':'none'});
                                        pkPoker();
                                    })
                                }
                            } else {
                                //如果手牌不为0，排到下一位玩家出牌
                                game.present = (++game.present > 2) ? 0 : game.present;
                                $('.play').off();
                                $('.getBtn').eq(game.present).find('.get').off();
                                $('.getBtn:eq(' + game.present + ') .noget').off();
                                $('.getBtn:eq('+game.present+')').find('.Prompt').off();
                                startGame(game.present);
                            }
                        } else {
                            alert('出牌失败')
                        }
                    }
                });
            //出牌计时器，秒数为0时，默认不出
            $('.time').text(null);
            $('.time').animate({"opacity": 0}, 200);
            $('.time').animate({'opacity': '1'}, 200);
            // console.log(timeNum)
            timer2 = setInterval(function () {
                // console.log(num)
                $('.time').text(s);
                s--;
                if (s < 0) {
                    clearInterval(timer2);
                    // console.log(timeNum)
                    if (timeNum > 1 || timeNum == -1) {
                        timeNum = 0;
                        $('.play:eq(' + game.present + ') li').removeClass();
                        if (game.present == 0) {
                            $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).addClass('select1');
                            str2 = $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).attr('data-poker');
                            arr2 = str2.split('_');
                            poker2 = {'number': arr2[0], 'color': arr2[1]};
                        } else if (game.present == 1) {
                            $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).addClass('select');
                            str2 = $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).attr('data-poker');
                            arr2 = str2.split('_');
                            poker2 = {'number': arr2[0], 'color': arr2[1]};
                        } else if (game.present == 2) {
                            $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).addClass('select2');
                            str2 = $('.play:eq(' + game.present + ') li').eq($('.play:eq(' + game.present + ') li').length - 1).attr('data-poker');
                            arr2 = str2.split('_');
                            poker2 = {'number': arr2[0], 'color': arr2[1]};
                        }
                        select_poker.list = [];
                        select_poker.list.push(poker2);
                        $('.getBtn').eq(game.present).find('.get').trigger("click");
                    } else {
                        $('.getBtn:eq(' + game.present + ') li').eq(1).trigger("click");
                    }
                }
            }, 1000);

            //点击提示，判断桌面上的牌的数量与牌型，自动选中可以打出的最小的牌；
            Prompt();

        }


        //提示按钮方法
        function Prompt() {
            var num = 0;
            $('.getBtn:eq('+game.present+')').find('.Prompt').on('click',function () {
                var playindex = 0;
                var arrNew = [];
                var one1 = [];//保存所有比桌面上的牌要大的单张下标;
                var two1 = [];//对子;
                var Three1 = [];//三张;
                var Four = [];//三带1
                var Five = [];//三带2
                var evenPoker = []; //顺子；
                num++;
                if(desktop.type == 0){
                    if(num > $('.play:eq('+game.present+') li').length){
                        num=1;
                    }
                    $('.play:eq(' + game.present + ') li').removeClass();
                    select_poker.list = [];
                    playindex = $('.play:eq(' + game.present + ') li').length - num;
                    promptPush(playindex);
                    // select_poker.list.push(poker2);
                }else{
                    if(desktop.list.length<$('.play:eq('+game.present+') li').length){
                        switch (desktop.type){
                            //提示单张
                            case 1:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++){
                                    if(desktop.max<parseInt(playArr[game.present].poker[i].number)){
                                        one1.push(i);
                                    }
                                }
                                $('.play:eq(' + game.present + ') li').removeClass();
                                select_poker.list = [];
                                if(num > one1.length){
                                    num = 1;
                                }
                                if(one1.length>0){
                                    promptPush(one1[one1.length-num]);
                                }else {
                                    alert('你没有要出的牌')
                                }
                                break;
                            //提示一对
                            case 2:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++){
                                    if(desktop.max<parseInt(playArr[game.present].poker[i].number)){
                                        if(parseInt(playArr[game.present].poker[i].number) == parseInt(playArr[game.present].poker[i+1].number)){
                                            arrNew = [i,i+1];
                                            two1.push(arrNew);
                                        }
                                    }
                                }
                                $('.play:eq(' + game.present + ') li').removeClass();
                                select_poker.list = [];
                                if(num > two1.length){
                                    num = 1;
                                }
                                if(two1.length>0){
                                    promptPush(two1[two1.length-num][0]);
                                    promptPush(two1[two1.length-num][1]);
                                }else {
                                    alert('你没有要出的牌')
                                }

                                break;
                            //三张
                            case 3:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++){
                                    if(desktop.max<parseInt(playArr[game.present].poker[i].number)){
                                        if(parseInt(playArr[game.present].poker[i].number) == parseInt(playArr[game.present].poker[i+2].number)){
                                            arrNew = [i,i+1,i+2];
                                            Three1.push(arrNew);
                                        }
                                    }
                                }
                                $('.play:eq(' + game.present + ') li').removeClass();
                                select_poker.list = [];
                                if(num > Three1.length){
                                    num = 1;
                                }
                                if(Three1.length>0){
                                    promptPush(Three1[Three1.length-num][0]);
                                    promptPush(Three1[Three1.length-num][1]);
                                    promptPush(Three1[Three1.length-num][2]);
                                }else {
                                    alert('你没有要出的牌')
                                }
                                break;
                            //三带1
                            case 4:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++){
                                    if(desktop.max<parseInt(playArr[game.present].poker[i].number)){
                                        if(parseInt(playArr[game.present].poker[i].number) == parseInt(playArr[game.present].poker[i+2].number)){
                                            if((i+2) == playArr[game.present].poker.length-1){
                                                arrNew = [i,i+1,i+2,playArr[game.present].poker.length-4];
                                                Four.push(arrNew);
                                            }else {
                                                arrNew = [i,i+1,i+2,playArr[game.present].poker.length-1];
                                                Four.push(arrNew);
                                            }
                                        }
                                    }
                                }
                                $('.play:eq(' + game.present + ') li').removeClass();
                                select_poker.list = [];
                                if(num > Four.length){
                                    num = 1;
                                }
                                if(Four.length>0){
                                    promptPush(Four[Four.length-num][0]);
                                    promptPush(Four[Four.length-num][1]);
                                    promptPush(Four[Four.length-num][2]);
                                    promptPush(Four[Four.length-num][3]);
                                }else {
                                    alert('你没有要出的牌')
                                }
                                break;
                            //三带2
                            case 5:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++){
                                    if(desktop.max<parseInt(playArr[game.present].poker[i].number)){
                                        if(parseInt(playArr[game.present].poker[i].number) == parseInt(playArr[game.present].poker[i+2].number)){
                                            for(var j=0;j<playArr[game.present].poker.length-1;j++){
                                                if(parseInt(playArr[game.present].poker[j].number) == parseInt(playArr[game.present].poker[j+1].number)){
                                                    if(parseInt(playArr[game.present].poker[i].number)!=parseInt(playArr[game.present].poker[j].number)&&
                                                        parseInt(playArr[game.present].poker[i].number)!=parseInt(playArr[game.present].poker[j+1].number)
                                                    ){
                                                        arrNew = [i,i+1,i+2,j,j+1];
                                                        Five.push(arrNew)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }

                                $('.play:eq(' + game.present + ') li').removeClass();
                                select_poker.list = [];
                                if(num > Five.length){
                                    num = 1;
                                }
                                if(Five.length>0){
                                    promptPush(Five[Five.length-num][0]);
                                    promptPush(Five[Five.length-num][1]);
                                    promptPush(Five[Five.length-num][2]);
                                    promptPush(Five[Five.length-num][3]);
                                    promptPush(Five[Five.length-num][4]);
                                }else {
                                    alert('你没有要出的牌')
                                }
                                break
                            //顺子
                            case 6:
                                for(var i=0;i<playArr[game.present].poker.length-1;i++) {
                                    playindex++;
                                    if (parseInt(playArr[game.present].poker[i].number) < 13) {
                                        if (desktop.max < parseInt(playArr[game.present].poker[i].number)) {
                                            evenPoker.push(i)
                                        }
                                    }
                                }
                                console.log(evenPoker);
                                smg();

                                // $('.play:eq(' + game.present + ') li').removeClass();
                                // select_poker.list = [];
                                // if(num > one1.length){
                                //     num = 1;
                                // }
                                // if(one1.length>0){
                                //     promptPush(one1[one1.length-num]);
                                // }else {
                                //     alert('你没有要出的牌')
                                // }
                                break;
                                break;
                        }


                    }else {
                        return;
                    }
                }
                function smg(i) {
                    i=i||0;
                    console.log(parseInt(playArr[game.present].poker[evenPoker[i]].number))
                    console.log(parseInt(playArr[game.present].poker[evenPoker[i+1]].number))
                    console.log(i)
                    for(i;i<evenPoker.length;i++){
                        if(parseInt(playArr[game.present].poker[evenPoker[i]].number) == parseInt(playArr[game.present].poker[evenPoker[i+1]].number)){
                            evenPoker.splice(i,1);
                            console.log(evenPoker);
                            return;
                            smg(0);

                        }
                    }
                }
            });

            //把提示出来的牌浮起，date-poker属性拆分
            function promptPush(index) {
                if (game.present == 0) {
                    $('.play:eq(' + game.present + ') li').eq(index).addClass('select1');
                    str2 = $('.play:eq(' + game.present + ') li').eq(index).attr('data-poker');
                    arr2 = str2.split('_');
                    poker2 = {'number': arr2[0], 'color': arr2[1]};
                } else if (game.present == 1) {
                    $('.play:eq(' + game.present + ') li').eq(index).addClass('select');
                    str2 = $('.play:eq(' + game.present + ') li').eq(index).attr('data-poker');
                    arr2 = str2.split('_');
                    poker2 = {'number': arr2[0], 'color': arr2[1]};
                } else if (game.present == 2) {
                    $('.play:eq(' + game.present + ') li').eq(index).addClass('select2');
                    str2 = $('.play:eq(' + game.present + ') li').eq(index).attr('data-poker');
                    arr2 = str2.split('_');
                    poker2 = {'number': arr2[0], 'color': arr2[1]};
                }
                select_poker.list.push(poker2);
            }
        }


        //桌子上的牌
        function tablePoker() {
            desktop.list = sortArr2(desktop.list);
            for (var i = 0; i < desktop.list.length; i++) {
                var li = makePoker(desktop.list[i]);
                $('.all_poker1').append(li);
                $('.all_poker1 li').addClass('aa');
                if (i > 11) {
                    $('.all_poker1 li').eq(i).css({'left': 300 + 40 * (i - 12) + 'px', 'top': 140 + 'px'});
                } else if (i > 5) {
                    $('.all_poker1 li').eq(i).css({'left': 300 + 40 * (i - 6) + 'px', 'top': 90 + 'px'});
                } else {
                    $('.all_poker1 li').eq(i).css({'left': 300 + 40 * i + 'px', 'top': 40 + 'px'});
                }
            }
        }

        //删除玩家手中打出去的牌
        function removerPoker(arr1, arr2) {
            for (var i = 0; i < arr1[game.present].poker.length; i++) {
                for (var j = 0; j < arr2.list.length; j++) {
                    if (arr1[game.present].poker[i].number == arr2.list[j].number &&
                        arr1[game.present].poker[i].color == arr2.list[j].color) {
                        arr2.list.splice(j, 1);
                        arr1[game.present].poker.splice(i, 1);
                        removerPoker(arr1, arr2);
                    }
                }
            }
            return;
        }

        // console.log(document.getElementsByClassName(".noget")   )
        // 定义玩家出的牌与桌面牌对比的方法
        function checkVS() {
            select_poker.list = sortArr2(select_poker.list);
            desktop.list = sortArr2(desktop.list);
            if (select_poker.type == 0) {
                return false;
            } else if (desktop.type == 0 || select_poker.type == 110 || select_poker.type == 100 && desktop.type != 110) {
                return true;
            } else if (select_poker.type == desktop.type && select_poker.list.length == desktop.list.length) {
                // 判断单张中的大小王

                if (select_poker.list[0].number == 14 && desktop.list[0].number == 14) {

                    if (select_poker.list[0].color > desktop.list[0].color) {
                        return true;
                    } else {

                        return false;
                    }
                }
                if (parseInt(select_poker.max) > parseInt(desktop.max)) {
                    return true;
                } else {

                    return false;
                }
            }
            return false;
        }

        // 定义检查牌型的方法
        function checkPoker() {
            // 1、先对玩家选择的牌进行重新排序
            select_poker.list = sortArr2(select_poker.list);
            select_poker.max = 0;
            select_poker.type = 0;
            /*
                牌型代码表
                1       单张
                2       对子
                3       三张
                4       三带一
                5       三带二
                6       顺子
                31      三个三带一的飞机
                32      二个三带二的飞机
                43      4个三带一的飞机
                56      5个三带一的飞机
                66      连对
                77      连续四个三的飞机
                777     连续五个三的飞机
                7777    连续六个三的飞机
                7       连续三个三的飞机
                8       二个三带一的飞机
                110     王炸

            */
            // 根据选择牌的数量来再进行判断牌型
            switch (select_poker.list.length) {
                // 一张牌
                case 1:
                    select_poker.type = 1;                          // 设置牌型为单张
                    select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                    return true;
                    break;
                // 两张牌
                case 2:
                    if (select_poker.list[0].number == select_poker.list[1].number) {
                        if (select_poker.list[0].number == 14) {
                            select_poker.type = 110;                       // 设置牌型为王炸
                            select_poker.max = 14;                          // 设置判断值为该牌的点数
                        } else {
                            select_poker.type = 2;                         // 设置牌型为对子
                            select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        }
                        return true;
                    }
                    break;
                // 三张牌
                case 3:
                    if (select_poker.list[0].number == select_poker.list[2].number) {
                        select_poker.type = 3;                          // 设置牌型为三张
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                // 四张牌
                case 4:
                    // 判断是否为炸弹
                    if (select_poker.list[0].number == select_poker.list[3].number) {
                        select_poker.type = 100;                            // 设置牌型为炸弹
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[0].number == select_poker.list[2].number ||
                        select_poker.list[1].number == select_poker.list[3].number) {
                        select_poker.type = 4;                          // 设置牌型为三带一
                        select_poker.max = select_poker.list[1].number;     // 设置判断值为该牌的点数
                        return true;
                        /*
                            3334
                            3444
                            5559
                            3666
                        */
                    }
                    break;
                // 五张牌
                case 5:
                    console.log(checkStraight());
                    // 判断是否为顺子
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        console.log(2);
                        return true;
                    } else if (select_poker.list[0].number == select_poker.list[2].number &&   // 判断三带二的方法
                        select_poker.list[3].number == select_poker.list[4].number ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number
                    ) {
                        select_poker.type = 5;                          // 设置牌型为三带二
                        select_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                // 六张牌
                case 6:
                    // 判断是否为顺子
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[0].number == select_poker.list[3].number ||
                        select_poker.list[1].number == select_poker.list[4].number ||
                        select_poker.list[2].number == select_poker.list[5].number) {
                        /*
                            333345
                            344445
                            345555
                        */
                        select_poker.type = 7;                          // 设置牌型为四带二
                        select_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                //七张牌
                case 7:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                //八张牌
                case 8:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {
                        return true;                            // 设置牌型为飞机
                                                                // 设置牌型为二个三带一的飞机
                    }
                    break;

                //九张牌
                case 9:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {


                        return true;                            // 设置牌型为飞机
                                                                // 设置牌型为三个三的飞机
                    }
                    break;

                //十张牌
                case 10:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {

                        return true;                            // 设置牌型为飞机
                                                                // 设置牌型为二个三带二的飞机
                    }
                    break;

                //十一张牌
                case 11:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }

                    break;

                //十二张牌
                case 12:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {
                        return true;                            // 设置牌型为飞机
                                                                // 设置牌型为三个三带一的飞机 和 设置牌型为连续四个三的飞机
                    }
                    break;

                //十三张牌
                case 13:
                    if (checkStraight()) {
                        select_poker.type = 6;                          // 设置牌型为顺子
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                //十四张牌
                case 14:
                    if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                //十五张牌
                case 15:
                    if (setAirplane()) {
                        return true;                            // 设置牌型为飞机
                    }                                                    // 设置牌型为连续个3的飞机
                //十六张牌
                case 16:
                    if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {

                        return true;                            // 设置牌型为飞机
                                                                // 设置牌型为4个三带一的飞机
                    }
                    break;
                //十八张牌
                case 18:
                    if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {
                        // 设置牌型为飞机
                        return true;                        // 设置牌型为4个三带一的飞机 和 设置牌型为连续个3的飞机
                    }

                    break;
                //二十张牌
                case 20:
                    if (checkTwoPairs()) {
                        select_poker.type = 66;                         // 设置牌型为连对
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (setAirplane()) {
                        // 设置牌型为飞机
                        return true;                                    // 设置牌型为5个三带一的飞机
                    }
                    break;

                default:
                    return false;
            }

            return false;
        }

        // 定义检查牌型为顺子的方法
        function checkStraight() {
            // 判断最大的值不能大于12
            if (select_poker.list[select_poker.list.length - 1].number > 12) {
                return false;
            }

            for (var i = 0; i < select_poker.list.length - 1; i++) {
                if (select_poker.list[i].number * 1 + 1 != select_poker.list[i + 1].number) {
                    return false;
                }
            }
            return true;
        }

        // 定义检查牌型为连对的方法
        function checkTwoPairs() {
            /*
                3344556677
                0123456789

            */
            // 判断最大的值不能大于12
            if (select_poker.list[select_poker.list.length - 1].number > 12) {
                return false;
            }

            // 单独判断最后两位的值是相等的
            if (select_poker.list[select_poker.list.length - 1].number != select_poker.list[select_poker.list.length - 2].number) {
                return false;
            }

            // 使用遍历方法来对牌型进行检查
            for (var i = 0; i < select_poker.list.length - 3; i += 2) {
                if (select_poker.list[i].number != select_poker.list[i + 1].number ||
                    select_poker.list[i].number != select_poker.list[i + 2].number - 1) {
                    return false;
                }
            }

            return true;
        }

        // 检查牌型是否为飞机的方法
        function setAirplane() {

            // 通过牌数来判断可能的牌型可能
            switch (select_poker.list.length) {
                case 6:
                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number
                    ) {
                        select_poker.type = 7;                              // 设置牌型为二个三的飞机
                        select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 8:
                    /*
                        33344456
                        34445556
                        34555666

                    */
                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number ||
                        select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[1].number == select_poker.list[4].number - 1 &&
                        select_poker.list[4].number == select_poker.list[6].number ||
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[5].number == select_poker.list[7].number
                    ) {
                        select_poker.type = 8;                              // 设置牌型为二个三带一的飞机
                        select_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;
                    }
                    break;
                case 9:
                    // 333444555
                    if (select_poker.list[select_poker.list.length - 3].number != select_poker.list[select_poker.list.length - 1].number) {
                        return false;
                    }
                    for (var i = 0; i < select_poker.list.length - 4; i += 3) {
                        if (select_poker.list[i].number != select_poker.list[i + 2].number ||
                            select_poker.list[i].number != select_poker.list[i + 3].number - 1
                        ) {
                            return false;
                        }
                    }
                    select_poker.type = 7;                              // 设置牌型为连续3个3的飞机
                    select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                    return true;
                    break;

                case 10:
                    //3334445566

                    //3344455566

                    //3344555666

                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number &&
                        select_poker.list[7].number == select_poker.list[8].number ||
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[9].number

                    ) {
                        select_poker.type = 32;                             // 设置牌型为二个三带二的飞机
                        select_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;

                    } else if (select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[9].number
                    ) {
                        select_poker.type = 32;                               // 设置牌型为二个三带二的飞机
                        select_poker.max = select_poker.list[4].number;   // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

                case 12:
                    //333 444555678
                    //344 455566678
                    //345 556667778

                    //345 666777888

                    //333444555666
                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[8].number ||


                        select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[1].number == select_poker.list[4].number - 1 &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[9].number ||


                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[2].number == select_poker.list[8].number - 2 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[8].number == select_poker.list[10].number
                    ) {
                        select_poker.type = 31;                                // 设置牌型为三个三带一的飞机
                        select_poker.max = select_poker.list[2].number;    // 设置判断值为该牌的点数
                        return true;


                    } else if (select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[11].number
                    ) {
                        select_poker.type = 31;                                // 设置牌型为三个三带一的飞机
                        select_poker.max = select_poker.list[3].number;    // 设置判断值为该牌的点数
                        return true;

                    } else if (select_poker.list[select_poker.list.length - 3].number != select_poker.list[select_poker.list.length - 1].number) {
                        return false;
                    }
                    for (var i = 0; i < select_poker.list.length - 4; i += 3) {
                        if (select_poker.list[i].number != select_poker.list[i + 2].number ||
                            select_poker.list[i].number != select_poker.list[i + 3].number - 1
                        ) {
                            return false;
                        }
                    }
                    select_poker.type = 77;                             // 设置牌型为连续4个3的飞机
                    select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                    return true;
                    break;

                case 15:
                    //333444555667788
                    //334445556667788

                    //334455566677788
                    //334455666777888

                    //333444555666777
                    if(	select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[0].number == select_poker.list[3].number-1 &&
                        select_poker.list[3].number == select_poker.list[6].number-1 &&
                        select_poker.list[9].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[14].number ||

                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[2].number == select_poker.list[5].number-1 &&
                        select_poker.list[5].number == select_poker.list[8].number-1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[11].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[14].number
                    ){
                        select_poker.type = 7772;                                // 设置牌型为连续三个三带二的飞机
                        select_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;

                    }else if(select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[4].number == select_poker.list[7].number-1 &&
                        select_poker.list[7].number == select_poker.list[10].number-1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[13].number == select_poker.list[14].number ||

                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[13].number &&
                        select_poker.list[12].number == select_poker.list[16].number &&
                        select_poker.list[6].number == select_poker.list[9].number-1 &&
                        select_poker.list[9].number == select_poker.list[12].number-1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number

                    ){select_poker.type = 7772;                                // 设置牌型为连续三个三带二的飞机
                        select_poker.max = select_poker.list[6].number;     // 设置判断值为该牌的点数
                        return true;

                    }else if(select_poker.list[select_poker.list.length-3].number != select_poker.list[select_poker.list.length-1].number){
                        return false;
                    }
                    for(let i=0; i<select_poker.list.length - 4; i+=3){
                        if( select_poker.list[i].number != select_poker.list[i+2].number ||
                            select_poker.list[i].number != select_poker.list[i+3].number-1
                        ){
                            return false;
                        }
                    }
                    select_poker.type = 777;                                // 设置牌型为连续五个三的飞机
                    select_poker.max = select_poker.list[0].number;     // 设置判断值为该牌的点数
                    return true;
                    break;

                case 16:
                    //33344455566678910
                    //34445556667778910
                    //34555666777888910

                    //3456777888999101010
                    //34566677788899910
                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 ||

                        select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[1].number == select_poker.list[4].number - 1 &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[10].number - 1 ||

                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[5].number == select_poker.list[8].number - 1 &&
                        select_poker.list[8].number == select_poker.list[11].number - 1 ||

                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[12].number - 1
                    ) {
                        select_poker.type = 43;                                // 设置牌型为4个三带一的飞机
                        elect_poker.max = select_poker.list[2].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[7].number == select_poker.list[10].number - 1 &&
                        select_poker.list[10].number == select_poker.list[13].number - 1 ||

                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[12].number - 1

                    ) {
                        select_poker.type = 43;                               // 设置牌型为4个三带一的飞机
                        select_poker.max = select_poker.list[4].number;   // 设置判断值为该牌的点数
                        return true;
                    }
                    break;


                case 18:
                    //333444555666777888
                    if (select_poker.list[select_poker.list.length - 3].number != select_poker.list[select_poker.list.length - 1].number) {
                        return false;
                    }
                    for (var i = 0; i < select_poker.list.length - 4; i += 3) {
                        if (select_poker.list[i].number != select_poker.list[i + 2].number ||
                            select_poker.list[i].number != select_poker.list[i + 3].number - 1
                        ) {
                            return false;
                        }
                    }
                    select_poker.type = 7777;                               // 设置牌型为连续六个三的飞机
                    select_poker.max = select_poker.list[0].number;         // 设置判断值为该牌的点数
                    return true;
                    break;

                case 20:
                    //33344455566677789101112
                    //34445556667778889101112
                    //34555666777888999101112

                    //3456667778889991010101112
                    //345677788899910101011111112
                    //3456788899910101011111111

                    //333444555666 7788991010
                    //33445566 777888999101010
                    //334455 6667778889991010
                    //3344 555666777888991010
                    //33 444555666777 889910

                    if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[11].number - 1 ||

                        select_poker.list[1].number == select_poker.list[3].number &&
                        select_poker.list[1].number == select_poker.list[4].number - 1 &&
                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[10].number - 1 &&
                        select_poker.list[10].number == select_poker.list[12].number - 1 ||

                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[5].number == select_poker.list[8].number - 1 &&
                        select_poker.list[8].number == select_poker.list[11].number - 1 &&
                        select_poker.list[11].number == select_poker.list[13].number - 1

                    ) {
                        select_poker.type = 53;                               // 设置牌型为5个三带一的飞机
                        select_poker.max = select_poker.list[2].number;   // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[15].number == select_poker.list[17].number &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[12].number - 1 &&
                        select_poker.list[12].number == select_poker.list[14].number - 1 ||

                        select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[18].number &&
                        select_poker.list[7].number == select_poker.list[10].number - 1 &&
                        select_poker.list[10].number == select_poker.list[13].number - 1 &&
                        select_poker.list[13].number == select_poker.list[15].number - 1 ||

                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[5].number == select_poker.list[8].number - 1 &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[17].number == select_poker.list[20].number &&
                        select_poker.list[8].number == select_poker.list[11].number - 1 &&
                        select_poker.list[11].number == select_poker.list[15].number - 1 &&
                        select_poker.list[14].number == select_poker.list[16].number - 1

                    ) {

                        select_poker.type = 53;                             // 设置牌型为5个三带一的飞机
                        select_poker.max = select_poker.list[5].number;     // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[0].number == select_poker.list[2].number &&
                        select_poker.list[0].number == select_poker.list[3].number - 1 &&
                        select_poker.list[3].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[3].number == select_poker.list[6].number - 1 &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[12].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number ||

                        select_poker.list[2].number == select_poker.list[4].number &&
                        select_poker.list[2].number == select_poker.list[5].number - 1 &&
                        select_poker.list[5].number == select_poker.list[7].number &&
                        select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[5].number == select_poker.list[8].number - 1 &&
                        select_poker.list[8].number == select_poker.list[11].number - 1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[14].number == select_poker.list[15].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number
                    ) {
                        select_poker.type = 53;                                // 设置牌型为5个三带一的飞机
                        select_poker.max = select_poker.list[2].number;    // 设置判断值为该牌的点数
                        return true;
                    } else if (select_poker.list[8].number == select_poker.list[10].number &&
                        select_poker.list[8].number == select_poker.list[11].number - 1 &&
                        select_poker.list[11].number == select_poker.list[13].number &&
                        select_poker.list[14].number == select_poker.list[16].number &&
                        select_poker.list[17].number == select_poker.list[19].number &&
                        select_poker.list[11].number == select_poker.list[14].number - 1 &&
                        select_poker.list[14].number == select_poker.list[17].number - 1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[6].number == select_poker.list[7].number ||


                        select_poker.list[6].number == select_poker.list[8].number &&
                        select_poker.list[6].number == select_poker.list[9].number - 1 &&
                        select_poker.list[9].number == select_poker.list[11].number &&
                        select_poker.list[12].number == select_poker.list[14].number &&
                        select_poker.list[15].number == select_poker.list[17].number &&
                        select_poker.list[9].number == select_poker.list[12].number - 1 &&
                        select_poker.list[12].number == select_poker.list[15].number - 1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[4].number == select_poker.list[5].number &&
                        select_poker.list[18].number == select_poker.list[19].number


                    ) {
                        select_poker.type = 53;                                // 设置牌型为5个三带一的飞机
                        select_poker.max = select_poker.list[8].number;    // 设置判断值为该牌的点数
                        return true;

                    } else if (select_poker.list[4].number == select_poker.list[6].number &&
                        select_poker.list[4].number == select_poker.list[7].number - 1 &&
                        select_poker.list[7].number == select_poker.list[9].number &&
                        select_poker.list[10].number == select_poker.list[12].number &&
                        select_poker.list[13].number == select_poker.list[15].number &&
                        select_poker.list[7].number == select_poker.list[10].number - 1 &&
                        select_poker.list[10].number == select_poker.list[13].number - 1 &&
                        select_poker.list[0].number == select_poker.list[1].number &&
                        select_poker.list[2].number == select_poker.list[3].number &&
                        select_poker.list[16].number == select_poker.list[17].number &&
                        select_poker.list[18].number == select_poker.list[19].number


                    ) {
                        select_poker.type = 53;                             // 设置牌型为5个三带一的飞机
                        elect_poker.max = select_poker.list[4].number;  // 设置判断值为该牌的点数
                        return true;
                    }
                    break;

            }
        }
    }
});

