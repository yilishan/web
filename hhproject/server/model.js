/* const mongoose = require('mongoose');

const dbUrl = 'mongodb://localhost:27017/grandproject';
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('mongo db connect success!');
});
// mongo 有文档概念，类似于MySQL中的表
// 定义文档模型，Schema和model新建模型
mongoose.model('user', new mongoose.Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
}));

module.exports = {
    getModel: function (name) {
        return mongoose.model(name);
    }
} */