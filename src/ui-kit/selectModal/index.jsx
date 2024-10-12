import React from 'react';
import s from './styles.module.css'
import Select from "react-select";

const customStyles = {
    control: (provided, state) => {
        console.log(state)
        return {
            ...provided,
            height: '50px',
            padding: '0 4px',
            backgroundColor: state?.selectProps?.background ? state?.selectProps?.background : '#1B2431',
            border: state?.selectProps?.background ? '1px solid #CFCFCF33' : '1px solid #323D4E',
            borderRadius: '8px',
            boxShadow: 'none', // Убираем тень при фокусе
            '&:hover': {
                borderColor: 'none', // Цвет рамки при ховере
            },
        }
    },
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
        color: state.isSelected ? '#fff' : '#fff',
        backgroundColor: state.isSelected ? '#3A4962' : '#1B2431',
        '&:hover': {
            backgroundColor: 'rgba(58,73,98,0.85)', // Цвет при наведении на опцию
        },
    }),
};
const SelectModal = ({error, value, onChange, title = '', options = [], background = false}) => {
    return (
        <div className={s.input}>
            {title && <p className={s.title}>{title}</p>}
            <Select placeholder={''} styles={customStyles} background={background} value={value} onChange={onChange}
                    options={options}/>
            {error && <span className={s.error}>{error}</span>}
        </div>
    );
};

export default SelectModal;