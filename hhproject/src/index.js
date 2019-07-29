import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home/index';
import NewEquipment from './pages/newEquipment/index';
import Register from './pages/register/index';
import Login from './pages/login/index';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
    (
        <BrowserRouter>
            <div>
                <Route path='/' exact component={ Home } />
                <Route path='/newequip' component={ NewEquipment } />
                <Route path='/login' component={ Login } />
                <Route path='/register' component={ Register } />
                <Route path='/c' component={ Home } />
                <Route path='/d' component={ NewEquipment } />
            </div>
        </BrowserRouter>
    )
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
