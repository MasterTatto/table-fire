import React from 'react';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {storeRedux} from "./redux/store";


ReactDOM.render(
    <Provider store={storeRedux}>
    <App/>
    </Provider>, document.getElementById('root'));

