import React, {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {GridExample} from "./tets";
import './App.css'
import Input from "./input";
import {ToastContainer} from "react-toastify";

const App = () => {

    return (
        <div className={'app'}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className={'inputs_box'}>
                <Input placeholder={'ПОИСК по никнеймам?'}/>
                <Input placeholder={'Фильтр по датам, типам контрактов?'}/>
            </div>
            <h2 className={'title'}>Страница контрактов</h2>
            <GridExample/>
        </div>
    );
};

export default App;
