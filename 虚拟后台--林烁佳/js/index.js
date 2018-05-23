$(function () {
    // 删除弹框
    for(let i=0;i<$('.node').length;i++){
        let a = $('.node').eq(i).find('.del').attr('href');
        $('.del').eq(i).on('click',function () {
            let r = confirm("尊重的用户，请确定要删除本条数据吗？如果不是，请点击取消！")
            if (r==true){
                $('.node').eq(i).find('.del').attr('href','/end/'+a+'');
            }else {
                $('.node').eq(i).find('.del').attr('href','');
            }
        })
    }


    // 跳转页数

    // for(let i=1;i<6;i++){
    //     $('#deep').append("<li><a href='/apiFlip/"+i+"'>"+i+"</a></li>");
    // }

    let deep_html = '';
    let css = '';
    deep_html += "<li><a href='/apiFlip/1'>\<<\</a></li>";
    deep_html += "<li><a href='/apiFlip/1'>\<\</a></li>";
    for(let i=1;i<6;i++){
        css = (i==1)?'back_color':''
        deep_html+="<li class="+css+"><a href='/apiFlip/"+i+"'>"+i+"</a></li>";
    }
    deep_html += "<li>...</li>"
    deep_html += "<li><a href='/apiFlip/2'>\>\</a></li>";
    deep_html += "<li><a href='/apiFlip/"+($('.node').length-1)+"'>\>>\</a></li>";


    $('#deep').append(deep_html);
    $('#deep').on('click','li a',function () {

        let url = $(this).attr('href');
        $.ajax({
            type:"GET",
            url: url,
            dataType:"json",
            success:function (json) {
                let list = json.list;
                let list_html = '';
                for(let i =0;i<list.length;i++){
                    list_html +='<ul class="node">';
                    list_html +=    '<li>'+list[i].id+'</li>';
                    list_html +=    '<li>'+list[i].name+'</li>';
                    list_html +=    '<li>'+list[i].text+'</li>';
                    list_html +=    '<li>'+list[i].num+'</li>';
                    list_html +=    '<li>'+list[i].money+'</li>';
                    list_html +=    '<li>';
                    list_html +=        '<a href="/change/'+list[i].id+'">编辑</a>';
                    list_html +=        '<span> / </span>';
                    list_html +=        '<a href="'+list[i].id+'" class="del">删除</a>';
                    list_html +=    '</li>';
                    list_html +='</ul>';
                }
                $('#textList').html(list_html);
                console.log(json.deep_html)
                $('#deep').html(json.deep_html);
            },
            error: function(err){
                console.log(err);
            }
        });
        return false;
    })
});