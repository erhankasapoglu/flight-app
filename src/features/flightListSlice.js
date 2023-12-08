import { createSlice } from '@reduxjs/toolkit';

const flightListSlice = createSlice({
  name: 'flightList',
  initialState: {
    isClicked: null,
  },
  reducers: {
    setNavigation: (state, action) => {
      state.isClicked = action.payload;
    }
  },
});

export const {
    setNavigation
} = flightListSlice.actions;

export default flightListSlice.reducer;
