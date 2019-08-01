import React from 'react';
import { Input, Button, Form, Icon, Avatar, Spin, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
import img from '../../image/axin.jpg';
import axios from 'axios';
import AuthRoute from '../../components/authRoute/index.js';

class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpinning: false,
            errText: ''
        }
    }

    spinShow() {
        this.setState({
            isSpinning: true
        });
    }

    spinHide() {
        this.setState({
            isSpinning: false
        });
    }

    errShow(errText){
        const me = this;
        me.setState({
            errText: errText
        });
        setTimeout(() => {
            me.setState({
                errText: ''
            });
        }, 3000);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const me = this;
        me.spinShow();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const md5Password = global.md5Pwd(values.password);

                axios.post('/user/login', {
                // axios.post('/login', {
                    username: values.username,
                    password: md5Password
                }).then(function (res) {
                    me.spinHide();
                    if (res.status === 200) {
                        console.log('login res:', res);
                        let myerrText =  res.data.toast;
                        switch (res.data.code) {
                            case 1:
                                console.log('成功', res.data.toast);
                                myerrText = '';
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
                        me.errShow(myerrText);
                    }
                }).catch(function (err) {
                    me.spinHide();
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
                <Spin spinning={this.state.isSpinning} >
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
                            {(this.state.errText && this.state.errText !== '') ?
                                <Alert message={this.state.errText} type="error" showIcon />
                                : null
                            }
                        </Form.Item>
                    </Form>
                </Spin>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default withRouter(Login);

