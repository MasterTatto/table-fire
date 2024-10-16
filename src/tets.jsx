import React, {
    useCallback, useEffect,
    useMemo,
    useState,
} from "react";
import {AgGridReact} from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "./table.css"
import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ModuleRegistry} from "@ag-grid-community/core";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import classNames from "classnames";
import {mock, mock_data} from "./mock";
import moment from "moment";
import ModalTable from "./modal";
import {useGetTableDataQuery} from "./redux/table.service";
import ModalTableSplit from "./modal_split";
import Input from "./input";
import InputModal from "./ui-kit/inputModal";
import SelectModal from "./ui-kit/selectModal";
import {useFormik} from "formik";
import {debounce} from "lodash";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MasterDetailModule,
    MenuModule,
]);

export const GridExample = () => {
    const {data, isLoading, refetch} = useGetTableDataQuery('', {
        refetchOnReconnect: true,
        refetchOnMountOrArgChange: true,
    })
    console.log(data)
    const [modalData, setModalData] = useState(null)
    const [modalSplit, setModalSplit] = useState(null)

    const isRowMaster = useCallback((dataItem) => {
        return dataItem ? dataItem?.mtt_prev_contracts?.length > 0 : false;
    }, []);
    const [filteredData, setFilteredData] = useState([]);


    const [columnDefs, setColumnDefs] = useState([
        {
            field: "nickname",
            cellRenderer: "agGroupCellRenderer",
            headerName: 'Никнейм',
            cellClass: 'cell_text',
            minWidth: 150,
        },
        {
            field: "date_join_mtt",
            headerName: 'Дата прихода в команду',
            minWidth: 170,
            cellRenderer: (params) => {
                return <span
                    className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
            }
        },
        {
            field: "mtt_current_contract.contract_duration_name",
            headerName: 'Тип контракта',
            cellClass: 'cell_text',
            minWidth: 150,
            cellRenderer: (params) => {
                return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
            }
        },
        {
            field: "mtt_current_contract.contract_duration_type",
            headerName: 'Срок текущего контракта',
            minWidth: 150,
            cellRenderer: (params) => {

                return <span
                    className={classNames('cell_text')}>{params?.value === 'number' ? params?.data?.mtt_current_contract?.end_contract_tourney : (params?.data?.mtt_current_contract?.end_contract_date ? moment(params?.data?.mtt_current_contract?.end_contract_date)?.format('DD.MM.YYYY') : '---')}</span>
            }
        },
        {
            field: "type_btn",
            headerName: 'Контракт',
            minWidth: 150,
            cellRenderer: (params) => {
                const typeBtn = {
                    1: {
                        title: 'Добавить',
                        id: 1 // added
                    },
                    2: {
                        title: 'Редактировать',
                        id: 2 // edit
                    },
                    3: {
                        title: 'Продлить',
                        id: 3 // contiune
                    },
                }
                const data = params?.data
                return <span onClick={() => setModalData({...data, btn_type: typeBtn[params?.value]})}
                             className={classNames('cell_text', 'cell_text_btn')}>{typeBtn[params?.value]?.title || '---'}</span>
            }
        },
        {
            field: "",
            headerName: 'Сплиты и авансы',
            minWidth: 150,
            cellRenderer: (params) => {
                const isHaveContarct = params?.data?.mtt_current_contract
                return <span
                    className={classNames('cell_text', 'cell_text_btn')}
                    onClick={() => isHaveContarct ? setModalSplit(params?.data) : {}}>{isHaveContarct ? 'Перейти' : ''}</span>
            }
        },
    ]);

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            suppressMenu: true,
        };
    }, []);

    const detailCellRendererParams = useMemo(() => {
        return {
            detailGridOptions: {
                columnDefs: [
                    {
                        minWidth: 150,
                        field: "",
                        headerName: 'Статус',
                        cellClass: 'cell_text',
                        cellRenderer: (params) => {
                            return <span
                                className={classNames('cell_text')}>Контракт закрыт</span>
                        }
                    },
                    {
                        minWidth: 150,
                        field: "close_date",
                        headerName: 'Дата закрытия контракта',
                        cellRenderer: (params) => {
                            return <span
                                className={classNames('cell_text')}>{params?.value ? moment(params?.value)?.format('DD.MM.YYYY HH:mm') : '---'}</span>
                        }
                    },
                    {
                        minWidth: 150,
                        field: "contract_duration_name",
                        headerName: 'Тип контракта',
                        cellClass: 'cell_text',
                    },
                    {
                        minWidth: 150,
                        field: "contract_duration_type",
                        headerName: 'Срок текущего контракта',
                        cellRenderer: (params) => {
                            return <span
                                className={classNames('cell_text')}>{params?.value === 'number' ? params?.data?.end_contract_tourney : (params?.data?.end_contract_date ? moment(params?.data?.end_contract_date)?.format('DD.MM.YYYY HH:mm') : '---')}</span>
                        }
                    },
                    {
                        minWidth: 150,
                        field: "close_description",
                        headerName: 'Коментарий',
                        cellClass: 'cell_text',
                        wrapText: true,
                        autoHeight: true,
                        cellStyle: {whiteSpace: 'normal', wordWrap: 'break-word'}
                    },
                    {
                        minWidth: 150,
                        field: "",
                        headerName: 'Просмотр',

                        cellRenderer: (params) => {
                            console.log(params)
                            return <span className={classNames('cell_text', 'cell_text_btn')}
                                         onClick={() => setModalData({
                                             mtt_current_contract: {...params?.data},
                                             isBlockAdded: true,
                                             player_id: params?.data?.player_id,
                                             nickname: params?.data?.nickname,
                                             btn_type: {
                                                 title: 'Просмотр',
                                                 id: 4 // contiune
                                             }
                                         })}>Смотреть</span>
                        }
                    },
                    {
                        field: "",
                        headerName: 'Сплиты и авансы',
                        minWidth: 150,
                        cellRenderer: (params) => {
                            const isHaveContarct = params?.data?.splits_preps && Array.isArray(params?.data?.splits_preps) && params?.data?.splits_preps?.length !== 0
                            console.log(params)
                            return <span
                                className={classNames('cell_text', 'cell_text_btn')}
                                onClick={() => isHaveContarct ? setModalSplit({
                                    mtt_current_contract: {...params?.data},
                                    isBlockAdded: true,
                                    player_id: params?.data?.player_id,
                                    nickname: params?.data?.nickname,
                                }) : {}}>{isHaveContarct ? 'Перейти' : ''}</span>
                        }
                    },
                ],
                defaultColDef: {
                    flex: 1,
                    suppressMenu: true,
                },

            },
            getDetailRowData: function (params) {
                console.log(params)
                params.successCallback(params.data?.mtt_prev_contracts?.map((el) => ({
                    ...el,
                    nickname: params?.data?.nickname,
                    player_id: params?.data?.player_id
                })));
            },
        };
    }, []);

    const filterFormik = useFormik({
        initialValues: {
            nickname: null,
            date: null,
            type: null,
            status: null,
        }
    })
    console.log(filterFormik?.values?.date)

    const parseDate = (dateString) => {
        if (!dateString) return null; // Проверка на null или пустую строку
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    };

    const filterData = useMemo(() => {
        const debouncedFilter = debounce(() => {
            if (data?.players) {
                const filtered = data.players.filter((player) => {
                    const isNicknameMatch = filterFormik.values.nickname
                        ? player.nickname.toLowerCase().includes(filterFormik.values.nickname.toLowerCase())
                        : true;

                    const isDateMatch = filterFormik.values.date
                        ? parseDate(player.date_join_mtt)?.toLocaleDateString() ===
                        new Date(filterFormik.values.date).toLocaleDateString()
                        : true;

                    const isTypeMatch = filterFormik.values.type
                        ? (filterFormik.values?.type?.value === 'all' ? true : player?.mtt_current_contract?.contract_duration_name === filterFormik.values?.type?.label)
                        : true;

                    const isStatusMatch = filterFormik.values.status
                        ? (filterFormik.values.status?.value === 'all' ? true : +player?.type_btn === +filterFormik.values?.status?.value)
                        : true;

                    return isNicknameMatch && isDateMatch && isTypeMatch && isStatusMatch;
                });
                setFilteredData(filtered);
            }
        }, 300); // Задержка 300 мс

        return debouncedFilter;
    }, [data, filterFormik.values]);

// Вызов функции фильтрации при изменении значений фильтра
    useEffect(() => {
        filterData();
    }, [filterData]);
    console.log(filteredData)
    return (
        <>
            <div className={'inputs_box'}>
                <InputModal
                    value={filterFormik?.values?.nickname}
                    onChange={filterFormik?.handleChange}
                    name={'nickname'}
                    title={'Поиск по никнеймам'}/>

                <InputModal
                    value={filterFormik?.values?.date}
                    onChange={filterFormik?.handleChange}
                    name={'date'}
                    type={'date'}
                    title={'Дата прихода в команду'}/>
                <SelectModal title={'Тип контракта'}
                             onChange={(e) => {
                                 filterFormik.setFieldValue('type', e)
                             }}
                             value={filterFormik?.values?.type}
                             options={data?.contract_types ? [{
                                 value: 'all',
                                 label: 'Все'
                             }, ...data?.contract_types?.map((el) => ({
                                 ...el,
                                 value: el?._id,
                                 label: el?.name
                             }))] : []}/>
                <SelectModal title={'Статус контракта'}
                             value={filterFormik?.values?.status}
                             onChange={(e) => {
                                 filterFormik.setFieldValue('status', e)
                             }}
                             options={
                                 [
                                     {value: 'all', label: 'Все'},
                                     {value: '1', label: 'Добавить'},
                                     {value: '2', label: 'Редактировать'},
                                     {value: '3', label: 'Продлить'},
                                 ]
                             }/>

            </div>
            <h2 className={'title'}>Страница контрактов</h2>

            <div
                style={{height: '600px', width: '100% '}}
                className={
                    "ag-theme-quartz"
                }
            >
                {Boolean(modalData) &&
                    <ModalTable refetch_table={refetch} contract_types={data?.contract_types || []} open={modalData}
                                handleClose={() => setModalData(null)}/>}
                {Boolean(modalSplit) &&
                    <ModalTableSplit refetch_table={refetch} open={modalSplit} setModalSplit={setModalSplit}
                                     handleClose={() => setModalSplit(null)}/>}
                <AgGridReact
                    rowData={filteredData || []}
                    masterDetail={true}
                    context={{parentData: data}}
                    isRowMaster={isRowMaster}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    suppressDragLeaveHidesColumns={true}
                    domLayout='autoHeight'
                    detailCellRendererParams={detailCellRendererParams}
                />
            </div>

        </>
    );
};