import React, {useMemo, useState} from 'react';
import s from './styles.module.css'
import {Box, Fade, Modal} from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ButtonModal from "../button";
import classNames from "classnames";
import moment from "moment/moment";
import {AgGridReact} from "@ag-grid-community/react";
import ModalAdded from "./modal_added";

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


const ModalTableSplit = ({open, handleClose, refetch_table, setModalSplit}) => {
    const data = open?.mtt_current_contract?.splits_preps || []
    console.log(open)

    const data_table = {
        "split": data?.filter((f) => f?.type === 'split'),
        "prep": data?.filter((f) => f?.type === 'prep'),
    }

    const [openAdded, setOpenAdded] = useState(false)
    // split
    // prep
    const [typeBtn, setTypeBtn] = useState('split')

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            suppressMenu: true,
        };
    }, []);

    const [columnDefs] = useState({
        "split": [
            {
                field: "date",
                headerName: 'Дата выдачи',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span
                        className={classNames('cell_text')}>{!params?.value ? '---' : moment(params?.data?.mtt_current_contract?.end_contract_date)?.format('DD.MM.YYYY')}</span>
                }
            },
            {
                field: "description",
                headerName: 'Описание',
                cellRenderer: (params) => {
                    return <span
                        className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
            {
                field: "support_nickname",
                headerName: 'Кто выдал',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
        ],
        "prep": [
            {
                field: "date",
                headerName: 'Дата выдачи',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span
                        className={classNames('cell_text')}>{!params?.value ? '---' : moment(params?.data?.mtt_current_contract?.end_contract_date)?.format('DD.MM.YYYY')}</span>
                }
            },
            {
                field: "description",
                headerName: 'Описание',
                cellRenderer: (params) => {
                    return <span
                        className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
            {
                field: "support_nickname",
                headerName: 'Кто выдал',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
            {
                field: "sum",
                headerName: 'Сумма',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
            {
                field: "currency",
                headerName: 'Валюта',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
            {
                field: "status",
                headerName: 'Статус аванса (погашен/не погашен)',
                cellClass: 'cell_text',
                cellRenderer: (params) => {
                    return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
                }
            },
        ]
    });

    return (
        <>
            {openAdded &&
                <ModalAdded setModalSplit={setModalSplit} player_id={open?.player_id} refetch_table={refetch_table}
                            open={openAdded}
                            data={open}
                            handleClose={() => setOpenAdded(false)}
                            type={typeBtn}/>}
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
                        <div className={s.back_box} onClick={handleClose}>
                            <KeyboardBackspaceIcon sx={{color: '#fff'}}/>
                            Назад к контрактам
                        </div>
                        <div className={s.title_box}>
                            <h1 className={s.title}>{`Сплиты и авансы. Игрок - ${open?.nickname || '---'}`} </h1>
                        </div>

                        <div className={s.content}>
                            <div className={s.header}>
                                <div className={s.choose_type}>
                                    <p onClick={() => setTypeBtn('split')}
                                       className={classNames(s.choose_type_btn, typeBtn === 'split' && s.choose_type_btn_active)}>Сплиты</p>
                                    <p onClick={() => setTypeBtn('prep')}
                                       className={classNames(s.choose_type_btn, typeBtn === 'prep' && s.choose_type_btn_active)}>Авансы</p>
                                </div>

                                {!open?.isBlockAdded &&
                                    <ButtonModal className={s.added_btn} onClick={() => setOpenAdded(true)}>
                                        {typeBtn === 'split' ? 'Добавить сплит' : 'Добавить аванс'}
                                    </ButtonModal>}
                            </div>
                            <div className={
                                "ag-theme-quartz"
                            }>


                                <AgGridReact
                                    rowData={data_table[typeBtn] || []}
                                    // masterDetail={true}
                                    columnDefs={columnDefs[typeBtn] || []}
                                    defaultColDef={defaultColDef}
                                    suppressDragLeaveHidesColumns={true}
                                    domLayout='autoHeight'
                                />
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ModalTableSplit;