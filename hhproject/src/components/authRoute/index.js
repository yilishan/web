import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

// @withRouter
class AuthRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        console.log('AuthRoute componentDidMount');
        const me = this;
        const curPageList = ['/login', '/register'];
        const curPathNmae = me.props.location.pathname;
        // 是否是注册或登录页,若是，则不用操作
        if(curPageList.indexOf(curPathNmae) > -1){
            return null;
        }
        // 是否登录
        axios.get('/user/info').then(function (res) {
            if (res.status === 200) {
                console.log('/user/info res:', res);
                if(res.data.code === 1){
                    // 登录成功
                    // me.props.history.push('/');
                }else{
                    // 登录失败,跳转至登录页
                    // console.log('this.props.history:', me.props.history);
                    me.props.history.push('/login');
                }
            }
        }).catch(function (err) {
            console.log('login err:', err);
        });
        // 普通用户还是超级管理员
    }

    render() {
        return (null);
    }
}

export default withRouter(AuthRoute);