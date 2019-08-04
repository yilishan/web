const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/grandproject';

// 连接mongodb,并且使用grandproject这个集合
exports.dbConnect = function () {
    mongoose.connect(dbUrl);
    mongoose.connection.on('connected', function () {
        console.log('mongo db connect success!');
    });
};

// mongo 有文档概念，类似于MySQL中的表
// 定义文档模型，Schema和model新建模型
exports.User = mongoose.model('user', new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    username: { type: String, require: true },
    password: { type: String, require: true },
    identity: { type: String, require: true },
    department: { type: String, require: true },
}));

exports.Product = mongoose.model('product', new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    productName: { type: String, require: true },
    productNo: { type: String, require: true },
    contractNo: { type: String, require: true },
    userid: { type: String, require: true },
    username: { type: String, require: true },
    identity: { type: String, require: true },
    department: { type: String, require: true },
    attorneyList: { type: Object, default: [], },
}));


/*
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

    Product.create({
        productName: 'productName123',
        productNo: 'productNo123',
        contractNo: 'contractNo123',
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
    Product.remove({}, function(err, doc){
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
exports.dbFind = function(selector={}, filter={username: 0, password: 0, __v: 0}){
    return User.find(selector, filter, function(err, doc){
        if(!err){
            // console.log(doc);
        }else{
            console.log(err);
        }
    });
};
*/