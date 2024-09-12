import React from 'react';
import s from './styles.module.css'
import {Box, Modal} from "@mui/material";
import ButtonModal from "../button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '700px',
    height: 'fit-content',
    bgcolor: '#3A4962',
    border: 'none',
    overflow: 'auto',
    borderRadius: '16px',
    boxShadow: 0,
    zIndex: 99999999999999,
    padding: '46px 72px',
};

const ModalInfo = ({open, handleClose, type}) => {
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
            <Box sx={style}>
                <h1 className={s.title}>{type !== 3 ? 'Внимание!' : <>Внимание!
                    <br/>
                    Контракт будет закрыт.</>}</h1>

                <p className={s.desription}>
                    {type === 1 && 'Внесенные изменения будут сохранены!'}
                    {type === 2 && 'Изменения не будут сохранены!'}
                    {type === 3 && <div className={s.text_area}>
                        <p className={s.text_area_title}>Комментарий</p>
                        <textarea/>
                    </div>}
                </p>

                <div className={s.btns}>
                    <ButtonModal className={s.exit} onClick={handleClose}>Отмена</ButtonModal>
                    <ButtonModal className={s.save}>
                        {type === 1 && 'Сохранить'}
                        {type === 2 && 'Уйти'}
                        {type === 3 && 'Закрыть контракт'}
                    </ButtonModal>
                </div>
            </Box>
        </Modal>
    );
};

export default ModalInfo;