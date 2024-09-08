import React from 'react';
import s from './styles.module.css'
import {Box, Fade, Modal} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    bgcolor: '#1B2431',
    border: 'none',
    boxShadow: 0,
    p: 4,
};

const ModalTable = ({open, handleClose}) => {
    console.log(open)
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
            <Fade in={Boolean(open)} timeout={300}>
                <Box sx={style}>
                    <h1>{open?.type_btn}</h1>
                    <h1 onClick={handleClose}>Назад</h1>
                </Box>
            </Fade>
        </Modal>
    );
};

export default ModalTable;