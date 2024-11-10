import React, { useCallback, useEffect, useRef, useState } from 'react';
import s from './styles.module.css'
import { Box, Button, Fade, IconButton, Modal } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ButtonModal from "../button";
import classNames from "classnames";
import InputModal from "../ui-kit/inputModal";
import SwitchModal from "../ui-kit/switchModal";
import SelectModal from "../ui-kit/selectModal";
import ModalInfo from "../modal_info";
import { useFormik } from "formik";
import { useCreateContractMutation, useEditContractMutation } from "../redux/table.service";
import { toast } from "react-toastify";
import moment from "moment";
import axios from 'axios';
import { BASE_URL } from '../api/baseQuery';
import GetAppIcon from '@mui/icons-material/GetApp';

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

    '@media screen and (max-width: 1600px)': {
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

const ModalTable = ({ open, handleClose, contract_types, refetch_table }) => {
    // 1 = будут изменения сохранены
    // 2 = не будут изменения сохранены
    // 3 = закрытие контракта
    // null = закрыть модалку
    const { btn_type } = open
    // 1 = added
    // 2 = edit
    // 3 = contiune
    // 4 = watch
    const [openInfoModal, setOpenInfoModal] = useState(null)

    const fileInputRef = useRef(null); // Реф для input типа file


    const [createContract] = useCreateContractMutation()
    const [editContract] = useEditContractMutation()

    const isEdit = btn_type?.id === 2 || btn_type?.id === 4
    const isWatch = btn_type?.id === 4
    const isContinue = btn_type?.id === 3
    const formik = useFormik({
        initialValues: {
            date_sign_contract: null,
            contract_type: null,
            duration_contract: null,
            min_distance: null,
            fix_share: null,
            player_rb: null,
            has_min_distance_penalty: true,
            test_distance: null,
            date_start_contract: null,
            training_quota_type: null,
            training_quota: null,
            day_remove_training_quota: null,
            additional_share_terms: null,
            has_splits: false,
            split_terms: null,
            has_splits_penalty: false,
            day_set_close: null,
            notes: null,
            files: null
        },
        validate: (values) => {
            const errors = {}

            if (!values?.date_sign_contract) {
                errors.date_sign_contract = 'Обязательное поле'
            }
            if (!values?.contract_type) {
                errors.contract_type = 'Обязательное поле'
            }
            if (!values?.duration_contract) {
                errors.duration_contract = 'Обязательное поле'
            }
            if (!values?.min_distance) {
                errors.min_distance = 'Обязательное поле'
            }

            if (!values?.fix_share) {
                errors.fix_share = 'Обязательное поле'
            }
            if (!values?.player_rb) {
                errors.player_rb = 'Обязательное поле'
            }
            if (!values?.test_distance) {
                errors.test_distance = 'Обязательное поле'
            }
            if (!values?.date_start_contract) {
                errors.date_start_contract = 'Обязательное поле'
            }
            if (!values?.training_quota_type) {
                errors.training_quota_type = 'Обязательное поле'
            }
            if (!values?.training_quota) {
                errors.training_quota = 'Обязательное поле'
            }
            if (!values?.day_remove_training_quota) {
                errors.day_remove_training_quota = 'Обязательное поле'
            }
            if (!values?.additional_share_terms) {
                errors.additional_share_terms = 'Обязательное поле'
            }
            if (!values?.split_terms) {
                errors.split_terms = 'Обязательное поле'
            }
            if (!values?.day_set_close) {
                errors.day_set_close = 'Обязательное поле'
            }
            if (!values?.notes) {
                errors.notes = 'Обязательное поле'
            }

            return errors
        },
        onSubmit: async (values) => {
            console.log(values)
            if (values?.files) {
                await handleFileUpload(values);
            }

            const prepeared_contract_data = {
                player_id: open?.player_id,
                contract: {
                    date_sign_contract: values?.date_sign_contract,
                    contract_duration_type: values?.contract_type?.type,
                    contract_duration_name: values?.contract_type?.name,
                    end_contract_date: values?.contract_type?.type === 'date' ? values?.duration_contract : undefined,
                    end_contract_tourney: values?.contract_type?.type === 'number' ? values?.duration_contract : undefined,
                    min_distance: values?.min_distance,
                    fix_share: values?.fix_share,
                    player_rb: values?.player_rb,
                    has_min_distance_penalty: values?.has_min_distance_penalty,
                    test_distance: values?.test_distance,
                    date_start_contract: values?.date_start_contract,
                    training_quota_type: values?.training_quota_type?.value,
                    training_quota_tourney: values?.training_quota_type?.value === "tourney" ? values?.training_quota : undefined,
                    training_quota_day: values?.training_quota_type?.value === "day" ? values?.training_quota : undefined,
                    day_remove_training_quota: values?.day_remove_training_quota,
                    additional_share_terms: values?.additional_share_terms,
                    has_splits: values?.has_splits,
                    split_terms: values?.split_terms,
                    has_splits_penalty: values?.has_splits_penalty,
                    day_set_close: values?.day_set_close,
                    notes: values?.notes,
                }
            }
            if (isEdit) {
                editContract(prepeared_contract_data)
                    .unwrap()
                    .then((res) => {
                        console.log(res)
                        if (res?.error) {
                            toast.error(res?.message || 'Ошибка редактирования')
                        } else {
                            toast.success('Редактирование сохранено!')
                            handleClose()
                            refetch_table()
                        }
                    })
                    .catch((e) => {
                        toast.error('Ошибка редактирования')
                    })
            } else {
                createContract(prepeared_contract_data)
                    .unwrap()
                    .then((res) => {
                        console.log(res)
                        if (res?.error) {
                            toast.error(res?.message || 'Ошибка создания')
                        } else {
                            toast.success('Контаркт создан!')
                            handleClose()
                            refetch_table()
                        }
                    })
                    .catch((e) => {
                        toast.error('Ошибка создания')
                    })
            }
        }
    })

    const handleFileUpload = async (values) => {
        const { files } = values;

        if (!files) {
            toast.error("Пожалуйста, выберите файл для загрузки.");
            return;
        }

        const formData = new FormData();
        formData.append('file', files[0]); // Берем первый файл из массива
        formData.append('player_id', open?.player_id); // добавляем player_id из данных контракта

        try {
            const response = await axios.post(`${BASE_URL}/contracts/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200) {
                toast.success('Файл успешно загружен!');
            }
        } catch (error) {
            toast.error('Ошибка при загрузке файла!');
        }
    };

    const downloadFile = async (fileName, fileType) => {
        try {
            // Сначала пробуем скачать файл по имени
            let downloadUrl = `${BASE_URL}/contracts/download?fileName=${fileName}`;

            // Если не сработает, пробуем добавить тип файла
            if (fileType) {
                downloadUrl = `${BASE_URL}/contracts/download?fileName=${fileName}.${fileType}`;
            }

            const response = await axios.get(downloadUrl, {
                responseType: 'blob', // Важно: указать, что мы ожидаем blob (файл)
            });

            // Проверим, что сервер вернул файл
            if (response.status === 200) {
                const blob = response.data;
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = fileName; // имя файла, которое будет в момент скачивания
                link.click(); // Инициируем скачивание
            } else {
                toast.error('Ошибка при скачивании файла.');
            }
        } catch (error) {
            toast.error('Не удалось скачать файл. Попробуйте позже.');
            console.error(error);
        }
    };


    const handleDrop = useCallback((acceptedFiles) => {
        formik.setFieldValue('files', acceptedFiles);
    }, [formik]);

    // Обработчик удаления файла
    const handleRemoveFile = (e) => {
        e.stopPropagation()
        formik.setFieldValue('files', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Очистка поля ввода
        }
    };

    // Обработчик клика на input для выбора файла вручную
    const handleFileChange = (e) => {
        formik.setFieldValue('files', e.target.files);
    };

    useEffect(() => {
        if (isEdit) {
            const contract_type = contract_types?.find((f) => f?.name === open?.mtt_current_contract?.contract_duration_name)
            const training_quota_type = [
                { value: 'day', label: 'Количество дней' },
                { value: 'tourney', label: 'Количество турниров' }
            ]?.find((f) => f?.value === open?.mtt_current_contract?.training_quota_type)

            formik.setFieldValue('date_sign_contract', moment(open?.mtt_current_contract?.date_sign_contract)?.format('YYYY-MM-DD'))
            formik.setFieldValue('contract_type', {
                ...contract_type,
                label: contract_type?.name,
                value: contract_type._id
            })
            formik.setFieldValue('duration_contract', open?.mtt_current_contract?.contract_duration_type === 'number' ? open?.mtt_current_contract?.end_contract_tourney : moment(open?.mtt_current_contract?.end_contract_date)?.format('YYYY-MM-DD'))
            formik.setFieldValue('min_distance', open?.mtt_current_contract?.min_distance)
            formik.setFieldValue('fix_share', open?.mtt_current_contract?.fix_share)
            formik.setFieldValue('player_rb', open?.mtt_current_contract?.player_rb)
            formik.setFieldValue('has_min_distance_penalty', open?.mtt_current_contract?.has_min_distance_penalty)
            formik.setFieldValue('test_distance', open?.mtt_current_contract?.test_distance)
            formik.setFieldValue('date_start_contract', moment(open?.mtt_current_contract?.date_start_contract)?.format('YYYY-MM-DD'))
            formik.setFieldValue('training_quota_type', training_quota_type)
            formik.setFieldValue('training_quota', open?.mtt_current_contract?.training_quota_day || open?.mtt_current_contract?.training_quota_tourney)
            formik.setFieldValue('day_remove_training_quota', open?.mtt_current_contract?.day_remove_training_quota)
            formik.setFieldValue('additional_share_terms', open?.mtt_current_contract?.additional_share_terms)
            formik.setFieldValue('has_splits', open?.mtt_current_contract?.has_splits)
            formik.setFieldValue('split_terms', open?.mtt_current_contract?.split_terms)
            formik.setFieldValue('has_splits_penalty', open?.mtt_current_contract?.has_splits_penalty)
            formik.setFieldValue('day_set_close', open?.mtt_current_contract?.day_set_close)
            formik.setFieldValue('notes', open?.mtt_current_contract?.notes)
        }
    }, [isEdit])

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
                            <ModalInfo type={openInfoModal}
                                refetch_table={refetch_table}
                                data={open}
                                open={openInfoModal}
                                handleCloseAll={() => {
                                    setOpenInfoModal(null)
                                    handleClose()
                                }}
                                handleClose={() => setOpenInfoModal(null)} />}
                        <div className={s.back_box} onClick={handleClose}>
                            <KeyboardBackspaceIcon sx={{ color: '#fff' }} />
                            Назад к контрактам
                        </div>
                        <div className={s.title_box}>
                            <h1 className={s.title}>{`${(btn_type?.id === 1 && 'Меню добавления контракта') || (btn_type?.id === 2 && 'Меню редактирования контракта') || (btn_type?.id === 3 && 'Меню продления контракта') || (btn_type?.id === 4 && 'Просмотр контракта')}. Игрок - ${open?.nickname || '---'}`} </h1>
                            {(isEdit && btn_type?.id !== 4) &&
                                <ButtonModal className={s.btn_close} onClick={() => setOpenInfoModal(3)}>Закрыть
                                    контракт</ButtonModal>}
                        </div>

                        <form onSubmit={formik.handleSubmit} className={s.content}>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Основные условия</h4>
                                <div className={s.content_item_box}>

                                    <InputModal disabled={isWatch} value={formik?.values?.date_sign_contract}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            console.log(e)
                                            formik.handleChange(e)
                                        }}
                                        error={formik?.touched?.date_sign_contract && formik?.errors?.date_sign_contract}
                                        name={'date_sign_contract'} type={'date'}
                                        title={'Дата подписания контракта'} />

                                    <SelectModal title={'Тип контракта'}
                                        disabled={isWatch}
                                        onChange={(e) => {
                                            formik.setFieldValue('contract_type', e)
                                            formik.setFieldTouched('contract_type', false)

                                            formik.setFieldValue('duration_contract', null)
                                            formik.setFieldTouched('duration_contract', false)
                                        }}
                                        error={formik?.touched?.contract_type && formik?.errors?.contract_type}
                                        value={formik?.values?.contract_type}
                                        options={contract_types?.map((el) => ({
                                            ...el,
                                            label: el?.name,
                                            value: el._id
                                        }))} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.duration_contract}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.duration_contract && formik?.errors?.duration_contract}
                                        name={'duration_contract'}
                                        type={formik?.values?.contract_type?.type || 'number'}
                                        title={'Длительность контракта'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.min_distance}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            formik.setFieldValue('min_distance', +e?.target?.value === 0 ? null : Math.ceil(+e?.target?.value))
                                        }}
                                        error={formik?.touched?.min_distance && formik?.errors?.min_distance}
                                        name={'min_distance'}
                                        step={1}
                                        type={'number'} min={0} max={100} title={'Мин. мес. дистанция'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.fix_share}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.fix_share && formik?.errors?.fix_share}
                                        name={'fix_share'}
                                        type={'number'} min={0} max={100} step={1}
                                        title={'Фикс откат в пользу игрока, %'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.player_rb}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.player_rb && formik?.errors?.player_rb}
                                        name={'player_rb'}
                                        type={'number'} min={0} max={100} title={'РБ игроку, %'} />

                                    <SwitchModal disabled={isWatch} value={formik?.values?.has_min_distance_penalty}
                                        onChange={(e) => {
                                            formik.setFieldValue('has_min_distance_penalty', e?.target?.checked)
                                        }} title={'Продлить если не сыграл норму'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.test_distance}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.test_distance && formik?.errors?.test_distance}
                                        name={'test_distance'}
                                        title={'Тестовая дистанция'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.date_start_contract}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.date_start_contract && formik?.errors?.date_start_contract}
                                        name={'date_start_contract'}
                                        type={'date'} title={'Дата отсчета отыгранной дист. по контракту'} />
                                </div>
                            </div>
                            <div className={s.content_item}>
                                <h4 className={s.content_item_title}>Дополнительные условия</h4>

                                <div className={s.content_item_box}>

                                    <SelectModal title={'Условия получения индивы'}
                                        disabled={isWatch}
                                        onChange={(e) => {
                                            formik.setFieldValue('training_quota_type', e)
                                            formik.setFieldTouched('training_quota_type', false)

                                            formik.setFieldValue('training_quota', 1)
                                            formik.setFieldTouched('training_quota', false)
                                        }}
                                        error={formik?.touched?.training_quota_type && formik?.errors?.training_quota_type}
                                        value={formik?.values?.training_quota_type}
                                        options={
                                            [
                                                { value: 'day', label: 'Количество дней' },
                                                { value: 'tourney', label: 'Количество турниров' }
                                            ]
                                        } />
                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.training_quota}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            let value = +e.target.value || null;

                                            if (formik?.values?.training_quota_type?.value === 'day') {
                                                if (value > 31) {
                                                    value = 31
                                                }
                                            }

                                            formik.setFieldValue('training_quota', value)
                                        }}
                                        error={formik?.touched?.training_quota && formik?.errors?.training_quota}
                                        name={'training_quota'}
                                        type={'number'} min={1}
                                        title={'Количество дней для начисления квоты'} />
                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.day_remove_training_quota}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            let value = +e.target.value || null;

                                            if (value > 31) {
                                                value = 31
                                            }

                                            formik.setFieldValue('day_remove_training_quota', value)
                                        }}
                                        error={formik?.touched?.day_remove_training_quota && formik?.errors?.day_remove_training_quota}
                                        name={'day_remove_training_quota'}
                                        type={'number'} min={0}
                                        title={'День аннулирования трени'} />

                                    <div className={s.text_area}>
                                        <p className={s.text_area_title}>Условия получения доп отката</p>
                                        <textarea
                                            disabled={isWatch}
                                            style={{ height: '100px' }}
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.additional_share_terms}
                                            onBlur={formik.handleBlur}
                                            // error={formik?.touched?.day_close && formik?.errors?.day_close}
                                            name={'additional_share_terms'}
                                        />
                                        {formik?.touched?.additional_share_terms && formik?.errors?.additional_share_terms &&
                                            <span className={s.error}>{formik?.errors?.additional_share_terms}</span>}
                                    </div>

                                    <SwitchModal
                                        disabled={isWatch}
                                        value={formik?.values?.has_splits} onChange={(e) => {
                                            formik.setFieldValue('has_splits', e?.target?.checked)
                                        }}
                                        title={'Наличие сплитов'} />

                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.split_terms}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        error={formik?.touched?.split_terms && formik?.errors?.split_terms}
                                        name={'split_terms'}
                                        title={'Условия сплита'} />

                                    <SwitchModal
                                        disabled={isWatch}
                                        value={formik?.values?.has_splits_penalty} onChange={(e) => {
                                            formik.setFieldValue('has_splits_penalty', e?.target?.checked)
                                        }}
                                        title={'Продление из-за сплита'} />


                                    <InputModal
                                        disabled={isWatch}
                                        value={formik?.values?.day_set_close}
                                        onBlur={formik.handleBlur}
                                        onChange={(e) => {
                                            let value = +e.target.value || null;

                                            if (value > 31) {
                                                value = 31
                                            }

                                            formik.setFieldValue('day_set_close', value)
                                        }}
                                        error={formik?.touched?.day_set_close && formik?.errors?.day_set_close}
                                        name={'day_set_close'}
                                        type={'number'} min={1}
                                        title={'День закрытия сета'} />
                                </div>
                            </div>
                            <div className={classNames(s.content_item, s.content_item_last)}>
                                <h4 className={s.content_item_title}></h4>
                                <div className={s.content_item_box}>
                                    <div className={s.text_area}>
                                        <p className={s.text_area_title}>Заметки</p>
                                        <textarea
                                            disabled={isWatch}
                                            onChange={formik?.handleChange}
                                            value={formik?.values?.notes}
                                            onBlur={formik.handleBlur}
                                            // error={formik?.touched?.day_close && formik?.errors?.day_close}
                                            name={'notes'}
                                        />
                                        {formik?.touched?.notes && formik?.errors?.notes &&
                                            <span className={s.error}>{formik?.errors?.notes}</span>}
                                    </div>

                                    <div className={s.content_item}>
                                        <h4 className={s.content_item_title}>Загрузка и просмотр</h4>
                                        {(open?.mtt_current_contract?.files && open?.mtt_current_contract?.files?.lenght !== 0) ? <div className={s.list_files}>
                                            {open?.mtt_current_contract?.files?.map((el) => <div key={el?._id} className={s.list_box}>
                                                {el?.name}
                                                <IconButton color='#fff' onClick={() => downloadFile(el?.name)}>
                                                    <GetAppIcon sx={{ color: 'FFFFFF' }} />
                                                </IconButton></div>)}
                                        </div> :  <h4 className={s.content_item_title} style={{fontSize:'14px'}}>Нет файлов</h4>}
                                        {btn_type?.id === 2 && <div className={s.content_item_box}>
                                            <div
                                                className={classNames(s.file_upload_box, { [s.file_dragging]: formik.values.files === null })}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    handleDrop(e.dataTransfer.files);
                                                }}
                                                onDragOver={(e) => e.preventDefault()}
                                            >
                                                {formik.values.files ? (
                                                    <div className={s.file_details}>
                                                        <span className={s.file_name}>{formik.values.files[0]?.name}</span>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveFile}
                                                            className={s.remove_file_button}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className={s.drop_message}>Перетащите файл сюда или кликните для выбора</span>
                                                )}
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    className={s.file_input}
                                                    accept="image/*, .pdf, .doc, .docx"
                                                />
                                            </div>
                                        </div>}
                                    </div>

                                    {btn_type?.id !== 4 && <div className={s.btns}>
                                        {(btn_type?.id !== 1 && !isContinue) &&
                                            <ButtonModal onClick={() => setOpenInfoModal(2)}
                                                className={s.btn_exit_no_save}>Выйти
                                                без сохранения</ButtonModal>}
                                        <ButtonModal type={'submit'} className={s.btn_exit_save}>
                                            {(btn_type?.id === 1 || isContinue) ? (isContinue ? 'Продлить' : 'Добавить') : 'Сохранить изменения'}
                                        </ButtonModal>
                                    </div>}
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