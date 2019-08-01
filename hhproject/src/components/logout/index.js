import React from 'react';
import { Button } from 'antd';
import './index.css';
import cookie from 'react-cookies';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            username: cookie.load('username')
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        
    }

    handleClick(){
        cookie.remove('userid');
        cookie.remove('username');
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className="logout-root">
                <Button className="logout-btn" onClick={this.handleClick}>{this.state.username} | 退出登录</Button>
            </div>
        );
    }
}

export default withRouter(Logout);