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

        }
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
    }

    getComponent(item) {
        if (item.name === "date" || item.name === "attorneyDate") {
            return (<DatePicker className="basicinfo-form-component" placeholder="选择日期" defaultValue={moment('2015.01.01', 'YYYY.MM.DD')} format={'YYYY.MM.DD'} locale={locale} />);
        } else if (item.canSelect) {
            if (item.name === "attorneyDepartment") {
                item.defaultValue = global.user.department;
            }
            return (
                <Select
                    showSearch
                    // style={{ width: 200 }}
                    className="basicinfo-form-component"
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
            if (item.name === "attorneyPeople") {
                item.defaultValue = global.user.name;
            }
            return (<Input
                className="basicinfo-form-component"
                placeholder={item.desc}
                defaultValue={item.defaultValue}
            ></Input>);
        }
    }

    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />

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

