import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';

interface UserPreferences {
  defaultSource: string;
  guardianCategories: Category[];
  preferredGuardianCategories: Category[];
  newyorkTimesCategories: Category[];
}

const initialState: UserPreferences = {
  defaultSource: 'guardian',
  guardianCategories: [],
  preferredGuardianCategories: [],
  newyorkTimesCategories: [],
};

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setDefaultSource: (state, action: PayloadAction<string>) => {
      state.defaultSource = action.payload;
    },
    setGuardianCategories: (state, action: PayloadAction<Category[]>) => {
      state.guardianCategories = action.payload;
    },
    setNeyyorkTimesCategories: (state, action: PayloadAction<Category[]>) => {
      state.newyorkTimesCategories = action.payload;
    },
  },
});

export const { setDefaultSource, setGuardianCategories, setNeyyorkTimesCategories } =
  userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
