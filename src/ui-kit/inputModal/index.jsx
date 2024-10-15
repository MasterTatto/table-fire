import React from 'react';
import s from './styles.module.css'

const InputModal = ({
                        type = 'text', value, onChange,
                        title = '', min, max,
                        step = 1, name = '',
                        error = '',
                        onBlur,placeholder
                    }) => {
    return (
        <div className={s.input}>
            {title && <p className={s.title}>{title}</p>}
            <input onBlur={onBlur} type={type} placeholder={placeholder} min={min} max={max} step={step} value={value} name={name}
                   onChange={onChange}/>
            {error && <span className={s.error}>{error}</span>}
        </div>
    );
};

export default InputModal;