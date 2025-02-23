import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types';

interface UserPreferences {
  defaultSource: string;
  guardianCategories: Category[];
  preferredGuardianCategories: string[];
  newyorkTimesCategories: Category[];
  preferredNewyorkTimesCategories: string[];
}

const initialState: UserPreferences = {
  defaultSource: 'guardian',
  guardianCategories: [],
  preferredGuardianCategories: [],
  newyorkTimesCategories: [],
  preferredNewyorkTimesCategories: [],
};

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setGuardianCategories: (state, action: PayloadAction<Category[]>) => {
      state.guardianCategories = action.payload;
    },
    setNeyyorkTimesCategories: (state, action: PayloadAction<Category[]>) => {
      state.newyorkTimesCategories = action.payload;
    },
    setPreferred: (
      state,
      action: PayloadAction<{ source: string; selectedCategories: string[] }>,
    ) => {
      state.defaultSource = action.payload.source;

      if (action.payload.source === 'guardian') {
        state.preferredGuardianCategories = action.payload.selectedCategories;
        state.preferredNewyorkTimesCategories = [];
      } else {
        state.preferredNewyorkTimesCategories = action.payload.selectedCategories;
        state.preferredGuardianCategories = [];
      }
    },
    resetPreferences: (state) => {
      state.defaultSource = 'guardian';
      state.guardianCategories = [];
      state.preferredGuardianCategories = [];
      state.newyorkTimesCategories = [];
      state.preferredNewyorkTimesCategories = [];
    },
  },
});

export const { setPreferred, resetPreferences, setGuardianCategories, setNeyyorkTimesCategories } =
  userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
