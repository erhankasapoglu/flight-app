import { createSlice } from '@reduxjs/toolkit';

const paymentInfoSlice = createSlice({
  name: 'paymentInfo',
  initialState: {
    swalProps: {
        show: null,
        title: null,
        text: null,

    },
  },
  reducers: {
    setSwalProps: (state, action) => {
      state.swalProps = action.payload;
    }
  },
});

export const {
    setSwalProps
} = paymentInfoSlice.actions;

export default paymentInfoSlice.reducer;