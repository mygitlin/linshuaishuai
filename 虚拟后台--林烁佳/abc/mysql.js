let mysql = require('mysql');


let connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:"3306",    //默认服务器端口3306
    database:"4-14sql"
});

connection.connect(function (err) {
    if(err){
        return ;
    }
    console.log('连接成功')
});

exports.getSql = function (fun,data) {
    let sql = 'select * from `shoplist` where status = 1 order by id desc limit '+data+',7';
    connection.query(sql,function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        fun(result);
    })
};
exports.getSql2 = function (fun) {
    let sql = 'select * from `shoplist` where status = 1';
    connection.query(sql,function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        fun(result);
    })
};
exports.addSqlList = function (data,fun) {
    let sql = 'insert into `shoplist` (name,text,num,money) values(?,?,?,?)';
    let params = [data.name,data.text,data.num,data.money];
    connection.query(sql,params,function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        fun(result);
    })
};

exports.changeSqlList = function (id,fun) {
    let sql = 'select * from `shoplist` where id ='+id;
    connection.query(sql,function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        fun(result[0]);
    })
};

exports.changeList = function (data,fun) {
    let sql = 'update `shoplist` set name = "'+data.name+'",text = "'+data.text+'",num = "'+data.num+'",money = "'+data.money+'" where id = "'+data.id+'"';
    // console.log(data)
    connection.query(sql,function (err,result) {
        if(err){
            // console.log(err);
            return;
        }
        fun(result);
    })
}

exports.delList = function (id,fun) {
    let sql = 'delete from `shoplist` where id='+id;
    connection.query(sql,function (err,result) {
        if(err){
            return;
        }
        fun(result);
    })
};


// 查询
// exports.queryList = function (data,fun) {
//     let sql = 'select * from `shoplist` where name like "%'+data.name+'%" status !=-1 order by id desc';
//     connection.query(sql,function (err,result) {
//         if(err){
//             console.log(err);
//             return;
//         }
//         fun(result[0]);
//     })
// };
exports.queryListchange = function (data,fun) {
    connection.query(data,function (err,result) {
        if(err){
            console.log('查询失败')
            return;
        }
        fun(result);
    })
}
exports.queryListchange2 = function (data,fun) {
    connection.query(data,function (err,result) {
        if(err){
            console.log('查询失败')
            return;
        }
        fun(result);
    })
}

exports.selectlen = function (fun) {
    let sql = 'select count(*) as count from `shoplist`';
    connection.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result)
    })
}