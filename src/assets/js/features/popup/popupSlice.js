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
    assetDashboardLink: '',
  },
  reducers: {
    notifyAssetSaveSuccess: (state) => {
      state.showSuccess = true;
      state.showProposal = false;
    },
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
} = popupSlice.actions;
export default popupSlice.reducer;
