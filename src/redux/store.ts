import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { combineReducers } from 'redux'
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';
//import storage from 'redux-persist/es/storage';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');

const authPersistConfig = {
    key: 'auth',
    version: 1,
    storage,
};

const cartPersistConfig = {
    key: 'cart',
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    authCredentials: persistReducer(authPersistConfig, authReducer),
    cartCredentials: persistReducer(cartPersistConfig, cartReducer),
});
// const rootReducer = combineReducers({
//     authCredentials: authReducer,
//     cartCredentials: cartReducer,
// });

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
