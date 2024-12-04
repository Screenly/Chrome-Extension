import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    showSignIn: true,
    showProposal: false,
    showSuccess: false,
    assetDashboardLink: '',
  },
  reducers: {
    setShowSignIn: (state, action) => {
      state.showSignIn = action.payload;
    },
    setShowProposal: (state, action) => {
      state.showProposal = action.payload;
    },
    setShowSuccess: (state, action) => {
      state.showSuccess = action.payload;
    },
  },
});

export const {
  setShowSignIn,
  setShowProposal,
  setShowSuccess,
  setAssetDashboardLink,
} = popupSlice.actions;
export default popupSlice.reducer;
