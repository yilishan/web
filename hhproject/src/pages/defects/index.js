import React from 'react';
import { } from 'antd';
import './index.css'
import '../../global/config.js'
import PublicHeader from '../../components/publicHeader/index.js';
// import axios from 'axios';

const curPage = 4;

class Defects extends React.Component {
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

export default Defects;

