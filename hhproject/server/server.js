const express = require('express');
const userRoute = require('./user');
const app = express();
const { dbConnect } = require('./database.js');
const { title, identity } = require('./data.js');
const { login } = require('./login.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 连接mongodb,并且使用grandproject这个集合
dbConnect();

app.use(cookieParser());
app.use('/user', userRoute);


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

app.post('/login', function (req, res) {
    // console.log("req.body:", req.body);
    login(req.body).then(data => {
        // 登录成功，设置cookie
        console.log('server data:',data);
        if(data.code === 1){
            res.cookie('userid', data.data[0]);
        }
        res.json(data);
    });
});

app.listen(9093, function () {
    console.log('yilishan: hello, 9093.');
});
