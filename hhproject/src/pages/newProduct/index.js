import React from 'react';
import { Input, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import './index.css'
import '../../global/config.js'
import moment from 'moment';
// import axios from 'axios';
import PublicHeader from '../../components/publicHeader/index.js';

const curPage = 1;
const { Option } = Select;

class NewProduct extends React.Component {
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
            return (<DatePicker placeholder="选择日期" defaultValue={moment('2015.01.01', 'YYYY.MM.DD')} format={'YYYY.MM.DD'} locale={locale} />);
        } else if (item.canSelect) {
            return (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="请选择"
                    optionFilterProp="children"
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
            return (<Input placeholder={item.desc}></Input>);
        }
    }

    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />

                <div className="newproduct-root">
                    <div className="newproduct-form">
                        {
                            global.attorneyWordList.filter((item) => item.isBasic === true).map((item, index) => {
                                return (
                                    <div key={index} className="newproduct-form-item">
                                        <div className="newproduct-form-title">{item.desc}</div>
                                        <div className="newproduct-form-input">{this.getComponent(item)}</div>
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

export default NewProduct;

