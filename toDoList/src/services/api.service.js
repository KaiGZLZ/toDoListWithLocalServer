import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../config/config'

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: apiUrl,
        prepareHeaders: (headers) => {
            return headers.set( 'Content-Type', 'application/json' )
        }
    }),
    endpoints: () => ({}),
})

