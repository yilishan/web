import React from 'react';
import { Input, Button, Form, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
import img from '../../image/axin.jpg';
import axios from 'axios';
import AuthRoute from '../../components/authRoute/index.js';

// TODO md5加密
// TODO 服务器获取验证
// TODO 跳转页面


class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const me = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                // axios.post('/user/login', {
                axios.post('/login', {
                    username: values.username,
                    password: values.password
                }).then(function (res) {
                    if (res.status === 200) {
                        console.log('login res:', res);
                        switch (res.data.code) {
                            case 1:
                                console.log('成功', res.data.toast);
                                me.props.history.push('/');
                                break;
                            case -1:
                                console.log('错误', res.data.toast);
                                break;
                            case -2:
                                console.log('失败', res.data.toast);
                                break;
                            default:
                                console.log('其他', res.data.toast);
                        }

                        // TODO 登录成功后：保存cookie、重定向页面
                        // 进入页面首先判断是否登录态，否则重定向至登录页，否则直接进入目标页面

                    }
                }).catch(function (err) {
                    console.log('login err:', err);
                });
            }
        });

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="root">
                <AuthRoute />
                <Avatar size={100} src={img} className="avatar" />
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <a className="login-form-forgot" href="/">忘记密码</a>
                        <a className="login-form-register" href="/register">新用户注册</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(Login);

