import React from 'react';
import { PageHeader } from 'antd';
import './index.css'
import '../../global/config.js'
// import axios from 'axios';
import MySteps from '../../components/mySteps/index.js';
import Logout from '../../components/logout/index.js';
// import EquiSelector from '../../components/equiSelector/index.js';

const curPage = 1;

class NewEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            title: null,
        }
    }

    componentDidMount() {
        const me = this;
        document.title = global.title[curPage].name;
        console.log('this.props.location.state:', this.props.location.state);
        if(me.props.location.state.name){
            me.setState({
                name: me.props.location.state.name
            });
        }

        /*  
        axios.get('/title').then(function(res){
            console.log(res);
            me.setState({
                title: res.data
            });
        }).catch(function(err){
            console.log(err);
        }); 
        */
    }

    handleClick(name){
        console.log('name:', name);
    }

    render() {
        return (
            <div>
                <Logout />
                <MySteps curPage={curPage} />
                {
                    this.state.name ?
                    <PageHeader title="小猫咪" subTitle={this.state.name} />
                    : null
                }

                {/* <EquiSelector /> */}

            </div>
        );
    }
}

export default NewEquipment;

