import {baseQueryWithReauth} from "../api/baseQuery";
import {createApi} from "@reduxjs/toolkit/query/react";

export const tableApi = createApi({
    reducerPath: 'tableApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['tableApi'],
    endpoints: (build) => ({
        getTableData: build.query({
            query: (payload) => ({
                url: `contracts/info`,
                method: 'GET',
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {

                return {
                    ...baseQueryReturnValue, players: baseQueryReturnValue?.players?.map((el) => {
                        const typeValueButton =
                            (((!el?.mtt_prev_contracts || el?.mtt_prev_contracts?.length === 0) && !el?.mtt_current_contract) && 1) ||
                            ((el?.mtt_current_contract) && 2) ||
                            (((el?.mtt_prev_contracts && el?.mtt_prev_contracts?.length !== 0) && !el?.mtt_current_contract) && 3)
                        return {...el, type_btn: typeValueButton}
                    })
                }
            }
        }),
        createContract: build.mutation({
            query: (payload) => ({
                url: `contracts/create`,
                method: 'POST',
                body: payload
            }),
        }),
        editContract: build.mutation({
            query: (payload) => ({
                url: `contracts/edit`,
                method: 'POST',
                body: payload
            }),
        }),
        closeContract: build.mutation({
            query: (payload) => ({
                url: `contracts/close`,
                method: 'POST',
                body: payload
            }),
        }),
        createSplit: build.mutation({
            query: (payload) => ({
                url: `contracts/split/create`,
                method: 'POST',
                body: payload
            }),
        }),
    })
})

export const {
    useGetTableDataQuery,
    useCreateContractMutation,
    useCreateSplitMutation,
    useCloseContractMutation,
    useEditContractMutation,
} = tableApi