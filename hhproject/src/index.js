import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/index';
import Register from './pages/register/index';
import Login from './pages/login/index';
import NewProduct from './pages/newProduct/index';
import BasicInfo from './pages/basicInfo/index';
import Detection from './pages/detection/index';
import Defects from './pages/defects/index';
import Report from './pages/report/index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    (
        <BrowserRouter>
            <div>
                <Route path='/' exact component={ Home } />
                <Route path='/login' component={ Login } />
                <Route path='/register' component={ Register } />
                <Route path='/newProduct' component={ NewProduct } />
                <Route path='/basicInfo' component={ BasicInfo } />
                <Route path='/detection' component={ Detection } />
                <Route path='/defects' component={ Defects } />
                <Route path='/report' component={ Report } />
            </div>
        </BrowserRouter>
    )
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
