import React from 'react';
import { Input, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import './index.css'
import '../../global/config.js'
import PublicHeader from '../../components/publicHeader/index.js';
// import axios from 'axios';

const curPage = 2;
const { Option } = Select;
let attorneyObj = {};

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attorneyObj: {},
            productData: null,
        }
    }

    componentWillMount() {
        const me = this;
        document.title = global.title[curPage].name;

        if (this.props.history.location.state.data) {
            console.log("收到参数:", this.props.history.location.state.data);
            me.setState({
                productData: this.props.history.location.state.data,
            });
        }
    }

    getDefaultValue(name) {
        let res;
        switch (name) {
            case 'date':
                res = '2017.01.01';
                break;
            case 'attorneyDate':
                res = '2017.01.01';
                break;
            case 'attorneyDepartment':
                res = global.user.department;
                break;
            case 'attorneyPeople':
                res = global.user.name;
                break;
            case 'attorneyNo':
                const { productNo, attorneyList } = this.state.productData;
                res = `C-${productNo}-${attorneyList.length + 1}`;
                break;
            default:
                res = null;

        }
        if (res) {
            attorneyObj[name] = res;
            console.log('attorneyObj', attorneyObj);
        }
        console.log('获取默认值', name, res);
        return res;
    }

    handleChange(name, value) {
        console.log('选择了：', name, value);
        let myProductData = this.state.productData;
        attorneyObj[name] = value;
        myProductData.attorneyList[0] = attorneyObj;
        console.log('attorneyObj:', attorneyObj);
        this.setState({
            productData: myProductData
        })
    }

    getComponent(item) {
        if (item.name === "date" || item.name === "attorneyDate") {
            return (<DatePicker className="basicinfo-form-component" placeholder="选择日期" defaultValue={moment(this.getDefaultValue(item.name), 'YYYY.MM.DD')} format={'YYYY.MM.DD'} locale={locale} />);
        } else if (item.canSelect) {
            return (
                <Select
                    showSearch
                    // style={{ width: 200 }}
                    className="basicinfo-form-component"
                    placeholder="请选择"
                    optionFilterProp="children"
                    defaultValue={this.getDefaultValue(item.name)}
                    onChange={this.handleChange.bind(this, item.name)}
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
            return (<Input
                className="basicinfo-form-component"
                placeholder={item.desc}
                defaultValue={this.getDefaultValue(item.name)}
            ></Input>);
        }
    }

    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />

                <div>
                    产品基本信息：{
                        Object.keys(this.state.productData).map(key => <div key={key}>{key} : {this.state.productData[key]}</div>)
                    }
                    {/* {
                        this.state.productData.map((value, index)=>{
                            return <div>{value}{index}</div>
                        })
                    } */}
                </div>

                <div className="basicinfo-root">
                    <div className="basicinfo-form">
                        {
                            global.attorneyWordList.filter((item) => item.part === 'attorneyTitle').map((item, index) => {
                                return (
                                    <div key={index} className="basicinfo-form-item">
                                        <div className="basicinfo-form-title">{item.desc}</div>
                                        <div className="basicinfo-form-input">{this.getComponent(item)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicInfo;

