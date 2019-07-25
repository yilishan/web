import React from 'react';
import { Steps, Row, Col, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css'

const { Step } = Steps;
const curPage = 0;
const identity = [
    { 'name': '技术员', 'id': 1001 },
    { 'name': '资料员', 'id': 1002 },
    { 'name': '评片洗片人', 'id': 1003 },
    { 'name': '现场检测人员', 'id': 1004 },
];

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        document.title = this.props.title[curPage];
    }

    handleClick(name){
        console.log('name:', name);
    }

    render() {
        return (
            <div>
                <Steps current={curPage} size="small" labelPlacement="vertical" className="steps">
                    {
                        this.props.title.map((item) => {
                            return <Step title={item} description="" key={item} />
                        })
                    }
                </Steps>

                <Row type="flex" justify="center" className="row">
                    {
                        identity.map((item) => {
                            return(
                                <Col span={4} key={item.id}>
                                    <Button type="primary" className="button" onClick={() => this.handleClick(item.name)}>{item.name}</Button>
                                </Col>
                            ) 
                        })
                    }
                </Row>
            </div >
        );
    }
}

export default Home;

