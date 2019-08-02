import React from 'react';
import { withRouter  } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
// import axios from 'axios';
import PublicHeader from '../../components/publicHeader/index.js';

const curPage = 0;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identity: [],
        }
    }

    componentWillMount(){
        // const me = this;
        // axios.get('/identity').then(function(res){
        //     console.log(res);
        //     me.setState({
        //         identity: res.data
        //     });
        // }).catch(function(err){
        //     console.log(err);
        // });  
    }

    componentDidMount() {
        document.title = global.title[curPage].name;
        // console.log('this.props.location.state:', this.props.location.state);
    }

    render() {
        return (
            <div>
                <PublicHeader curPage={curPage} />
                
                <h1>产品列表：</h1>
                <div>
                    
                </div>
            </div >
        );
    }
}

export default withRouter(Home);

