import React from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import './index.css';

const InputGroup = Input.Group;

class EquiSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        // const me = this;

    }

    render() {
        return (
            <div>
                <InputGroup compact>
                    <Input style={{ width: '20%' }} defaultValue="0571" />
                    <span style={{ width: '5%' }}> - </span>
                    <Input style={{ width: '30%' }} defaultValue="26888888" />
                </InputGroup>
            </div>
        );
    }
}

export default EquiSelector;