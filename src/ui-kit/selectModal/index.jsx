import React from 'react';
import s from './styles.module.css'
import Select from "react-select";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        height: '50px',
        padding: '0 4px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        border: '1px solid #CFCFCF33',
        borderRadius: '8px',
        boxShadow: 'none', // Убираем тень при фокусе
        '&:hover': {
            borderColor: 'none', // Цвет рамки при ховере
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '27.28px',
        textAlign: 'left',
        color: '#FFFFFF',
    }),
    option: (provided, state) => ({
        ...provided,
        fontFamily: 'Nunito Sans, sans-serif',
        fontSize: '20px',
        fontWeight: '600',
        lineHeight: '27.28px',
        textAlign: 'left',
        color: state.isSelected ? '#fff' : '#6110f1',
        backgroundColor: state.isSelected ? '#6110f1' : '#fff',
        '&:hover': {
            backgroundColor: 'lightblue', // Цвет при наведении на опцию
        },
    }),
};
const SelectModal = ({error,value, onChange, title = '', options = []}) => {
    return (
        <div className={s.input}>
            {title && <p className={s.title}>{title}</p>}
            <Select placeholder={''} styles={customStyles} value={value} onChange={onChange} options={options}/>
            {error && <span className={s.error}>{error}</span>}
        </div>
    );
};

export default SelectModal;