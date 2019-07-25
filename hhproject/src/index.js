import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './pages/app/App';
import Home from './pages/home/index';
import NewEquipment from './pages/newEquipment/index';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
const title = ['身份选择','新建设备','选择检测类型','选择检测时机',"记录检测结果","预览与打印"];
ReactDOM.render(<Home title={title} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
