import React from 'react';
import s from './styles.module.css'
const Input = ({placeholder,value,onChange}) => {
    return (
        <input className={s.input} onChange={onChange} value={value} placeholder={placeholder}/>

    );
};

export default Input;