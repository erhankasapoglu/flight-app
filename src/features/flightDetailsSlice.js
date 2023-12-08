import { createSlice } from '@reduxjs/toolkit';

const flightDetailsSlice = createSlice({
    name: 'flightDetails',
    initialState: {
        passengers: {},
        contactEmail:null,
        contactPhone:null,
        contactIsContactable:null,
        invoiceType:null,
        invoiceName:null,
        invoiceSurname:null,
        invoiceIdentity:null,
        invoiceIsNotTCIdentity:null,
        isInsuranceSelected:null
    },
    reducers: {
        setPassengers: (state, action) => {
            const { index, field, value } = action.payload;
            if(state.passengers[index] == null) state.passengers[index] = {};
            state.passengers[index][field] = value;
        },
        setContactEmail: (state, action) => {
            state.contactEmail = action.payload;
        },
        setContactPhone: (state, action) => {
            state.contactPhone = action.payload;
        },
        setContactisContactable: (state, action) => {
            state.contactIsContactable = action.payload;
        },
        setInvoiceType: (state, action) => {
            state.invoiceType = action.payload;
        },
        setInvoiceName: (state, action) => {
            state.invoiceName = action.payload;
        },
        setInvoiceSurname: (state, action) => {
            state.invoiceSurname = action.payload;
        },
        setInvoiceIdentity: (state, action) => {
            state.invoiceIdentity = action.payload;
        },
        setInvoiceIsNotTCIdentity: (state, action) => {
            state.invoiceIsNotTCIdentity = action.payload;
        },
        setInsuranceIsSelected: (state, action) => {
            state.isInsuranceSelected = action.payload;
        },
    },
});

export const {
    setPassengers,
    setContactEmail,
    setContactPhone,
    setContactisContactable,
    setInvoiceName,
    setInvoiceSurname,
    setInvoiceIdentity,
    setInvoiceIsNotTCIdentity,
    setInvoiceType,
    setInsuranceIsSelected
} = flightDetailsSlice.actions;
export default flightDetailsSlice.reducer;