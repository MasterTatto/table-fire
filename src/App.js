import React, {useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {GridExample} from "./tets";
import './App.css'
import Input from "./input";
import {ToastContainer} from "react-toastify";
import {useMediaQuery} from "@mui/material";

const App = () => {
    const query_780 = useMediaQuery('(max-width:780px)');
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

            <GridExample/>
        </div>
    );
};

export default App;
