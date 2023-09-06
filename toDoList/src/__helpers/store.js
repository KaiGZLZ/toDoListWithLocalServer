import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '../services/api.service'
import userReducer from "../redux/userSlice"
import alertReducer from "../redux/alertSlice"

// Or from '@reduxjs/toolkit/query/react'

export const store = configureStore({
  reducer: {

    // Add the reducers
    user: userReducer,
    alert: alertReducer,

    // Add the api reducer
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)