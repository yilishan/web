import React from 'react';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import './index.css';
import { withRouter  } from 'react-router-dom';

const { Step } = Steps;

class MySteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    handleClick(pathname) {
        this.props.history.push({
            pathname: pathname,
            state: {},
        });
    }

    render() {
        return (
            <Steps current={this.props.curPage} size="small" labelPlacement="vertical" className="steps">
                {
                    global.title.map((item) => {
                        return <Step title={item.name} description="" key={item.name} onClick={() => this.handleClick(item.path)} />
                    })
                }
            </Steps>
        )
    }
}

export default withRouter(MySteps);