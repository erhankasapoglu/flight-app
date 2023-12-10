import React from 'react';
import CustomDatePicker from '../components/customDatePicker';
import { useLocation } from 'react-router-dom';
import '../styles/flightDetails.scss';
import { setContactEmail, setContactPhone, setPassengers, setInvoiceName, setInvoiceSurname, setInvoiceIdentity, setInvoiceIsNotTCIdentity, setInvoiceType, setContactisContactable, setInsuranceIsSelected } from '../features/flightDetailsSlice';
import { useSelector, useDispatch } from 'react-redux';
import destinationData from '../data/destination.json';
import { calculateABSTime, formatLocalDate } from '../utils/helpers';
import { currencyIcon } from '../utils/helpers';
import ProgressTimeline from '../components/progressTimeline';
import TopMenu from '../components/topMenu';
const FlightDetails = () => {
    const flightDetails = useSelector((state) => state.flightDetails);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const insuranceCostPerAdult = 123;
    const handlePassengers = (index, field, value) => {
        if (field === "isnotaturkishid" && value === true) {
            dispatch(setPassengers({ index, field: "nationalid", value: "" }));
        }
        dispatch(setPassengers({ index, field, value }));
    };
    const handleContactEmail = (email) => {
        dispatch(setContactEmail(email));
    };
    const handleContactPhone = (phone) => {
        dispatch(setContactPhone(phone));
    };
    const handleContactIsContactable = (isContactable) => {
        dispatch(setContactisContactable(isContactable));
    };
    const handleInvoiceType = (invoiceType) => {
        dispatch(setInvoiceType(invoiceType));
    };
    const handleInvoiceName = (invoiceName) => {
        dispatch(setInvoiceName(invoiceName));
    };
    const handleInvoiceSurname = (invoiceSurname) => {
        dispatch(setInvoiceSurname(invoiceSurname));
    };
    const handleInvoiceIdentity = (invoiceIdentity) => {
        dispatch(setInvoiceIdentity(invoiceIdentity));
    };
    const handleInvoiceIsNotTCIdentity = (invoiceIsNotTCIdentity) => {
        if (invoiceIsNotTCIdentity) handleInvoiceIdentity("");
        dispatch(setInvoiceIsNotTCIdentity(invoiceIsNotTCIdentity));
    };
    const handleInsuranceIsSelected = (isInsuranceSelected) => {
        dispatch(setInsuranceIsSelected(isInsuranceSelected));
    };
    const searchPort = (portCode) => {
        return destinationData.ports.find(item => item.code === portCode).explanationOnly;
    };
    return (
        <React.Fragment>
            <TopMenu/>
            <ProgressTimeline progress="2"></ProgressTimeline>
            
            <div className="ticket-form main-container">
                <h2 className="pretty">Uçuş Bilgileri</h2>
                <hr className='pretty' />
                <div className="flight-date-container">
                    <span className="flight-text">{searchPort(state.flight.depPort)}</span>
                    <span className="flight-spacer">🡒</span>
                    <span className="flight-text">{searchPort(state.flight.arrPort)}</span>
                    <span className="flight-spacer">/</span>
                    <span className="flight-text">{formatLocalDate(state.flight.flightDate)}</span>

                </div>
                <div className="flight-info-container">
                    <div className="flight-airline-company">
                        {state.flight.airlineCode}
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Kuyruk No</span>
                        <span className="flight-info-text">{state.flight.flightNo}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Kalkış</span>
                        <span className="flight-info-text">{state.flight.depTime}</span>
                        <span className="flight-info-text">{state.flight.depPort}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Süre</span>
                        <span className="flight-info-text">{calculateABSTime(state.flight.depTime, state.flight.arrTime)}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Varış</span>
                        <span className="flight-info-text">{state.flight.depTime}</span>
                        <span className="flight-info-text">{state.flight.arrPort}</span>
                    </div>
                </div>
            </div>
            <div className="ticket-form main-container">
                <h2 className="pretty">Fiyat Detayı</h2>
                <hr className='pretty' />
                <div className="flight-info-container">
                    <div className="flight-info">
                        <span className="flight-info-header">Yolcu Tipi</span>
                        <span className="flight-info-text">{state.adultCount} Yetişkin</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Fiyat</span>
                        <span className="flight-info-text">{state.adultCount} x {(state.flight.priceDetail.basePrice.amount).toFixed(2)} {currencyIcon(state.flight.priceDetail.basePrice.currency)}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Vergi/Harç</span>
                        <span className="flight-info-text">{(state.flight.priceDetail.totalTax.amount * state.adultCount).toFixed(2)} {currencyIcon(state.flight.priceDetail.basePrice.currency)}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Hizmet Bedeli</span>
                        <span className="flight-info-text">{(state.flight.priceDetail.surcharge.amount * state.adultCount).toFixed(2)} {currencyIcon(state.flight.priceDetail.basePrice.currency)}</span>
                    </div>
                    <div className="flight-info">
                        <span className="flight-info-header">Toplam</span>
                        <span className="flight-info-text">
                            {(
                                state.flight.priceDetail.surcharge.amount * state.adultCount +
                                state.flight.priceDetail.totalTax.amount * state.adultCount +
                                state.flight.priceDetail.basePrice.amount * state.adultCount
                            ).toFixed(2)} {currencyIcon(state.flight.priceDetail.basePrice.currency)}</span>
                    </div>
                </div>
            </div>
            <div className="ticket-form main-container">
                <h2 className="pretty">Yolcu Bilgileri</h2>
                <hr className='pretty' />

                {Array.from({ length: state.adultCount }).map((person, index) => (
                    <React.Fragment key={index}>
                        <h3 className="pretty">{index + 1}. Yolcu</h3>
                        <div className='passenger-area'>
                            <div className="radio-area">
                                <label>
                                    <input
                                        type="radio"
                                        name={`gender-select[${index}]`}
                                        value="1"
                                        onChange={(e) => handlePassengers(index, 'gender', e.target.value)}

                                    />
                                    Erkek
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={`gender-select[${index}]`}
                                        value="2"
                                        onChange={(e) => handlePassengers(index, 'gender', e.target.value)}
                                    />
                                    Kadın
                                </label>
                            </div>
                            <div className="input-area">
                                <input
                                    className="pretty"
                                    type="text"
                                    onChange={(e) => handlePassengers(index, 'name', e.target.value)}
                                    placeholder="İsim"
                                />
                            </div>
                            <div className="input-area">
                                <input
                                    className="pretty"
                                    type="text"
                                    onChange={(e) => handlePassengers(index, 'surname', e.target.value)}
                                    placeholder="Soyisim"
                                />
                            </div>
                            <div className="input-area date-picker">
                                <CustomDatePicker
                                    placeholder="Doğum Tarihi"
                                    selected={(flightDetails.passengers[index] && flightDetails.passengers[index].birthdate) ? new Date(flightDetails.passengers[index].birthdate) : ""}
                                    onChange={(date) => handlePassengers(index, 'birthdate', date.toISOString())}
                                />
                            </div>
                            <div className="input-area">
                                <input
                                    className="pretty"
                                    type="text"
                                    value={(flightDetails.passengers[index] && flightDetails.passengers[index].nationalid) ? flightDetails.passengers[index].nationalid : ""}
                                    onChange={(e) => handlePassengers(index, 'nationalid', e.target.value)}
                                    placeholder="T.C Kimlik Numarası"
                                    disabled={(flightDetails.passengers[index] && flightDetails.passengers[index].isnotaturkishid) ? "disabled" : ""}
                                />
                            </div>
                            <div className="input-area">
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handlePassengers(index, 'isnotaturkishid', e.target.checked)}
                                    />
                                    T.C vatandaşı değilim.
                                </label>
                            </div>
                        </div>
                    </React.Fragment>
                ))}
            </div>
            <div className="ticket-form main-container">
                <h2 className="pretty">İletişim Bilgileri</h2>
                <hr className='pretty' />
                <div className="contact-area">
                    <div className="contact-col">
                        <div className="input-area">
                            <input
                                className="pretty"
                                type="text"
                                onChange={(e) => handleContactEmail(e.target.value)}
                                placeholder="E-Posta"
                            />
                        </div>
                        <div className="input-area">
                            <input
                                className="pretty"
                                type="text"
                                onChange={(e) => handleContactPhone(e.target.value)}
                                placeholder="Cep Telefonu"
                            />
                        </div>
                    </div>
                    <div className="contact-row">
                        <div className="input-area">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleContactIsContactable(e.target.checked)}
                                />
                                Fırsat ve kampanyalardan haberdar olmak istiyorum.
                            </label>
                        </div>
                    </div>

                </div>
                {/* handleContactIsContactable */}
            </div>
            <div className="ticket-form main-container">
                <h2 className="pretty">Fatura Bilgileri</h2>
                <hr className='pretty' />
                <div className="invoice-area">
                    <div className="invoice-row">
                        <div className="radio-area">
                            <label>
                                <input
                                    type="radio"
                                    name="invoiceType"
                                    value="1"
                                    onChange={(e) => handleInvoiceType(e.target.value)}
                                />
                                Şahıs
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="invoiceType"
                                    value="2"
                                    onChange={(e) => handleInvoiceType(e.target.value)}
                                />
                                Şirket
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="invoiceType"
                                    value="3"
                                    onChange={(e) => handleInvoiceType(e.target.value)}
                                />
                                Şahış Şirketi
                            </label>
                        </div>
                    </div>
                    <div className="invoice-col">
                        <div className="input-area">
                            <input
                                className="pretty"
                                type="text"
                                onChange={(e) => handleInvoiceName(e.target.value)}
                                placeholder="İsim"
                            />
                        </div>
                        <div className="input-area">
                            <input
                                className="pretty"
                                type="text"
                                onChange={(e) => handleInvoiceSurname(e.target.value)}
                                placeholder="Soyisim"
                            />
                        </div>
                        <div className="input-area">
                            <input
                                className="pretty"
                                type="text"
                                value={flightDetails.invoiceIdentity ? flightDetails.invoiceIdentity : ""}
                                onChange={(e) => handleInvoiceIdentity(e.target.value)}
                                placeholder="T.C Kimlik No"
                                disabled={flightDetails.invoiceIsNotTCIdentity ? "disabled" : ""}
                            />
                        </div>
                        <div className="input-area">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleInvoiceIsNotTCIdentity(e.target.checked)}
                                />
                                T.C vatandaşı değilim.
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ticket-form main-container">
                <h2 className="pretty">Uçak Bileti Sigortası</h2>
                <hr className='pretty' />
                <div className="flight-info-container">
                    <div className="flight-info">
                        <div className="input-area">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => handleInsuranceIsSelected(e.target.checked)}
                                />
                                Sigorta yaptırmak istiyorum.
                            </label>
                        </div>
                    </div>
                    <div className="flight-info">
                        <span align="right" className="flight-info-header" >Sigorta Toplam</span>
                        <span align="right" className="flight-info-text">{flightDetails.isInsuranceSelected ? (state.adultCount * insuranceCostPerAdult).toFixed(2) : 0} {currencyIcon(state.flight.priceDetail.basePrice.currency)}</span>
                    </div>
                </div>
                <button className="pretty" type="button" onClick={()=>console.log(flightDetails)}>Satın Al</button>
            </div>

        </React.Fragment>
    );
};

export default FlightDetails;
