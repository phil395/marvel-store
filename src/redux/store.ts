import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import charactersReducer from './slices/characters';
import comicsReducer from './slices/comics'


export const store = configureStore({
	reducer: {
		characters: charactersReducer,
		comics: comicsReducer
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppDispatch: (...arg: any[]) => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
