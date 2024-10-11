import React, {useState} from 'react';
import s from './styles.module.css'
import {Box, Modal} from "@mui/material";
import ButtonModal from "../button";
import {useCloseContractMutation} from "../redux/table.service";
import {toast} from "react-toastify";

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

const ModalInfo = ({open, handleClose, type, handleCloseAll, data, refetch_table}) => {
    const [closeContract] = useCloseContractMutation()
    const [value, setValue] = useState('')
    console.log(data)
    const handleCloseContract = () => {
        if (!value) {
            toast.error('Комментарий не может быть пустым')
        } else {
            const id_user = data?.player_id

            closeContract({
                player_id: id_user,
                description: value
            }).unwrap()
                .then((res) => {
                    if (res?.error) {
                        toast.error(res?.message || 'Ошибка закрытия контракта')
                    } else {
                        refetch_table()
                        handleCloseAll()
                    }
                    console.log(res)

                })
                .catch((e) => {
                    console.log(e)
                    toast.error('Ошибка закрытия контракта')
                })
        }
    }
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
                        <textarea value={value} onChange={(e) => setValue(e?.target?.value)}/>
                    </div>}
                </p>

                <div className={s.btns}>
                    <ButtonModal className={s.exit} onClick={handleClose}>Отмена</ButtonModal>
                    <ButtonModal className={s.save} onClick={() => {
                        if (type === 2) {
                            handleCloseAll()
                        } else if (type === 3) {
                            handleCloseContract()
                        }
                    }}>
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