/* global browser */

import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
  'popup/signIn',
  async () => {
    const result = await browser.storage.sync.get('token');
    if (result.token) {
      return true;
    }
    return false;
  }
);

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    showSignIn: true,
    showProposal: false,
    showSuccess: false,
    showSignInSuccess: false,
    assetDashboardLink: '',
  },
  reducers: {
    notifyAssetSaveSuccess: (state) => {
      state.showSuccess = true;
      state.showProposal = false;
    },
    notifySignInSuccess: (state) => {
      state.showSignIn = false;
      state.showSignInSuccess = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        if (action.payload) {
          state.showSignIn = false;
          state.showProposal = true;
        }
      });
  },
});

export const {
  setAssetDashboardLink,
  notifyAssetSaveSuccess,
  notifySignInSuccess,
} = popupSlice.actions;
export default popupSlice.reducer;
