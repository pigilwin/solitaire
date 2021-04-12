import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development'
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;