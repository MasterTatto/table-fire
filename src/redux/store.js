import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {tableApi} from "./table.service";


export const storeRedux = configureStore({
    reducer: {
        [tableApi.reducerPath]: tableApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            tableApi.middleware,
        ),
})

setupListeners(storeRedux.dispatch)