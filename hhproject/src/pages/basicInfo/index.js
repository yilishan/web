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

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attorneyObj: {}, //基本信息
            attorneyItem: [], //委托说明
            productData: null, //产品完整数据
        }
    }

    componentWillMount() {
        const me = this;
        document.title = global.title[curPage].name;

        // 初始化委托日期
        let myAttorneyObj = this.state.attorneyObj;
        myAttorneyObj['attorneyDate'] = moment().format('YYYY.MM.DD');
        this.setState({
            attorneyObj: myAttorneyObj
        });

        if (this.props.history.location.state.data) {
            console.log("收到参数:", this.props.history.location.state.data);
            me.setState({
                productData: this.props.history.location.state.data,
            });
        }

    }

    componentDidMount() {
        this.initData();
    }

    initData() {
        global.attorneyWordList.filter((item) => item.part === 'attorneyTitle').map((item) => {
            let myAttorneyObj = this.state.attorneyObj;
            console.log('myAttorneyObj:', myAttorneyObj);
            myAttorneyObj[item.name] = this.getDefaultValue(item.name);
            this.setState({
                attorneyObj: myAttorneyObj
            });
            return null;
        })
    }

    getDefaultValue(name) {
        let res;
        switch (name) {
            case 'attorneyDate':
                res = moment().format('YYYY.MM.DD');
                break;
            case 'attorneyDepartment':
                res = global.user().department;
                break;
            case 'attorneyPeople':
                res = global.user().name;
                break;
            case 'attorneyNo':
                if (this.state.productData) {
                    const { productNo, attorneyList } = this.state.productData;
                    if (productNo && attorneyList) {
                        res = `C-${productNo}-${attorneyList.length + 1}`;
                    }
                }
                break;
            default:
                res = null;

        }
        // console.log('获取默认值', name, res);
        return res;
    }

    handleChange(name, value) {
        console.log('选择了：', name, value);
        this.setStateData(name, value);
    }

    handleInputChange(name, e) {
        console.log('输入了:', name, e.target.value);
        this.setStateData(name, e.target.value);
    }

    handleDateChange(name, momentObj) {
        console.log('输入了:', name, momentObj.format('YYYY.MM.DD'));
        this.setStateData(name, momentObj.format('YYYY.MM.DD'));
    }

    setStateData(key, value) {
        let myProductData = this.state.productData;
        let myAttorneyObj = this.state.attorneyObj;
        myAttorneyObj[key] = value;
        myProductData.attorneyList[0] = myAttorneyObj;
        this.setState({
            attorneyObj: myAttorneyObj,
            productData: myProductData
        });
        console.log('productData:', this.state.productData);
    }

    getComponent(item) {
        if (item.name === "date" || item.name === "attorneyDate") {
            return (<DatePicker className="basicinfo-form-component" placeholder="选择日期" onChange={this.handleDateChange.bind(this, item.name)} defaultValue={moment(this.state.attorneyObj[item.name], 'YYYY.MM.DD')} format={'YYYY.MM.DD'} locale={locale} />);
        } else if (item.canSelect) {
            return (
                <Select
                    showSearch
                    // style={{ width: 200 }}
                    className="basicinfo-form-component"
                    placeholder="请选择"
                    optionFilterProp="children"
                    value={this.state.attorneyObj[item.name]}
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
                value={this.state.attorneyObj[item.name]}
                onChange={this.handleInputChange.bind(this, item.name)}
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

                {/* 基础信息 */}
                <div className="basicinfo-root">
                    <div className="basicinfo-form">
                        {
                            global.attorneyWordList.filter((item) => item.part === 'attorneyTitle').map((item, index) => {
                                return (
                                    <div key={index} className="basicinfo-form-item">
                                        <div className={this.state.attorneyObj[item.name] ? "basicinfo-form-title" : "basicinfo-form-title red"}>{item.desc}</div>
                                        <div className="basicinfo-form-input">{this.getComponent(item)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* 委托说明 */}
                    <div className="basicinfo-attorneyItem">
                        <h1>委托说明：</h1>
                        <div className="basicinfo-attorneyItem-wrap">
                            {
                                global.attorneyItem.map((item, index) => {
                                    return (
                                        <div key={index} className="basicinfo-attorneyItem-item" style={{ flex: item.flex }}>
                                            <div className="basicinfo-attorneyItem-title">{item.desc}</div>
                                            <div className="basicinfo-attorneyItem-info">已有信息</div>
                                            <div className="basicinfo-attorneyItem-input">输入</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* 其他 */}
                    <div className="basicinfo-other">
                        <h1>检测示意图：</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicInfo;

