import React from 'react';

import {GridExample} from "./tets";
import './App.css'
import Input from "./input";

const App = () => {

    return (
        <div className={'app'}>
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
