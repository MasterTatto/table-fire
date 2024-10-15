import React, {useState} from 'react';
import s from './styles.module.css'
import {Box, Modal} from "@mui/material";
import ButtonModal from "../../button";
import {useFormik} from "formik";
import InputModal from "../../ui-kit/inputModal";
import SelectModal from "../../ui-kit/selectModal";
import {useCreateSplitMutation} from "../../redux/table.service";
import {toast} from "react-toastify";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '440px',
    height: 'fit-content',
    bgcolor: '#3A4962',
    border: 'none',
    overflow: 'auto',
    borderRadius: '16px',
    boxShadow: 0,
    zIndex: 99999999999999,
    padding: '16px 24px',

    '@media screen and (max-width: 780px)': {
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100dvh',
        height: '100dvh',
        overflow: 'auto',
        borderRadius: '0px',
        padding: '12px 16px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between'
    },
};

const currency_options = [
    {value: 'USD', label: 'USD'},
    {value: 'EUR', label: 'EUR'},
    {value: 'CNY', label: 'CNY'},
    {value: 'RUB', label: 'RUB'},
]

const ModalAdded = ({open, handleClose, type, refetch_table, player_id, data, setModalSplit}) => {
    const [createSplit] = useCreateSplitMutation()

    const handleCreate = (payload) => {
        createSplit(payload)
            .unwrap()
            .then((res) => {
                if (res?.error) {
                    toast.error(res?.message || 'Ошибка создания сплита')
                } else {
                    toast.success('Создано')
                    setModalSplit({
                        ...data,
                        mtt_current_contract: {
                            ...data?.mtt_current_contract,
                            splits_preps: res?.edited_contract?.splits_preps || []
                        }
                    })
                    refetch_table()
                    handleClose()
                }
            })
            .catch((e) => {
                console.log(e)
                toast.error('Ошибка создания сплита')
            })
    }

    const formikSplit = useFormik({
        initialValues: {
            date: null,
            description: null,
            support_nickname: null
        },
        validate: (values) => {
            const errors = {}

            if (!values?.date) {
                errors.date = 'Обязательное поле'
            }
            if (!values?.description) {
                errors.description = 'Обязательное поле'
            }
            if (!values?.support_nickname) {
                errors.support_nickname = 'Обязательное поле'
            }

            return errors
        },
        onSubmit: (values) => {
            handleCreate({
                player_id: player_id,
                split: {...values, type: type}
            })
        }
    })
    const formikPrep = useFormik({
        initialValues: {
            date: null,
            description: null,
            support_nickname: null,
            sum: null,
            currency: null,
            status: null,
        },
        validate: (values) => {
            const errors = {}

            if (!values?.date) {
                errors.date = 'Обязательное поле'
            }
            if (!values?.description) {
                errors.description = 'Обязательное поле'
            }
            if (!values?.support_nickname) {
                errors.support_nickname = 'Обязательное поле'
            }
            if (!values?.sum) {
                errors.sum = 'Обязательное поле'
            }
            if (!values?.currency) {
                errors.currency = 'Обязательное поле'
            }
            if (!values?.status) {
                errors.status = 'Обязательное поле'
            }

            return errors
        },
        onSubmit: (values) => {
            handleCreate({
                player_id: player_id,
                split: {...values, type: type, currency: values?.currency?.value}
            })
        }
    })

    const formik = type === 'split' ? formikSplit : formikPrep

    return (
        <Modal
            open={Boolean(open)}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropProps={{
                timeout: 300, // Время анимации для backdrop
            }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Box sx={style}>

                    <h1 className={s.title}>{type === 'split' ? 'Добавить сплит' : 'Добавить аванс'}</h1>

                    <div className={s.content}>
                        {type === 'split' ? <>
                            <InputModal value={formik?.values?.date}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            console.log(e)
                                            formik.handleChange(e)
                                        }}
                                        error={formik?.touched?.date && formik?.errors?.date}
                                        name={'date'} type={'date'}
                                        title={'Дата выдачи'}/>
                            <InputModal
                                value={formik?.values?.description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.description && formik?.errors?.description}
                                name={'description'}
                                title={'Описание'}/>
                            <InputModal
                                value={formik?.values?.support_nickname}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.support_nickname && formik?.errors?.support_nickname}
                                name={'support_nickname'}
                                title={'Кто выдал'}/>
                        </> : <>
                            <InputModal value={formik?.values?.date}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            console.log(e)
                                            formik.handleChange(e)
                                        }}
                                        error={formik?.touched?.date && formik?.errors?.date}
                                        name={'date'} type={'date'}
                                        title={'Дата выдачи'}/>
                            <InputModal
                                value={formik?.values?.description}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.description && formik?.errors?.description}
                                name={'description'}
                                title={'Описание'}/>
                            <InputModal
                                value={formik?.values?.support_nickname}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.support_nickname && formik?.errors?.support_nickname}
                                name={'support_nickname'}
                                title={'Кто выдал'}/>

                            <InputModal
                                value={formik?.values?.sum}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.sum && formik?.errors?.sum}
                                type={'number'}
                                min={1}
                                name={'sum'}
                                title={'Сумма'}/>

                            <SelectModal title={'Валюта'}
                                         background={'inherit'}
                                         onChange={(e) => {
                                             formik.setFieldValue('currency', e)
                                             formik.setFieldTouched('currency', false)
                                         }}
                                         error={formik?.touched?.currency && formik?.errors?.currency}
                                         value={formik?.values?.currency}
                                         options={currency_options}/>

                            <InputModal
                                value={formik?.values?.status}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                error={formik?.touched?.status && formik?.errors?.status}
                                name={'status'}
                                title={'Статус'}/>
                        </>}
                    </div>
                    <div className={s.btns}>
                        <ButtonModal className={s.exit} onClick={handleClose}>Отмена</ButtonModal>
                        <ButtonModal className={s.save} type={'submit'}>
                            Добавить
                        </ButtonModal>
                    </div>
                </Box>
            </form>
        </Modal>
    );
};

export default ModalAdded;