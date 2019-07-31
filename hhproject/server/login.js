const { User } = require('./database.js');

const PARAMETER_ERROR = 'PARAMETER_ERROR';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

exports.login = async function (para) {
    const { username, password } = para;
    if (!para.username || !para.password) {
        return {
            code: -1,
            msg: PARAMETER_ERROR,
            toast: '参数错误',
            data: {}
        };
    }
    // console.log("login:", username, password);
    return await canLogin(para);
};

const canLogin = async function (para) {
    // TODO 向数据库查询，若查到，则返回查询结果（用户id）
    let data;
    await User.find(para, { username: 0, password: 0, __v: 0 }, function (err, doc) {
        if (!err) {
            console.log('doc', doc);
            data = doc;
        } else {
            console.log('err', err);
        }
    });
    if (data.length > 0) {
        console.log('查到了', data);
        // res.cookie('userId', doc);
        return {
            code: 1,
            msg: LOGIN_SUCCESS,
            toast: '登录成功',
            data: { ...data },
        };
    } else {
        console.log('没有查到');
        return {
            code: -2,
            msg: LOGIN_FAIL,
            toast: '用户名或密码错误',
            data: { ...data }
        };
    }
}
