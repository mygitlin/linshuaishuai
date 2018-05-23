let path = require('path');
let hbs = require('hbs');
let express = require('express');
let app = express();
let querystring = require("querystring");
let mysql = require('./abc/mysql');


// 设定port变量，意为访问端口
app.set('port', process.env.PORT || 8888);

// 设定views变量，意为视图存放的目录
app.set('views', path.join(__dirname, 'views'));

// 设定使用的模板的后缀名
app.set('view engine', 'html');

// 运行模板方法
app.engine('html', hbs.__express);

// 所有不是HTML请求内容都会指向到当前目录中的public目录中去
app.use(express.static(path.join(__dirname)));



//无跳转翻页
let api = require('./abc/api');
app.get('/apiFlip/:p',api.getList);








let aa = '';//总页数
//首页渲染
app.get('/index', function(req, res) {
    mysql.getSql2(function(list){
        aa = Math.ceil(list.length/7);
        for(let i=0;i<aa;i++){
            let bb = i*7;
            app.get('/index/'+(i+1),function (req,res) {
                // mysql.getSql2(function(list){
                //     aa = Math.ceil(list.length/7);
                // });
                mysql.getSql(function(list){
                    res.render('index', {data: list,len:aa});
                },bb);
                // xuanran(res,bb)
            })
        }
    });
    mysql.getSql(function(list){
        res.render('index', {data: list,len:aa});
    },0);

});
// 添加
app.get('/add',function (req,res) {
    res.render('add',{Title:'添加'})
});
// 修改
app.get('/change/:id',function (req,res) {
    let id = req.params.id;
    mysql.changeSqlList(id,function(result){
        res.render('change', {title:'修改',data: result});
    });
});
// 删除
app.get('/end/:id',function (req,res) {
    let id = req.params.id;
    mysql.delList(id,function () {
        let aa = '';
        mysql.getSql2(function(list){
            aa = Math.ceil(list.length/7);
        });
        mysql.getSql(function(list){
            res.render('index', {data: list,len:aa});
        },0);
    })
});
//跳转页



// 添加提交
app.post('/add',function (req, res) {
    let post='';
    req.on('data',function (data) {
        post += data;
        post = querystring.parse(post);
    });
    req.on('end',function () {
        mysql.addSqlList(post,function (result) {
            if(result){
                // res.render('end', {tishi:'添加成功！3秒后跳转到列表页。', url: '/index'});
                let aa = '';
                mysql.getSql2(function(list){
                    aa = Math.ceil(list.length/7);
                });
                mysql.getSql(function(list){
                    // res.render('index', {data: list,len:aa});
                    res.redirect('/index');
                },0);
            }else{
                res.send('输入有误，请重新提交')
            }
        })
    })
});
// 修改提交
app.post('/change',function (req,res) {
    let post='';
    req.on('data',function (data) {
        post += data;
    });
    req.on('end',function () {
        post = querystring.parse(post);
        mysql.changeList(post ,function (result) {
            if(result){
                // res.render('end', {tishi:'修改成功！3秒后跳转到列表页。', url: '/index'});
                let aa = '';
                mysql.getSql2(function(list){
                    aa = Math.ceil(list.length/7);
                });
                mysql.getSql(function(list){
                    // res.render('index', {data: list,len:aa});
                    res.redirect('/index')
                },0);
            }else{
                res.send('输入有误，请重新提交')
            }
        })
    })
});
// 查询提交
app.post('/index',function (req,res) {
    let post='';
    req.on('data',function (data) {
        post += data;
    });
    req.on('end',function () {
        post = querystring.parse(post);
        if(post.name == ''){
            let sql = 'update `shoplist` set status = 1 where status = 0' ;
            mysql.queryListchange(sql,function (result) {
                if(result){
                    let aa = '';
                    mysql.getSql2(function(list){
                        aa = Math.ceil(list.length/7);
                    });
                    mysql.getSql(function(list){
                        res.render('index', {data: list,len:aa});
                    },0);
                }else {
                    res.send('查询失败，请输入正确商品名称')
                }
            })
        }else {
            let sql = 'update `shoplist` set status = 0 where name <>"'+post.name+'"';
            let sql2 = 'update `shoplist` set status = 1 where name ="'+post.name+'"';
            mysql.queryListchange(sql,function (result) {
                if(result){
                    mysql.queryListchange(sql2,function (result) {
                        // console.log(result);
                        if(result){
                            let aa = '';
                            mysql.getSql2(function(list){
                                aa = Math.ceil(list.length/7);
                            });
                            mysql.getSql(function(list){
                                res.render('index', {data: list,len:aa});
                            },0);
                        }else {
                            res.send('查询失败，请输入正确商品名称')
                        }
                    })
                }else {
                    res.send('查询失败，请输入正确商品名称')
                }
            })
        }
    })
})

// app.post('/index',function (req,res) {
//     let post = '';
//     req.on('data', function (data) {
//         post += data;
//
//     });
//     req.on('end', function () {
//         post = querystring.parse(post);
//         if (post.name == '') {
//             let sql = 'select * from shoplist where status <> -1';
//             mysql.queryListchange(sql,function(list){
//                 console.log(list)
//             });
//         }else {
//             let aa = '';
//             mysql.queryListchange(post,function (result) {
//                 if(result){
//                     aa = Math.ceil(result.length/7);
//                     for(let i=0;i<aa;i++){
//                         let bb = i*7;
//                         mysql.queryListchange(post,bb,function(list){
//                             res.render('index', {data: list,len:aa});
//                         });
//                     }
//                 }else {
//                     res.send('查询失败，请输入正确商品名称')
//                 }
//             })
//         }
//     })
// })

function xuanran(res,bb) {
    mysql.getSql(aa,bb);
    function aa(list){
        res.render('index', {data: list,len:aa});
    }
}

app.listen(8888, function(){
    console.log('	服务已经开启，端口为：');
});