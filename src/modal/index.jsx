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
        {value: 'wow1', label: 'wow1'},
        {value: 'wow2', label: 'wow2'},
        {value: 'wow3', label: 'wow3'}
    ]
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
                            <ModalInfo type={openInfoModal} open={openInfoModal} handleClose={() => setOpenInfoModal(null)}/>}
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

                        <div className={s.content}>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Основные условия</h4>
                                <div className={s.content_item_box}>
                                    <InputModal type={'date'} title={'Дата подписания контракта'}/>
                                    <SelectModal title={'Тип контракта'} options={options}/>
                                    <InputModal title={'Длительность контракта'}/>
                                    <InputModal type={'number'} min={0} max={100} title={'Мин. мес. дистанция'}/>
                                    <InputModal type={'number'} min={0} max={100}
                                                title={'Фикс откат в пользу игрока, %'}/>
                                    <InputModal type={'number'} min={0} max={100} title={'РБ игроку, %'}/>
                                    <SwitchModal title={'Продлить если не сыграл норму'}/>
                                    <InputModal title={'Тестовая дистанция'}/>
                                    <InputModal type={'date'} title={'Дата отсчета отыгранной дист. по контракту'}/>
                                </div>
                            </div>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Дополнительные условия</h4>

                                <div className={s.content_item_box}>
                                    <InputModal title={'Условия получения индивы'}/>
                                    <InputModal title={'Условия получения доп отката'}/>
                                    <SwitchModal title={'Наличие сплитов'}/>
                                    <InputModal title={'Условия сплита'}/>
                                    <SwitchModal title={'Продление из-за сплита'}/>
                                    <InputModal title={'День закрытия сета'}/>
                                </div>
                            </div>
                            <div className={classNames(s.content_item, s.content_item_last)}>
                                <h4 className={s.content_item_title}></h4>
                                <div className={s.content_item_box}>
                                    <div className={s.text_area}>
                                        <p className={s.text_area_title}>Заметки</p>
                                        <textarea/>
                                    </div>

                                    <div className={s.btns}>
                                        <ButtonModal onClick={() => setOpenInfoModal(2)} className={s.btn_exit_no_save}>Выйти
                                            без сохранения</ButtonModal>
                                        <ButtonModal onClick={() => setOpenInfoModal(1)} className={s.btn_exit_save}>Сохранить
                                            изменения</ButtonModal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalTable;