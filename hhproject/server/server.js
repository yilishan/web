const express = require('express');
const app = express();
const { dbConnect, dbFind } = require('./database.js');
const { title, identity } = require('./data.js');
const { login } = require('./login.js');
var bodyParser = require('body-parser');

// 连接mongodb,并且使用grandproject这个集合
dbConnect();

//bodyParser API
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 路由
app.get('/', function (req, res) {
    res.send('<h1>这是返回的结果，哈哈哈</h1>');
});

app.get('/title', function (req, res) {
    res.json(title);
});

app.get('/identity', function (req, res) {
    res.json(identity);
});

app.get('/data', function (req, res) {
    dbFind({},{__v: 0}).then(data => {
        res.json(data);
    });
});

app.post('/login', function (req, res) {
    // console.log("req.body:", req.body);
    login(req.body).then(data => {
        res.json(data);
    });
});

app.listen(9093, function () {
    console.log('yilishan: hello, 9093.');
});
