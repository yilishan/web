const express = require('express');
const Route = express.Router();
const { login } = require('./login.js');
const { User } = require('./database.js');
// const model = require('./model.js');
// const User = model.getModel('user');

const PARAMETER_ERROR = 'PARAMETER_ERROR';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAIL = 'REGISTER_FAIL';
const DATABASE_ERROR = 'DATABASE_ERROR';

Route.get('/info', function(req, res){
    // 看用户有没有cookie，有的话返回1，否则返回-2
    const { userid } = req.cookies;
    // console.log('req.cookie', userid);
    if(!userid){
        console.log('userid:', userid);
        return res.json({
            code: -2,
            msg: LOGIN_FAIL,
            toast: '用户未登录',
            // data: {...data},
            data: {}
        });
    }
    User.findOne({_id:userid}, {password:0, __v:0}, function(err, doc){
        if(!err){
            console.log('/info find',doc);
            return res.json({
                code: 1,
                msg: LOGIN_SUCCESS,
                toast: '登录成功',
                // data: {...data},
                data: {},
            });
        }else{
            console.log(err);
            return res.json({
                code: -2,
                msg: LOGIN_FAIL,
                toast: '用户未登录',
                // data: {...data},
                data: {}
            });
        }
    });
});

Route.get('/data', function(req, res){
    User.find({}, {}, function (err, doc) {
        if (!err) {
            // console.log('doc', doc);
            res.json(doc);
        } else {
            console.log('err', err);
            res.json(err);
        }
    });
});

// 登录
Route.post('/login', function (req, res) {
    // console.log("req.body:", req.body);
    login(req.body).then(data => {
        // 登录成功，设置cookie
        console.log('server data:',data.data[0]._id);
        if(data.code === 1){
            res.cookie('userid', data.data[0]._id);
            res.cookie('username', data.data[0].username);
        }
        res.json(data);
    });
});

// 注册
Route.post('/register', function (req, res) {
    const {username, password} = req.body;
    console.log("req.body:", username, password);

    if (!username || !password) {
        return res.json({
            code: -1,
            msg: PARAMETER_ERROR,
            toast: '参数错误',
            data: {}
        });
    }else{
        // 查询用户名是否存在
        User.findOne({username:username}, {password:0, __v:0}, function(err, doc){
            if(!err){
                console.log('/register find',doc);
                if(doc){
                    // 用户已存在
                    console.log('用户已存在');
                    return res.json({
                        code: -3,
                        msg: REGISTER_FAIL,
                        toast: '用户已存在',
                        data: {}
                    });
                }else{
                    // 用户名可用
                    console.log('用户名可用');
                    User.create({
                        username: username,
                        password: password,
                    }, function(err, doc){
                        if(!err){
                            // 注册成功
                            console.log(doc);
                            const {username, _id} = doc;
                            res.cookie('userid', _id);
                            res.cookie('username', username);
                            return res.json({
                                code: 1,
                                msg: REGISTER_SUCCESS,
                                toast: '注册成功',
                                data: {username, _id}
                            });
                        }else{
                            // 注册失败
                            console.log(err);
                            return res.json({
                                code: -2,
                                msg: DATABASE_ERROR,
                                toast: '数据创建错误',
                                data: {}
                            });
                        }
                    });
                }
            }else{
                console.log(err);
                return res.json({
                    code: -2,
                    msg: DATABASE_ERROR,
                    toast: '数据查询错误',
                    data: {}
                });
            }
        });
    }

});

module.exports = Route;