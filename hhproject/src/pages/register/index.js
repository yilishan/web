import React from 'react';
import { Input, Button, Form, Icon, Avatar } from 'antd';
import './index.css'
import '../../global/config.js'
import img from '../../image/axin.jpg';
// import axios from 'axios';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div className="root">
                <Avatar size={100} src={img} className="avatar" />
                <Form onSubmit={this.handleSubmit} className="register-form">
                    <Form.Item>
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="确认密码"
                        />
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

export default Register;

