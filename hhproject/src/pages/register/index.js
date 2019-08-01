import React from 'react';
import { Input, Button, Form, Icon, Avatar, Alert, Spin, Select } from 'antd';
import './index.css'
import '../../global/config.js'
import img from '../../image/axin.jpg';
import AuthRoute from '../../components/authRoute/index.js';
import axios from 'axios';

const { Option } = Select;

class NormalRegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpinning: false,
            errText: '',
            identity: global.identity[0].name
        }
        this.handleChange = this.handleChange.bind(this);
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

    errShow(errText) {
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

    handleChange(value){
        console.log(`selected ${value}`, this);
        this.setState({
            identity: value
        });
    }

    handleSubmit = (e) => {
        const me = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if (values.password !== values.repassword) {
                    me.errShow('两次密码输入不一致');
                }
                const md5Password = global.md5Pwd(values.password);
                me.spinShow();
                axios.post('/user/register', {
                    username: values.username,
                    password: md5Password,
                    identity: this.state.identity
                }).then(function (res) {
                    me.spinHide();
                    if (res.status === 200) {
                        console.log('login res:', res);
                        let myerrText = res.data.toast;
                        switch (res.data.code) {
                            case 1:
                                console.log('注册成功', res.data.toast);
                                myerrText = '';
                                me.props.history.push('/');
                                break;
                            case -1:
                                console.log('参数错误', res.data.toast);
                                break;
                            case -2:
                                console.log('数据库错误', res.data.toast);
                                break;
                            case -3:
                                console.log('用户已存在', res.data.toast);
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
                            <Select defaultValue={global.identity[0].name} onChange={this.handleChange}>
                                {
                                    global.identity.map((item) => {
                                        return <Option key={item.id} value={item.name}>{item.name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <a className="register-form-register" href="/login">返回登录</a>
                            <Button type="primary" htmlType="submit" className="register-form-button">
                                注册
                        </Button>
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

const Register = Form.create({ name: 'normal_register' })(NormalRegisterForm);

export default Register;

