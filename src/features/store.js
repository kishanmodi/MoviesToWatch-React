import {
    configureStore,
    createImmutableStateInvariantMiddleware
} from '@reduxjs/toolkit';
import moviesReducer from './movies/movieSlice';
import userReducer from './user/userSlice';
import storageSession from 'redux-persist/lib/storage/session';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistedReducer = persistReducer(persistConfig, userReducer);
export const store = configureStore({
    reducer: { movies: moviesReducer, user: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    'user/signup',
                    'user/login'
                ],
                ignoredPaths: ['user.currentUser']
            },
            immutableCheck: {
                ignoredPaths: ['user.currentUser']
            }
        })
});

export const persistor = persistStore(store);
