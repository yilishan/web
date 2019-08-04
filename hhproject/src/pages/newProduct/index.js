import React from 'react';
import { Input, Select } from 'antd';
import 'moment/locale/zh-cn';
import './index.css'
import '../../global/config.js'
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
        if (item.canSelect) {
            return (
                <Select
                    showSearch
                    className = "newproduct-form-component"
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
            return (<Input
                className = "newproduct-form-component"
                placeholder={item.desc}
                defaultValue={item.defaultValue}
            ></Input>);
        }
    }

    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />

                <div className="newproduct-root">
                    <div className="newproduct-form">
                        {
                            global.productWordList.map((item, index) => {
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

