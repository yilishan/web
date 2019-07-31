const express = require('express');
const Route = express.Router();
const { login } = require('./login.js');
const { User } = require('./database.js');
// const model = require('./model.js');
// const User = model.getModel('user');

const PARAMETER_ERROR = 'PARAMETER_ERROR';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

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

Route.post('/login', function (req, res) {
    // console.log("req.body:", req.body);
    login(req.body).then(data => {
        res.json(data);
    });
});

module.exports = Route;