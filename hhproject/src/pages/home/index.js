import React from 'react';
import { withRouter  } from 'react-router-dom';
import './index.css';
import '../../global/config.js';
import axios from 'axios';
import PublicHeader from '../../components/publicHeader/index.js';

const curPage = 0;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: []
        }
    }

    componentWillMount(){
        const me = this;
        axios.get('/product/data').then(function(res){
            console.log('/product/data:', res.data);
            me.setState({
                productList: res.data
            });
        }).catch(function(err){
            console.log(err);
        });  
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
                    {
                        this.state.productList.map((item, index) =>
                            <div key={index}>{item.contractNo}-{item.productName}-{item.productNo}-{item.timestamp}-{item._id}-{item.username}-{item.userid}-{item.identity}-{item.department}</div>
                        )
                    }
                </div>
            </div >
        );
    }
}

export default withRouter(Home);

