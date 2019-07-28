import React from 'react';
import { Button } from 'antd';
import './index.css';

function NameShow(props) {
    return (
        <Button type="primary" className="button" onClick={() => props.handleClick.call(props.this, props.title)}>
            {props.title}
        </Button>
    )
}

export default NameShow;