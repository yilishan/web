import React from 'react';
import './index.css';
import { withRouter } from 'react-router-dom';
import AuthRoute from '../authRoute/index.js';
import Logout from '../logout/index.js';
import MySteps from '../mySteps/index.js';

class PublicHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
          
        };
    }

    render() {
        return (
            <div>
                <AuthRoute />
                <Logout />
                <MySteps curPage={this.props.curPage} />
            </div>
        );
    }
}

export default withRouter(PublicHeader);