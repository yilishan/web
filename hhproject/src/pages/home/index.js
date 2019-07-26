import React from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { withRouter  } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
import NameShow from '../../components/nameShow/index.js';
import MySteps from '../../components/mySteps/index.js';

const curPage = 0;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                <MySteps curPage={curPage} handleClick={this.handleClick} this={this} />

                <Row type="flex" justify="center" className="row">
                    {
                        global.identity.map((item) => {
                            return(
                                <Col span={4} key={item.id}>
                                    <NameShow title={item.name} handleClick={this.handleClick} this={this} />
                                </Col>
                            ) 
                        })
                    }
                </Row>
            </div >
        );
    }
}

export default withRouter(Home);

