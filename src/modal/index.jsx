import React, {useState} from 'react';
import s from './styles.module.css'
import {Box, Button, Fade, Modal} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ButtonModal from "../button";
import classNames from "classnames";
import InputModal from "../ui-kit/inputModal";
import SwitchModal from "../ui-kit/switchModal";
import SelectModal from "../ui-kit/selectModal";
import ModalInfo from "../modal_info";
import {useFormik} from "formik";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: '#1B2431',
    border: 'none',
    overflow: 'auto',
    boxShadow: 0,
    padding: '24px 160px',
};

const ModalTable = ({open, handleClose}) => {
    // 1 = будут изменения сохранены
    // 2 = не будут изменения сохранены
    // 3 = закрытие контракта
    // null = закрыть модалку

    const [openInfoModal, setOpenInfoModal] = useState(null)
    const options = [
        {value: 'date', label: 'Дата'},
        {value: 'number', label: 'Число'},
    ]

    const formik = useFormik({
        initialValues: {
            date_contract: null,
            type_contract: null,
            duration_contract: null,
            min_dist: null,
            fix: null,
            rb_player: null,
            countine: false,
            test_dist: null,
            date_game_off: null,
            root_indiva: null,
            root_denay: null,
            split: true,
            root_split: null,
            countine_split: false,
            day_close: null,
            note: null,
        },
        validate: (values) => {
            const errors = {}

            if (!values?.date_contract) {
                errors.date_contract = 'Обязательное поле'
            }
            if (!values?.type_contract) {
                errors.type_contract = 'Обязательное поле'
            }
            if (!values?.duration_contract) {
                errors.duration_contract = 'Обязательное поле'
            }
            if (!values?.min_dist) {
                errors.min_dist = 'Обязательное поле'
            } else if (+values?.min_dist > 100 || 0 > +values?.min_dist) {
                errors.min_dist = 'Значение должно быть не больше 100 и не меньше 0'
            }
            if (!values?.fix) {
                errors.fix = 'Обязательное поле'
            }
            if (!values?.rb_player) {
                errors.rb_player = 'Обязательное поле'
            }
            if (!values?.test_dist) {
                errors.test_dist = 'Обязательное поле'
            }
            if (!values?.date_game_off) {
                errors.date_game_off = 'Обязательное поле'
            }
            if (!values?.root_indiva) {
                errors.root_indiva = 'Обязательное поле'
            }
            if (!values?.root_denay) {
                errors.root_denay = 'Обязательное поле'
            }
            if (!values?.root_split) {
                errors.root_split = 'Обязательное поле'
            }
            if (!values?.day_close) {
                errors.day_close = 'Обязательное поле'
            }
            if (!values?.note) {
                errors.note = 'Обязательное поле'
            }

            return errors
        },
        onSubmit: (values) => {
            setOpenInfoModal(1)
        }
    })

    console.log(formik)
    return (
        <>

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

                <Fade in={Boolean(open)} timeout={300}>
                    <Box sx={style}>
                        {openInfoModal !== null &&
                            <ModalInfo type={openInfoModal} open={openInfoModal}
                                       handleClose={() => setOpenInfoModal(null)}/>}
                        <div className={s.back_box} onClick={handleClose}>
                            <KeyboardBackspaceIcon sx={{color: '#fff'}}/>
                            Назад к контрактам
                        </div>
                        <div className={s.title_box}>
                            <h1 className={s.title}>Меню добавления и редактирования контракта. Игрок -
                                PokerPlayer1 </h1>
                            <ButtonModal className={s.btn_close} onClick={() => setOpenInfoModal(3)}>Закрыть
                                контракт</ButtonModal>
                        </div>

                        <form onSubmit={formik.handleSubmit} className={s.content}>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Основные условия</h4>
                                <div className={s.content_item_box}>

                                    <InputModal value={formik?.values?.date_contract}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                                error={formik?.touched?.date_contract && formik?.errors?.date_contract}
                                                name={'date_contract'} type={'date'}
                                                title={'Дата подписания контракта'}/>

                                    <SelectModal title={'Тип контракта'}
                                                 onChange={(e) => {
                                                     formik.setFieldValue('type_contract', e)
                                                     formik.setFieldTouched('type_contract', false)

                                                     formik.setFieldValue('duration_contract', null)
                                                     formik.setFieldTouched('duration_contract', false)
                                                 }}
                                                 error={formik?.touched?.type_contract && formik?.errors?.type_contract}
                                                 value={formik?.values?.type_contract}
                                                 options={options}/>

                                    <InputModal
                                        value={formik?.values?.duration_contract}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.duration_contract && formik?.errors?.duration_contract}
                                        name={'duration_contract'}
                                        type={formik?.values?.type_contract?.value || 'number'}
                                        title={'Длительность контракта'}/>

                                    <InputModal
                                        value={formik?.values?.min_dist}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.min_dist && formik?.errors?.min_dist}
                                        name={'min_dist'}
                                        type={'number'} min={0} max={100} title={'Мин. мес. дистанция'}/>

                                    <InputModal
                                        value={formik?.values?.fix}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.fix && formik?.errors?.fix}
                                        name={'fix'}
                                        type={'number'} min={0} max={100}
                                        title={'Фикс откат в пользу игрока, %'}/>

                                    <InputModal
                                        value={formik?.values?.rb_player}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.rb_player && formik?.errors?.rb_player}
                                        name={'rb_player'}
                                        type={'number'} min={0} max={100} title={'РБ игроку, %'}/>

                                    <SwitchModal value={formik?.values?.countine} onChange={(e) => {
                                        formik.setFieldValue('countine', e?.target?.checked)
                                    }} title={'Продлить если не сыграл норму'}/>

                                    <InputModal
                                        value={formik?.values?.test_dist}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.test_dist && formik?.errors?.test_dist}
                                        name={'test_dist'}
                                        title={'Тестовая дистанция'}/>

                                    <InputModal
                                        value={formik?.values?.date_game_off}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.date_game_off && formik?.errors?.date_game_off}
                                        name={'date_game_off'}
                                        type={'date'} title={'Дата отсчета отыгранной дист. по контракту'}/>
                                </div>
                            </div>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Дополнительные условия</h4>

                                <div className={s.content_item_box}>
                                    <InputModal
                                        value={formik?.values?.root_indiva}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.root_indiva && formik?.errors?.root_indiva}
                                        name={'root_indiva'}
                                        title={'Условия получения индивы'}/>

                                    <InputModal
                                        value={formik?.values?.root_denay}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.root_denay && formik?.errors?.root_denay}
                                        name={'root_denay'}
                                        title={'Условия получения доп отката'}/>

                                    <SwitchModal
                                        value={formik?.values?.split} onChange={(e) => {
                                        formik.setFieldValue('split', e?.target?.checked)
                                    }}
                                        title={'Наличие сплитов'}/>

                                    <InputModal
                                        value={formik?.values?.root_split}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.root_split && formik?.errors?.root_split}
                                        name={'root_split'}
                                        title={'Условия сплита'}/>

                                    <SwitchModal
                                        value={formik?.values?.countine_split} onChange={(e) => {
                                        formik.setFieldValue('countine_split', e?.target?.checked)
                                    }}
                                        title={'Продление из-за сплита'}/>

                                    <InputModal
                                        value={formik?.values?.day_close}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.day_close && formik?.errors?.day_close}
                                        name={'day_close'}
                                        title={'День закрытия сета'}/>
                                </div>
                            </div>
                            <div className={classNames(s.content_item, s.content_item_last)}>
                                <h4 className={s.content_item_title}></h4>
                                <div className={s.content_item_box}>
                                    <div className={s.text_area}>
                                        <p className={s.text_area_title}>Заметки</p>
                                        <textarea
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.note}
                                            onBlur={formik.handleBlur}
                                            // error={formik?.touched?.day_close && formik?.errors?.day_close}
                                            name={'note'}
                                        />
                                        {formik?.touched?.note && formik?.errors?.note &&
                                            <span className={s.error}>{formik?.errors?.note}</span>}
                                    </div>

                                    <div className={s.btns}>
                                        <ButtonModal onClick={() => setOpenInfoModal(2)} className={s.btn_exit_no_save}>Выйти
                                            без сохранения</ButtonModal>
                                        <ButtonModal type={'submit'} className={s.btn_exit_save}>Сохранить
                                            изменения</ButtonModal>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalTable;