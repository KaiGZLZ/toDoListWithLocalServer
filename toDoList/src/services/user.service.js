import { api } from './api.service'

export const userService = api.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.query({
            query(user) {
                return {
                    url: `user/register`,
                    method: 'POST',
                    body: JSON.stringify({user}), 
                }
            },
        }),
    }),
})

export const { 
    useRegisterUserQuery, 
    useLazyRegisterUserQuery,

} = userService;





/*import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrl } from '../config/config'


// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
    endpoints: (builder) => ({
        registerUser: builder.query({
            
            query(user) {
                return {
                url: `user/register`,
                method: 'POST',
                body: JSON.stringify({user}), 
                }

                method: 'POST', 
                body: JSON.stringify({user}), 
                headers:{
                'Content-Type': 'application/json'
                }
            },
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi*/