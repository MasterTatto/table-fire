import React from 'react';
import s from './styles.module.css'
import classNames from "classnames";

const ButtonModal = ({children,onClick,className}) => {
    return (
        <div onClick={onClick} className={classNames(s.btn,className)}>
            {children}
        </div>
    );
};

export default ButtonModal;