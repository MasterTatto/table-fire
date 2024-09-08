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

ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    ColumnsToolPanelModule,
    MasterDetailModule,
    MenuModule,
]);

export const GridExample = () => {
    const [rowData, setRowData] = useState();
    const isRowMaster = useCallback((dataItem) => {
        return dataItem ? dataItem.callRecords.length > 0 : false;
    }, []);
    const [columnDefs, setColumnDefs] = useState([
        {
            field: "name",
            cellRenderer: "agGroupCellRenderer",
            headerName: 'Никнейм',
            cellClass: 'cell_text',
        },
        {
            field: "account",
            headerName: 'Дата прихода в команду',
            cellClass: 'cell_text',
        },
        {
            field: "calls",
            headerName: 'Тип контракта',
            cellClass: 'cell_text',
        },
        {
            field: "minutes",
            valueFormatter: "x.toLocaleString() + 'm'",
            headerName: 'Срок текущего контракта',
            cellClass: 'cell_text',
        },
        {
            field: "",
            headerName: 'Контракт',
            cellRenderer: (params) => {
                return <span className={classNames('cell_text', 'cell_text_btn')}>Добавить</span>
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
                    {field: "callId"},
                    {field: "direction"},
                    {field: "number", minWidth: 150},
                    {field: "duration", valueFormatter: "x.toLocaleString() + 's'"},
                    {field: "switchCode", minWidth: 150},
                ],
                defaultColDef: {
                    flex: 1,
                },
            },
            getDetailRowData: function (params) {
                params.successCallback(params.data.callRecords);
            },
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch(
            "https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json",
        )
            .then((resp) => resp.json())
            .then((data) => {
                setRowData(data);
            });
    }, []);

    return (
        <div
            style={{height: '600px', width: '100% '}}
            className={
                "ag-theme-quartz"
            }
        >
            <AgGridReact
                rowData={rowData}
                masterDetail={true}
                isRowMaster={isRowMaster}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                detailCellRendererParams={detailCellRendererParams}
                onGridReady={onGridReady}
                // onFirstDataRendered={onFirstDataRendered}
            />
        </div>
    );
};