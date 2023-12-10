import { createSlice } from '@reduxjs/toolkit';

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState: {
    adultCount: 1,
    startDate: new Date().toLocaleDateString('en-US'),
    endDate: new Date().toLocaleDateString('en-US'),
    selectedArrPort: null,
    selectedDepPort: null,
  },
  reducers: {
    setAdultCount: (state, action) => {
      state.adultCount = Math.max(0, state.adultCount + action.payload);
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setArrSelectedPort: (state, action) => {
      state.selectedArrPort = action.payload;
    },
    setDepSelectedPort: (state, action) => {
      state.selectedDepPort = action.payload;
    },

  },
});

export const {
  setAdultCount,
  setStartDate,
  setEndDate,
  setArrSelectedPort,
  setDepSelectedPort,
} = flightSearchSlice.actions;

export default flightSearchSlice.reducer;
