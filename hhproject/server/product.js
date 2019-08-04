const express = require('express');
const Route = express.Router();
const { Product } = require('./database.js');

const PARAMETER_ERROR = 'PARAMETER_ERROR';
const CREATE_FAIL = 'CREATE_FAIL';
const CREATE_SUCCESS = 'CREATE_SUCCESS';
const DATABASE_ERROR = 'DATABASE_ERROR';

Route.get('/data', function (req, res) {


    Product.find({}, {}, function (err, doc) {
        if (!err) {
            // console.log('doc', doc);
            res.json(doc);
        } else {
            console.log('err', err);
            res.json(err);
        }
    });
});

Route.post('/create', function (req, res) {
    console.log("req.body:", req.body);
    const { productName, productNo, contractNo, userid, username, identity, department } = req.body;
    if (!productName || !productNo || !contractNo || !userid || !username || !identity || !department) {
        return res.json({
            code: -1,
            msg: PARAMETER_ERROR,
            toast: '参数错误',
            data: {}
        });
    } else {
        // 查询产品是否已经存在
        Product.findOne({ productName: productName, productNo: productNo, contractNo: contractNo }, {}, function (err, doc) {
            if (!err) {
                console.log('/create Product', doc);
                if (doc) {
                    // 产品已存在
                    console.log('产品已存在');
                    return res.json({
                        code: -3,
                        msg: CREATE_FAIL,
                        toast: '产品已存在',
                        data: {}
                    });
                } else {
                    // 产品不存在
                    console.log('产品不存在');
                    Product.create({
                        productName: productName, 
                        productNo: productNo, 
                        contractNo: contractNo,
                        userid: userid, 
                        username: username, 
                        identity: identity, 
                        department: department,
                    }, function (err, doc) {
                        if (!err) {
                            // 创建成功
                            console.log(doc);
                            const { timestamp, productName, productNo, contractNo, _id, userid, username, identity, department } = doc;
                            res.cookie('timestamp', timestamp);
                            res.cookie('userid', _id);
                            res.cookie('productName', productName);
                            res.cookie('productNo', productNo);
                            res.cookie('contractNo', contractNo);
                            return res.json({
                                code: 1,
                                msg: CREATE_SUCCESS,
                                toast: '新增产品成功',
                                data: { timestamp, productName, productNo, contractNo, _id, userid, username, identity, department }
                            });
                        } else {
                            // 创建失败
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
            } else {
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