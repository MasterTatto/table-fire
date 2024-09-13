import React from 'react';
import s from './styles.module.css'
import classNames from "classnames";

const ButtonModal = ({children, onClick, className, type = 'button'}) => {
    return (
        <button type={type} onClick={() => type === 'submit' ? () => {
        } : (onClick ? onClick() : () => {
        })} className={classNames(s.btn, className)}>
            {children}
        </button>
    );
};

export default ButtonModal;