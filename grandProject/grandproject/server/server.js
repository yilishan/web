const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 连接mongodb,并且使用grandproject这个集合
const dbUrl = 'mongodb://localhost:27017/grandproject';
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function(){
    console.log('mongo db connect success!');
});
// mongo 有文档概念，类似于MySQL中的表
// 定义文档模型，Schema和model新建模型
const User = mongoose.model('user', new mongoose.Schema({
    user: {type: String, require: true},
    age:{type: Number, require: true},
}));
// 增
User.create({
    user: 'xiaoming' + Math.floor(Math.random(100)*100),
    age: Math.floor(Math.random(100)*90),
}, function(err, doc){
    if(!err){
        console.log(doc);
    }else{
        console.log(err);
    }
});

// 删除
User.remove({age: 3}, function(err, doc){
    console.log(doc);
});

// 修改
User.update({'user': 'xiaoming'},{'$set': {age: 888}}, function(err, doc){
    console.log(doc);
});

// 查, 传入空值，可以查询所有, findOne查找一条
let userList;
User.find({}, function(err, doc){
    if(!err){
        console.log(doc);
        userList = doc;
    }else{
        console.log(err);
    }
});


app.get('/', function(req, res){
    res.send('<h1>这是返回的结果，哈哈哈</h1>');
});

app.get('/data', function(req, res){
    res.json(userList);
});

app.listen(9093,function(){
    console.log('yilishan: hello, 9093.');
});