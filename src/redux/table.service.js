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
    })
})

export const {
    useGetTableDataQuery,
    useCreateContractMutation,
    useCloseContractMutation,
    useEditContractMutation,
} = tableApi