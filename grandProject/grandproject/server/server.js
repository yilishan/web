const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('<h1>这是返回的结果，哈哈哈</h1>');
});

app.listen(9093,function(){
    console.log('yilishan: hello, 9093.');
});