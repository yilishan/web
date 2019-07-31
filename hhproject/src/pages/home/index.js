import React from 'react';
import { Row, Col } from 'antd';
import { withRouter  } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
import axios from 'axios';
import NameShow from '../../components/nameShow/index.js';
import MySteps from '../../components/mySteps/index.js';
import AuthRoute from '../../components/authRoute/index.js';

const curPage = 0;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: [],
        }
    }

    componentWillMount(){
        const me = this;
        axios.get('/identity').then(function(res){
            console.log(res);
            me.setState({
                identity: res.data
            });
        }).catch(function(err){
            console.log(err);
        });  
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
        // console.log('this.props.location.state:', this.props.location.state);
    }

    handleClick(name=''){
        this.props.history.push({
            pathname: '/newequip',
            state: { 'name': name },
        });
    }

    render() {
        return (
            <div>
                <AuthRoute />
                <MySteps curPage={curPage} handleClick={this.handleClick} this={this} />

                <Row type="flex" justify="center" className="row">
                    {
                        this.state.identity ?
                        this.state.identity.map((item, index) => {
                            return(
                                <Col span={4} key={index}>
                                    <NameShow title={item.name} handleClick={this.handleClick} this={this} />
                                </Col>
                            ) 
                        })
                        : null
                    }
                </Row>
            </div >
        );
    }
}

export default withRouter(Home);

