import React from 'react';
import { } from 'antd';
import './index.css'
import '../../global/config.js'
// import axios from 'axios';
import PublicHeader from '../../components/publicHeader/index.js';

const curPage = 5;

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
    }


    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />
            </div>
        );
    }
}

export default Report;

