const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/grandproject';
// mongo 有文档概念，类似于MySQL中的表
// 定义文档模型，Schema和model新建模型
const User = mongoose.model('user', new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true}
}));

// 连接mongodb,并且使用grandproject这个集合
exports.dbConnect = function(){
    mongoose.connect(dbUrl);
    mongoose.connection.on('connected', function () {
        console.log('mongo db connect success!');
    });
};

// 增
exports.dbCreate = function(){
    User.create({
        username: 'xiaoming' + Math.floor(Math.random(100)*100),
        password: '123',
    }, function(err, doc){
        if(!err){
            console.log(doc);
        }else{
            console.log(err);
        }
    });
};
    
// 删除
exports.dbRemove = function(){
    User.remove({age: 3}, function(err, doc){
        console.log(doc);
    });
};

// 清空数据库
exports.dbClear = function(){
    User.remove({}, function(err, doc){
        console.log(doc);
    });
};


// 修改
exports.Update = function(){
    User.update({'user': 'xiaoming'},{'$set': {age: 888}}, function(err, doc){
        console.log(doc);
    });
};


// 查, 传入空值，可以查询所有, findOne查找一条
exports.dbFind = function(para){
    return User.find(para, {username: 0, password: 0, __v: 0}, function(err, doc){
        if(!err){
            // console.log(doc);
        }else{
            console.log(err);
        }
    });
};
