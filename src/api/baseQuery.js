import {fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const BASE_URL = 'http://185.35.222.253:3000/api/lk/pci/'


const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, {getState, endpoint}) => {
        return headers
    },
})

export const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    return result
}