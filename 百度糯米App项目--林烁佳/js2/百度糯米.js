$(function () {

    if($(document).scrollTop()>0) {
        $('.search').addClass('abso')
        $('.hd_box1').addClass('hd_box1_bg');
        $('.hd_top span').addClass('hd_top_color2');
        $('.hd_top span i').addClass('hd_top_color2');
        $('.btn_search').addClass('btn_search_bg');
    }

    $(document).scroll(function () {
        if ($(document).scrollTop() > 0) {
            $('.search').addClass('abso');
            $('.hd_box1').addClass('hd_box1_bg');
            $('.hd_top span').addClass('hd_top_color2');
            $('.hd_top span i').addClass('hd_top_color2');
            $('.btn_search').addClass('btn_search_bg');

        } else if ($(document).scrollTop() === 0) {
            $('.search').removeClass('abso');
            $('.hd_box1').removeClass('hd_box1_bg');
            $('.hd_top span').removeClass('hd_top_color2');
            $('.hd_top span i').removeClass('hd_top_color2');
            $('.btn_search').removeClass('btn_search_bg');
        }

        if($(document).scrollTop()>400){
            $('.Gtop').css('display','block');
        }else {
            $('.Gtop').css('display','none');
        }
    });
    // 小轮播
    SmallTime();
    // 拖拽
    let mx = 0;
    let ex = 0;
    let hx = 0;
    let time;
    $('.Drag_img').on('mousedown',function (e) {
        clearInterval(time);
        let width = Math.round($('.ul_Drag_img li').width());
        mx = e.pageX || e.clientX;
        let left1 = parseInt($('.ul_Drag_img').css('left'));
        $(this).on('mousemove',function (e) {
            ex = e.pageX || e.clientX;
            hx = ex - mx;
            if(left1 >= 0 && hx>0){
                $('.ul_Drag_img').css({'left':left1++});
            }else {
                let left3 = parseInt($('.ul_Drag_img').css('left'));
                if (left3< -width*($('.ul_Drag_img li').length/2)) {
                    $('.ul_Drag_img').css({'left':left3-1});
                }else if(left3 > 0){
                    $('.ul_Drag_img').css({'left':left3+1});
                }
                else {
                    hx = left1+hx;
                    $('.ul_Drag_img').css({'left':hx});
                }
            }
        });
        $(window).on('mouseup',function () {
            clearInterval(time);
            $('.Drag_img').off('mousemove');
            let left2 = Math.round(parseInt($('.ul_Drag_img').css('left')))
            let a = left2/width>0?Math.floor(left2/width):Math.round(left2/width);
            $('.ul_Drag_img').animate({'left':a*width},300);
            time = setInterval(function () {
                let left2 = Math.round(parseInt($('.ul_Drag_img').css('left')))
                if(left2 != a*width){
                    $('.ul_Drag_img').css({'left':left2+1})
                }else {
                    $(window).off('mouseup')
                    clearInterval(time);
                }
            },20)
        })
    })
    //panner小轮播
    pannerTime();
    //猜你喜欢
    let h4Arr = ['湘邻呷铺(市桥店)','台湾贡茶','悦和盛(罗冲店)','焱鱼新派古道烤鱼(黄边店)','南森汽车改色贴膜','望谷温泉度假村','湘邻呷铺(市桥店)','台湾贡茶','悦和盛(罗冲店)','焱鱼新派古道烤鱼(黄边店)','南森汽车改色贴膜','望谷温泉度假村','湘邻呷铺(市桥店)','台湾贡茶','悦和盛(罗冲店)','焱鱼新派古道烤鱼(黄边店)','南森汽车改色贴膜','望谷温泉度假村'];
    let localArr = ['市桥','新市','罗冲围','黄石','黄石','从化','市桥','新市','罗冲围','黄石','黄石','从化','市桥','新市','罗冲围','黄石','黄石','从化'];
    let priceArr = ['51','14.5','10','55','5000','430','51','14.5','10','55','5000','430','51','14.5','10','55','5000','430'];
    let footext = ['适合聚会的好去处','玫瑰奶盖 | 香米抹茶红豆','味道不错','蒜香味烤鱼 | 小龙虾','100%用户好评商家','100%用户好评商家','适合聚会的好去处','玫瑰奶盖 | 香米抹茶红豆','味道不错','蒜香味烤鱼 | 小龙虾','100%用户好评商家','100%用户好评商家','适合聚会的好去处','玫瑰奶盖 | 香米抹茶红豆','味道不错','蒜香味烤鱼 | 小龙虾','100%用户好评商家','100%用户好评商家'];
    let imgArr = [
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg'
        ],
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=f2634cf16bd9f2d320442ce990dca627/1ad5ad6eddc451da085c7ffbbffd5266d0163273.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=de3f899f6581800a6eb0810888051fce/d439b6003af33a87e637700acf5c10385343b543.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=8983c0383f7adab43d851345b2e49f28/6609c93d70cf3bc7eea7befcd800baa1cd112a7e.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=b57e9d59a1773912d069df21c529aa28/b3fb43166d224f4a63d9a8f701f790529922d196.jpg',
            'https://ss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=3d1d560a9482d158afcd03f1bd3a35e8/ac6eddc451da81cbd5cf53295a66d0160924312d.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/w%3D470%3Bq%3D52%3Bc%3Dnuomi%2C95%2C95/sign=23ffbb76d11b0ef46ce89959edff20e7/500fd9f9d72a6059a21012422b34349b033bba62.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C21%2C690%2C418%3Bw%3D470%3Bq%3D80/sign=8d1a4ec44934970a533c4a6fa8fafdfa/d1160924ab18972bf1ce8621eecd7b899f510a60.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=331b88054e10b912ab8eacbefecdd033/42a98226cffc1e177488438f4390f603738de95e.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=d208f2f50e23dd54353cfd28ec399fee/50da81cb39dbb6fd4b7d6bb70e24ab18972b3778.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=1f2c6d4740540923be26393eaf68fd39/9922720e0cf3d7cae956ac12fb1fbe096b63a936.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=28b2fd3726738bd4d06ee8719cbbabe6/b03533fa828ba61e5ad54ac54934970a304e5925.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=6e749f55283fb80e189e3b970be1031e/e824b899a9014c08019bbbc1037b02087bf4f436.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D36%2C0%2C928%2C562%3Bw%3D719%3Bq%3D79/sign=b53d99f2b63eb1355088edfb9b2d9eff/7e3e6709c93d70cf0ef01f17f2dcd100baa12ba5.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e479fe1b8d44ebf8793e3e7fe4c9fb1a/e4dde71190ef76c628f63c339716fdfaaf516786.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e5c2005f3312b31bd3239769bb281a4a/6a63f6246b600c33110b42d0104c510fd9f9a1bc.jpg'
        ],
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg'
        ],
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=f2634cf16bd9f2d320442ce990dca627/1ad5ad6eddc451da085c7ffbbffd5266d0163273.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=de3f899f6581800a6eb0810888051fce/d439b6003af33a87e637700acf5c10385343b543.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=8983c0383f7adab43d851345b2e49f28/6609c93d70cf3bc7eea7befcd800baa1cd112a7e.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=b57e9d59a1773912d069df21c529aa28/b3fb43166d224f4a63d9a8f701f790529922d196.jpg',
            'https://ss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=3d1d560a9482d158afcd03f1bd3a35e8/ac6eddc451da81cbd5cf53295a66d0160924312d.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/w%3D470%3Bq%3D52%3Bc%3Dnuomi%2C95%2C95/sign=23ffbb76d11b0ef46ce89959edff20e7/500fd9f9d72a6059a21012422b34349b033bba62.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C21%2C690%2C418%3Bw%3D470%3Bq%3D80/sign=8d1a4ec44934970a533c4a6fa8fafdfa/d1160924ab18972bf1ce8621eecd7b899f510a60.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=331b88054e10b912ab8eacbefecdd033/42a98226cffc1e177488438f4390f603738de95e.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=d208f2f50e23dd54353cfd28ec399fee/50da81cb39dbb6fd4b7d6bb70e24ab18972b3778.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=1f2c6d4740540923be26393eaf68fd39/9922720e0cf3d7cae956ac12fb1fbe096b63a936.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=28b2fd3726738bd4d06ee8719cbbabe6/b03533fa828ba61e5ad54ac54934970a304e5925.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=6e749f55283fb80e189e3b970be1031e/e824b899a9014c08019bbbc1037b02087bf4f436.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D36%2C0%2C928%2C562%3Bw%3D719%3Bq%3D79/sign=b53d99f2b63eb1355088edfb9b2d9eff/7e3e6709c93d70cf0ef01f17f2dcd100baa12ba5.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e479fe1b8d44ebf8793e3e7fe4c9fb1a/e4dde71190ef76c628f63c339716fdfaaf516786.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e5c2005f3312b31bd3239769bb281a4a/6a63f6246b600c33110b42d0104c510fd9f9a1bc.jpg'
        ],
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=9ffe47c0bb1bb0518f71bb2e0f4af680/d0c8a786c9177f3e5180b7ef78cf3bc79e3d569f.jpg'
        ],
        [
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=f2634cf16bd9f2d320442ce990dca627/1ad5ad6eddc451da085c7ffbbffd5266d0163273.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=de3f899f6581800a6eb0810888051fce/d439b6003af33a87e637700acf5c10385343b543.jpg',
            'https://ss0.bdstatic.com/7LsWdDW5_xN3otebn9fN2DJv/bainuo/wh%3D690%2C460%3Bq%3D90%3Bc%3Dnuomi%2C95%2C95/sign=8983c0383f7adab43d851345b2e49f28/6609c93d70cf3bc7eea7befcd800baa1cd112a7e.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=b57e9d59a1773912d069df21c529aa28/b3fb43166d224f4a63d9a8f701f790529922d196.jpg',
            'https://ss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/bainuo/crop%3D0%2C0%2C1280%2C852%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=3d1d560a9482d158afcd03f1bd3a35e8/ac6eddc451da81cbd5cf53295a66d0160924312d.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/w%3D470%3Bq%3D52%3Bc%3Dnuomi%2C95%2C95/sign=23ffbb76d11b0ef46ce89959edff20e7/500fd9f9d72a6059a21012422b34349b033bba62.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C21%2C690%2C418%3Bw%3D470%3Bq%3D80/sign=8d1a4ec44934970a533c4a6fa8fafdfa/d1160924ab18972bf1ce8621eecd7b899f510a60.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=331b88054e10b912ab8eacbefecdd033/42a98226cffc1e177488438f4390f603738de95e.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C690%2C460%3Bw%3D690%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=d208f2f50e23dd54353cfd28ec399fee/50da81cb39dbb6fd4b7d6bb70e24ab18972b3778.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=1f2c6d4740540923be26393eaf68fd39/9922720e0cf3d7cae956ac12fb1fbe096b63a936.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=28b2fd3726738bd4d06ee8719cbbabe6/b03533fa828ba61e5ad54ac54934970a304e5925.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C800%2C533%3Bw%3D640%3Bq%3D84/sign=6e749f55283fb80e189e3b970be1031e/e824b899a9014c08019bbbc1037b02087bf4f436.jpg'
        ],
        [
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D36%2C0%2C928%2C562%3Bw%3D719%3Bq%3D79/sign=b53d99f2b63eb1355088edfb9b2d9eff/7e3e6709c93d70cf0ef01f17f2dcd100baa12ba5.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e479fe1b8d44ebf8793e3e7fe4c9fb1a/e4dde71190ef76c628f63c339716fdfaaf516786.jpg',
            'https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/bainuo/crop%3D0%2C0%2C640%2C360%3Bw%3D470%3Bq%3D99%3Bc%3Dnuomi%2C95%2C95/sign=e5c2005f3312b31bd3239769bb281a4a/6a63f6246b600c33110b42d0104c510fd9f9a1bc.jpg'
        ]

    ];
    let newLength = 6;
    for(let i=0;i<newLength;i++){
        new Like_new({
            pran: $('.plate4'),
            h4text: h4Arr[i],
            local: localArr[i],
            price: priceArr[i],
            imgArr: imgArr[i],
            text:footext[i]
        })
    }
    $('.main_foot').on('click',function () {
        for(let i=newLength;i<newLength+6;i++){
            new Like_new({
                pran: $('.plate4'),
                h4text: h4Arr[i],
                local: localArr[i],
                price: priceArr[i],
                imgArr: imgArr[i],
                text:footext[i]
            })
        }
        newLength +=6;
        if(newLength == h4Arr.length){
            $('.main_foot span').text('没有更多了');
            $('.main_foot').off('click')
        }
    });
    $('.Gtop').on('click',function () {
        $(document).scrollTop('0');
    })



});
function SmallTime() {
    let i = 0;
    setInterval(function () {
        i++;
        if(i<5){
            $('.img_main').animate({'top': -i*83},500);
        }else {
            i=1;
            $('.img_main').css({'top':0}).animate({'top': -83},500);
        }
    },2500)
}
function pannerTime() {
    let index = 0;
    setInterval(function () {
        $('.plate3 ul li').eq(index).animate({'opacity':0},500);
        if(index+1 == $('.plate3 ul li').length){
            index = 0
            $('.plate3 ul li').eq(index).animate({'opacity':1},500);
        }else {
            $('.plate3 ul li').eq(index+1).animate({'opacity':1},500);
        }
        index++;
    },3000)
}

// 猜你喜欢
function Like_new(json) {
    this.$pran = json.pran;
    this.$h4text = json.h4text;
    this.$local = json.local;
    this.$price = json.price;
    this.$imgArr = json.imgArr;
    this.$text = json.text;
    this.initElements();
}
Like_new.prototype = {
    constructor:Like_new,
    initElements:function () {
        this.$section = $('<section />');
        this.$section.addClass('like_plate');
        this.$a = $('<a href="#" />');
        this.hr = $('<hr>')

        this.h4 = $('<h4 />');
        this.h4.text(this.$h4text);

        this.div = $('<div />');
        this.div.addClass('l_p');
        this.span1 = $('<span />');
        this.span2 = $('<span />');
        this.span1.addClass('local');
        this.span2.addClass('price');
        this.span1.text(this.$local);
        this.span2.text(this.$price);
        this.div.append(this.span1).append(this.span2)

        this.ul = $('<ul />')
        this.ul.addClass('like_img');
        for(let i=0;i<this.$imgArr.length;i++){
            this.ul.append('<li><img src="'+this.$imgArr[i]+'" /></li>')
        }

        this.span3 = $('<span />');
        this.span3.text(this.$text).addClass('foottext');

        this.$a.append(this.h4).append(this.div).append(this.ul).append(this.span3);
        this.$section.append(this.$a);

        this.$pran.append(this.$section).append(this.hr);
    }
};


