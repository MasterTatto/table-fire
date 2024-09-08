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
import {mock} from "./mock";
import moment from "moment";
import ModalTable from "./modal";

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MasterDetailModule,
    MenuModule,
]);

export const GridExample = () => {
    const [modalData, setModalData] = useState(null)

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
                return <span className={classNames('cell_text')}>{moment(params?.value)?.format('DD.MM.YYYY')}</span>
            }
        },
        {
            field: "mtt_current_contract.type",
            headerName: 'Тип контракта',
            cellClass: 'cell_text',
        },
        {
            field: "mtt_current_contract.date_current_contract",
            headerName: 'Срок текущего контракта',
            cellRenderer: (params) => {
                return <span
                    className={classNames('cell_text')}>{moment(params?.value)?.format('DD.MM.YYYY HH:mm')}</span>
            }
        },
        {
            field: "type_btn",
            headerName: 'Контракт',
            cellRenderer: (params) => {

                // Данные с бека всей строки
                const data = params?.data

                return <span onClick={() => setModalData(data)}
                             className={classNames('cell_text', 'cell_text_btn')}>{params?.value}</span>
            }
        },
        {
            field: "",
            headerName: 'Сплиты и авансы',
            cellRenderer: (params) => {
                return <span className={classNames('cell_text', 'cell_text_btn')}>Перейти</span>
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
                        field: "status",
                        headerName: 'Статус',
                        cellClass: 'cell_text',
                    },
                    {
                        minWidth: 150,
                        field: "date_join_mtt",
                        headerName: 'Дата прихода в команду',
                        cellRenderer: (params) => {
                            return <span
                                className={classNames('cell_text')}>{moment(params?.value)?.format('DD.MM.YYYY')}</span>
                        }
                    },
                    {
                        minWidth: 150,
                        field: "type",
                        headerName: 'Тип контракта',
                        cellClass: 'cell_text',
                    },
                    {
                        minWidth: 150,
                        field: "date_current_contract",
                        headerName: 'Срок текущего контракта',
                        cellRenderer: (params) => {
                            return <span
                                className={classNames('cell_text')}>{moment(params?.value)?.format('DD.MM.YYYY HH:mm')}</span>
                        }
                    },
                    {
                        minWidth: 150,
                        field: "comment",
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
                ],
                defaultColDef: {
                    flex: 1,
                    suppressMenu: true,
                },

            },
            getDetailRowData: function (params) {
                params.successCallback(params.data?.mtt_prev_contracts);
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
            {Boolean(modalData) && <ModalTable open={modalData} handleClose={() => setModalData(null)}/>}
            <AgGridReact
                rowData={mock}
                masterDetail={true}
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