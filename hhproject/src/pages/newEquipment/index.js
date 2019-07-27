import React from 'react';
import { } from 'antd';
import 'antd/dist/antd.css';
import './index.css'
import '../../global/config.js'
import axios from 'axios';
import MySteps from '../../components/mySteps/index.js';

const curPage = 1;

class NewEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        const me = this;
        document.title = global.title[curPage].name;
        // console.log('this.props.location.state:', this.props.location.state);
        
        axios.get('/title').then(function(res){
            console.log(res);
            me.setState({
                data: res.data
            });
        }).catch(function(err){
            console.log(err);
        });
    }

    handleClick(name){
        console.log('name:', name);
    }

    render() {
        return (
            <div>
                <MySteps curPage={curPage} />
                {
                    this.state.data ?
                    this.state.data.map((item, index) => {
                        return <div key={index}>{item.name}</div>
                    })
                    :null
                }
            </div>
        );
    }
}

export default NewEquipment;

