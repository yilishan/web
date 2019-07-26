import React from 'react';
import { } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import '../../global/config.js'
import MySteps from '../../components/mySteps/index.js';

const curPage = 1;

class NewEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
        // console.log('this.props.location.state:', this.props.location.state);
    }

    handleClick(name){
        console.log('name:', name);
    }

    render() {
        return (
            <div>
                <MySteps curPage={curPage} />

            </div >
        );
    }
}

export default NewEquipment;

