let mysql = require('../abc/mysql');

exports.getList = function (req,res) {
    let p = req.params.p;
    let num = 0;
    let css = '';
    mysql.selectlen(function (list) {
        num = list[0].count;
        num = Math.ceil(num/7);
    });
    let deep_html = '';//翻页HTML文本
    let lim = (p-1)*7;
    // console.log(lim)


    mysql.getSql(function(list){
        deep_html += "<span>共<span>"+num+"</span>页</span>"
        deep_html += "<li><a href='/apiFlip/1'>\<<\</a></li>";
        if(p>1){
            deep_html += "<li><a href='/apiFlip/"+(p-1)+"'>\<\</a></li>";
        }else {
            deep_html += "<li><a href='/apiFlip/1'>\<\</a></li>";
        }
        if(p<4){
            for(let i=1;i<6;i++){
                css = (p == i)?'back_color':'';
                deep_html+="<li class="+css+"><a href='/apiFlip/"+i+"'>"+i+"</a></li>";
            }
            deep_html += "<li>...</li>"
        }else if(p>3&&p<num-2){
            for(let i=p-2;i<(p*1+3);i++){
                css = (p == i)?'back_color':'';
                deep_html+="<li class="+css+"><a href='/apiFlip/"+i+"'>"+i+"</a></li>";
            }
            deep_html += "<li>...</li>"
        }else if(p>=num-2){
            deep_html += "<li>...</li>"
            for(let i=num-4;i<=num;i++){
                css = (p == i)?'back_color':'';
                deep_html+="<li class="+css+"><a href='/apiFlip/"+i+"'>"+i+"</a></li>";
            }
        }
        if(p<num){
            deep_html += "<li><a href='/apiFlip/"+(p*1+1)+"'>\>\</a></li>";
        }else {
            deep_html += "<li><a href='/apiFlip/"+num+"'>\>\</a></li>";
        }
        deep_html += "<li><a href='/apiFlip/"+num+"'>\>>\</a></li>";

        let json = {list:list,deep_html:deep_html};
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(JSON.stringify(json))
    },lim);
}