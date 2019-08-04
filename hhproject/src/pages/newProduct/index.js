import React from 'react';
import { Form, Input, Select, Spin, Button, Alert } from 'antd';
import 'moment/locale/zh-cn';
import './index.css'
import '../../global/config.js'
import axios from 'axios';
import PublicHeader from '../../components/publicHeader/index.js';

const curPage = 1;
const { Option } = Select;

class NormalNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSpinning: false,
            errText: '',
        }
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
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

    handleSubmit = (e) => {
        const me = this;
        e.preventDefault();
        me.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                me.spinShow();
                axios.post('/product/create', {
                    userid: global.user.id,
                    username: global.user.name,
                    identity: global.user.identity,
                    department: global.user.department,
                    productName: values.productName,
                    productNo: values.productNo,
                    contractNo: values.contractNo,
                }).then(function (res) {
                    me.spinHide();
                    if (res.status === 200) {
                        console.log('login res:', res);
                        let myerrText = res.data.toast;
                        switch (res.data.code) {
                            case 1:
                                console.log('创建成功', res.data.toast);
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
                                console.log('创建失败', res.data.toast);
                                break;
                            default:
                                console.log('其他', res.data.toast);
                        }
                        me.errShow(myerrText);
                    }
                }).catch(function (err) {
                    me.spinHide();
                    console.log('/product/create err:', err);
                });
            }
        });
    };

    getComponent(item, getFieldDecorator) {
        if (item.canSelect) {
            return (
                <Select
                    showSearch
                    className="newproduct-form-component"
                    placeholder="请选择"
                    optionFilterProp="children"
                    defaultValue={item.defaultValue}
                    // onChange={onChange}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        item.selectList.map((opItem) =>
                            <Option key={opItem} value={opItem}>{opItem}</Option>
                        )
                    }
                </Select>
            );
        } else {
            return (
                <Form.Item>
                    {getFieldDecorator(item.name, {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input
                            className="newproduct-form-component"
                            placeholder={item.desc}
                            defaultValue={item.defaultValue}
                        />
                    )}
                </Form.Item>
            );
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <PublicHeader curPage={curPage} />

                <div className="newproduct-root">
                    <Spin spinning={this.state.isSpinning} >
                        <Form onSubmit={this.handleSubmit} className="newproduct-form">
                            {
                                global.productWordList.map((item, index) => {
                                    return (
                                        <div key={index} className="newproduct-form-item">
                                            <div className="newproduct-form-title">{item.desc}</div>
                                            <div className="newproduct-form-input">{this.getComponent(item, getFieldDecorator)}</div>
                                        </div>
                                    )
                                })
                            }
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="newproduct-form-button">
                                    创建产品
                                </Button>
                                {(this.state.errText && this.state.errText !== '') ?
                                    <Alert message={this.state.errText} type="error" showIcon />
                                    : null
                                }
                            </Form.Item>
                        </Form>
                    </Spin>
                </div>
            </div>
        );
    }
}

const NewProduct = Form.create({ name: 'normal_newproduct' })(NormalNewProduct);

export default NewProduct;

