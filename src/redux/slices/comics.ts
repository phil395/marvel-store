import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from 'marvel-store-api';
import { IComic } from "../../models/comic";

interface IComicsState {
	showcase: {
		status: 'initial' | 'idle' | 'fetching' | 'error';
		data: IComic[];
	};
	selected: {
		status: 'initial' | 'idle' | 'fetching' | 'error';
		data?: IComic;
	};
	errorMsg?: string;
}

const initialState: IComicsState = {
	showcase: {
		status: 'initial',
		data: []
	},
	selected: {
		status: 'initial'
	}
};


const fillComicsShowcase = createAsyncThunk<IComic[], undefined, { rejectValue: string; }>(
	'comics/fillShowcaseStatus',
	async (_, { rejectWithValue }) => {

		const data = await api.comics.get(12);
		if (data.ok) {
			api.saveState('comics');
			return data.payload;
		};
		return rejectWithValue(data.msg);
	}
);

export const comicsSlice = createSlice({
	name: 'comics',
	initialState,
	reducers: {
		selectComic: (state, action: PayloadAction<number>) => {
			state.selected.status = 'idle';
			state.selected.data = state.showcase.data.find(comic => {
				return comic.id === action.payload;
			});
		},
		getComicFromHistory: {
			reducer: (state, action: PayloadAction<IComic | null>) => {
				if (action.payload) {
					state.selected.status = 'idle';
					state.selected.data = action.payload;
				} else {
					state.selected.status = 'error';
					state.errorMsg = 'Comic not found in local state';
					state.selected.data = undefined;
				}
			},
			prepare: (id: number) => {
				const result = api.comics.getFromHistoryById(id);
				if (result.ok === false) return { payload: null };

				const [comic] = result.payload;
				return { payload: comic };
			}
		},
		resetComicsErrorIn: (state, action: PayloadAction<'showcase' | 'selected'>) => {
			state[action.payload].status = 'idle';
			state.errorMsg = undefined;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fillComicsShowcase.pending, (state) => {
				state.showcase.status = 'fetching';
			})
			.addCase(fillComicsShowcase.fulfilled, (state, action) => {
				state.showcase.status = 'idle';
				state.showcase.data.push(...action.payload);
			})
			.addCase(fillComicsShowcase.rejected, (state, action) => {
				state.showcase.status = 'error';
				state.errorMsg = action.payload;
			});
	}
});

export { fillComicsShowcase };

export const { selectComic, getComicFromHistory, resetComicsErrorIn } = comicsSlice.actions;

export default comicsSlice.reducer;