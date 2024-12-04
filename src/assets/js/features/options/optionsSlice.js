/* global browser */

import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async () => {
    const result = await browser.storage.sync.get('token');
    if (result.token) {
      return true;
    }
    return false;
  }
);

const optionsSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: false,
  },
  reducers: {
    signOut: (state) => {
      state.signedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.signedIn = true;
        }
      });
  },
});

export const { signOut } = optionsSlice.actions;
export default optionsSlice.reducer;
