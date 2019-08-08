import React from 'react';
import { Input, DatePicker, Select, Button } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';
import './index.css';
import '../../global/config.js';
import PublicHeader from '../../components/publicHeader/index.js';
// import axios from 'axios';

const curPage = 2;
const { Option } = Select;

class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attorneyObj: {
                attorneyList: [
                    { 'attorneyItem': [] },
                ],
            }, //基本信息
            attorneyItem: {}, //新增委托说明，点击确认增加后，把attorneyItem数据添加到productData中，并将attorneyItem清空
            productData: null, //产品完整数据
        }
        this.handleAttorneyItemBtn = this.handleAttorneyItemBtn.bind(this);
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
            if (this.props.history.location.state.data.attorneyList.length === 0) {
                this.props.history.location.state.data.attorneyList.push({ 'attorneyItem': [] });
                console.log("收到参数,添加属性:", this.props.history.location.state.data);
            }
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
        console.log('基本信息输入了:', name, e.target.value);
        this.setStateData(name, e.target.value);
    }

    handleAttorneyItemInputChange(name, e) {
        console.log('委托说明输入了:', name, e.target.value);
        this.setAttorneyItemData(name, e.target.value);
    }

    handleAttorneyItemBtn() {
        console.log("点击确认增加");
        let myAttorneyItem = this.state.attorneyItem;
        // let myProductData = this.state.productData;
        let myAttorneyObj = this.state.attorneyObj;
        console.log("myAttorneyObj:", myAttorneyObj);
        if (Object.keys(myAttorneyItem).length !== 0) {
            // TODO: 校验某些不能有空值的字段，并反馈校验结果
            console.log("对象有输入的值", myAttorneyItem);
            myAttorneyObj.attorneyItem.push(myAttorneyItem);
            this.setAttorneyItemData('attorneyItem', myAttorneyObj.attorneyItem);
            // 清空对象
            myAttorneyItem = {};
            this.setState({
                attorneyItem: myAttorneyItem
            });
        } else {
            console.log("空对象", myAttorneyItem);
        }
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
        console.log('setStateData productData:', this.state.productData);
    }

    setAttorneyItemData(key, value) {
        let myAttorneyItem = this.state.attorneyItem;
        value = value.trim();
        if (value === "") {
            delete myAttorneyItem[key];
        } else {
            myAttorneyItem[key] = value;
        }
        this.setState({
            attorneyItem: myAttorneyItem
        });
        console.log('myAttorneyItem:', myAttorneyItem);
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
                        Object.keys(this.state.productData).map(key => {
                            return (<div key={key}>{key} : {JSON.stringify(this.state.productData[key])}</div>);
                        })
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
                                global.attorneyItemList.map((item, index) => {
                                    return (
                                        <div key={index} className="basicinfo-attorneyItem-item" style={{ flex: item.flex }}>
                                            <div className="basicinfo-attorneyItem-title">{item.desc}</div>
                                            {
                                                this.state.productData.attorneyList[0].attorneyItem.map((attorneyItem, idx) => {
                                                    return (
                                                        <div key={idx} className="basicinfo-attorneyItem-info">{attorneyItem[item.name]}</div>
                                                    )
                                                })
                                            }
                                            <div className="basicinfo-attorneyItem-input-wrap">
                                                <Input
                                                    className="basicinfo-attorneyItem-input"
                                                    placeholder={item.desc}
                                                    value={this.state.attorneyItem[item.name]}
                                                    onChange={this.handleAttorneyItemInputChange.bind(this, item.name)}
                                                ></Input>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Button className="basicinfo-attorneyItem-btn" type="primary" onClick={this.handleAttorneyItemBtn}>确认添加</Button>
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

