import { configureStore } from '@reduxjs/toolkit';

import popupReducer from '@/features/popup/popupSlice';

export const store = configureStore({
  reducer: {
    popup: popupReducer,
  },
});
