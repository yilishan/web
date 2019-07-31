import React from 'react';
import { Input, Button, Form, Icon, Avatar } from 'antd';
import './index.css'
import '../../global/config.js'
import img from '../../image/axin.jpg';
import AuthRoute from '../../components/authRoute/index.js';
// import axios from 'axios';

class NormalRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                // TODO 比较两次密码是否相同
                // 若相同，传至后台
                // 后台：注册成功、失败（重名、格式错误、数据库错误）
                // 注册成功后直接跳转至登录态，保存cookie
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="root">
                <AuthRoute />
                <Avatar size={100} src={img} className="avatar" />
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />
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
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('repassword', {
                            rules: [{ required: true, message: '请确认密码！' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="确认密码"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <a className="register-form-register" href="/login">返回登录</a>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default Register;

