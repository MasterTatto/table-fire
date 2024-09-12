import React from 'react';
import s from './styles.module.css'

const InputModal = ({type = 'text', value, onChange, title = '', min, max, step = 1}) => {
    return (
        <div className={s.input}>
            {title && <p className={s.title}>{title}</p>}
            <input type={type} min={min} max={max} step={step} value={value} onChange={onChange}/>
        </div>
    );
};

export default InputModal;