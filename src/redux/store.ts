import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
} from 'redux-persist';
import storages from "redux-persist/lib/storage"; // defaults to localStorage for web
import cartReducer from "@/redux/features/cartSlice";
import authReducer from "@/redux/features/authSlice";

interface Storage {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
}

const createNoopStorage = (): Storage => {
    return {
        getItem(_key: string): Promise<string | null> {
            return Promise.resolve(null);
        },
        setItem(_key: string, _value: string): Promise<void> {
            return Promise.resolve();
        },
        removeItem(_key: string): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? storages : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'cart'],
    blacklist: ['auth', 'cart']
};

// Combine reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);

// Clear previous persisted state (optional, for development)
persistor.purge();
