import React, {
    useCallback,
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


    const [columnDefs, setColumnDefs] = useState([
        {
            field: "nickname",
            cellRenderer: "agGroupCellRenderer",
            headerName: 'Никнейм',
            cellClass: 'cell_text',
        },
        {
            field: "date_join_mtt",
            headerName: 'Дата прихода в команду',
            cellRenderer: (params) => {
                return <span
                    className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
            }
        },
        {
            field: "mtt_current_contract.contract_duration_name",
            headerName: 'Тип контракта',
            cellClass: 'cell_text',
            cellRenderer: (params) => {
                return <span className={classNames('cell_text')}>{params?.value ? params?.value : '---'}</span>
            }
        },
        {
            field: "mtt_current_contract.contract_duration_type",
            headerName: 'Срок текущего контракта',
            cellRenderer: (params) => {

                return <span
                    className={classNames('cell_text')}>{params?.value === 'number' ? params?.data?.mtt_current_contract?.end_contract_tourney : (params?.data?.mtt_current_contract?.end_contract_date ? moment(params?.data?.mtt_current_contract?.end_contract_date)?.format('DD.MM.YYYY') : '---')}</span>
            }
        },
        {
            field: "type_btn",
            headerName: 'Контракт',
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
                // react-toastify@9.1.3
                const typeValueButton =
                    (((!params?.data?.mtt_prev_contracts || params?.data?.mtt_prev_contracts?.length === 0) && !params?.data?.mtt_current_contract) && 1) ||
                    ((params?.data?.mtt_current_contract) && 2) ||
                    (((params?.data?.mtt_prev_contracts && params?.data?.mtt_prev_contracts?.length !== 0) && !params?.data?.mtt_current_contract) && 3)
                // Данные с бека всей строки
                const data = params?.data

                return <span onClick={() => setModalData({...data, btn_type: typeBtn[typeValueButton]})}
                             className={classNames('cell_text', 'cell_text_btn')}>{typeBtn[typeValueButton]?.title || '---'}</span>
            }
        },
        {
            field: "",
            headerName: 'Сплиты и авансы',
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
                            return <span className={classNames('cell_text', 'cell_text_btn')}>Смотреть</span>
                        }
                    },
                    {
                        field: "",
                        headerName: 'Сплиты и авансы',
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

    return (
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
                rowData={data?.players || []}
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
    );
};