import { configureStore } from "@reduxjs/toolkit";
import {  FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { baseApi } from "./api/baseApi";

import authReducer from './features/auth/authslice'

const AuthPersisConfig = {
    key: 'auth',
    storage,
}

const persistedReducer = persistReducer(AuthPersisConfig, authReducer)

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(baseApi.middleware),
})


export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export const persistor = persistStore(store)