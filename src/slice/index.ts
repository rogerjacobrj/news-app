import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';

interface Preference {
  categories: Category[];
  preferredCategories: Category[];
}

interface UserPreferences {
  defaultSource: string;
  guardianPreference?: Preference | null;
  newyorkTimesPreference?: Preference | null;
}

const initialState: UserPreferences = {
  defaultSource: 'guardian',
  guardianPreference: null,
  newyorkTimesPreference: null,
};

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setDefaultSource: (state, action: PayloadAction<string>) => {
      state.defaultSource = action.payload;
    },
  },
});

export const { setDefaultSource } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
