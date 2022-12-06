import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from 'marvel-store-api';
import { ICharacter } from '../../models/character';
import { RootState } from '../store';

interface ICharactersState {
	random: {
		status: 'initial' | 'idle' | 'fetching' | 'error';
		data?: ICharacter;
	};
	showcase: {
		status: 'initial' | 'idle' | 'fetching' | 'error';
		data: ICharacter[];
	};
	search: {
		status: 'initial' | 'idle' | 'fetching' | 'error';
		data: ICharacter[];
	};
	selected?: ICharacter;
	errorMsg?: string;
}

const fillCharactersShowcase = createAsyncThunk<ICharacter[], undefined, { rejectValue: string; }>(
	'characters/fillShowcaseStatus',
	async (_, { rejectWithValue }) => {

		const data = await api.characters.get(12);
		if (data.ok) {
			api.saveState('characters');
			return data.payload;
		};
		return rejectWithValue(data.msg);
	}
);

const getRandomCharacter = createAsyncThunk<ICharacter, undefined, { rejectValue: string; state: RootState; }>(
	'characters/getRandomStatus',
	async (_, { rejectWithValue }) => {

		const data = await api.characters.getRandomCharacter();

		if (data.ok) {
			api.saveState('characters');
			return data.payload[0];
		};
		return rejectWithValue(data.msg);
	}
);

const getCharacterByName = createAsyncThunk<ICharacter[], string, { rejectValue: string; state: RootState; }>(
	'characters/getByNameStatus',
	async (name, { rejectWithValue }) => {

		const data = await api.characters.getByName(name);

		if (data.ok) return data.payload;
		return rejectWithValue(data.msg);
	}
);

const initialState: ICharactersState = {
	random: {
		status: 'initial',
	},
	showcase: {
		status: 'initial',
		data: []
	},
	search: {
		status: 'initial',
		data: []
	}
};

export const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		selectCharacter: (state, action: PayloadAction<number>) => {
			const fromShowcase = state.showcase.data.find(character => {
				return character.id === action.payload;
			});
			const fromSearch = state.search.data.find(character => {
				return character.id === action.payload;
			});

			state.selected = fromShowcase || fromSearch;
		},
		removeSelectedCharacter: (state) => {
			state.selected = undefined;
		},
		resetCharactersErrorIn: (state, action: PayloadAction<'random' | 'showcase' | 'search'>) => {
			state[action.payload].status = 'idle';
			state.errorMsg = undefined;
		}
	},
	extraReducers: builder => {
		builder
			.addCase(fillCharactersShowcase.pending, (state) => {
				state.showcase.status = 'fetching';
			})
			.addCase(fillCharactersShowcase.fulfilled, (state, action) => {
				state.showcase.status = 'idle';
				state.showcase.data.push(...action.payload);
			})
			.addCase(fillCharactersShowcase.rejected, (state, action) => {
				state.showcase.status = 'error';
				state.errorMsg = action.payload;
			})
			.addCase(getRandomCharacter.pending, (state) => {
				state.random.status = 'fetching';
			})
			.addCase(getRandomCharacter.fulfilled, (state, action) => {
				state.random.status = 'idle';
				state.random.data = action.payload;
			})
			.addCase(getRandomCharacter.rejected, (state, action) => {
				state.random.status = 'error';
				state.errorMsg = action.payload;
			})
			.addCase(getCharacterByName.pending, (state) => {
				state.search.status = 'fetching';
				state.search.data = [];
			})
			.addCase(getCharacterByName.fulfilled, (state, action) => {
				state.search.status = 'idle';
				state.search.data = action.payload;
			})
			.addCase(getCharacterByName.rejected, (state, action) => {
				state.search.status = 'error';
				state.errorMsg = action.payload;
			});

	}
});






export { fillCharactersShowcase, getRandomCharacter, getCharacterByName };

export const { selectCharacter, removeSelectedCharacter, resetCharactersErrorIn } = charactersSlice.actions;

export default charactersSlice.reducer;

