import { configureStore } from '@reduxjs/toolkit';
import flightSearchReducer from './features/flightSearchSlice';
import flightDetailsReducer from './features/flightDetailsSlice';
import paymentInfoReducer from './features/paymentInfoSlice';

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    flightDetails: flightDetailsReducer,
    paymentInfo: paymentInfoReducer
  },
});
