import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/flightList.scss';
import { currencyIcon, calculateABSTime } from '../utils/helpers';
import { useDispatch,useSelector } from 'react-redux';

import ProgressTimeline from '../components/progressTimeline';
import TopMenu from '../components/topMenu';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import '../styles/tabs.scss'
import '../styles/paymentInfo.scss'
import { setSwalProps } from '../features/paymentInfoSlice';
import SweetAlert2 from 'react-sweetalert2';
const PaymentInfo = () => {

    const { state } = useLocation();
    const dispatch = useDispatch();
    const paymentInfo = useSelector((state) => state.paymentInfo);
    // const navigate = useNavigate();

    const handleSelectedFlight = () => {
        dispatch(setSwalProps({
            icon: "success",
            show: true,
            title: 'Satın alma başarılı!',
            text: 'PNR NO: 123123123',
        }));
    }
    return (
        <React.Fragment>
            <TopMenu />
            <ProgressTimeline progress="3"></ProgressTimeline>
            <div className="main-container">
                <h2 className="pretty">Ödeme Bilgileri</h2>
                <hr className="pretty" />
                <div className='payment-wrapper'>
                    <Tabs className="Tabs">
                        <TabList>
                            <Tab>Kredi Kartı</Tab>
                            <Tab>Havale</Tab>
                            <Tab>Papara</Tab>
                        </TabList>
                        <TabPanel>
                            <div className="cc-container">
                                <div>
                                    <input
                                        className="pretty"
                                        type="text"
                                        onChange={(e) => null}
                                        placeholder="İsim Soyisim"
                                    />
                                    <input
                                        className="pretty"
                                        type="text"
                                        onChange={(e) => null}
                                        placeholder="Kart Numarası"
                                    />
                                </div>
                                <div>
                                    <input
                                        className="pretty"
                                        type="text"
                                        onChange={(e) => null}
                                        placeholder="Ay"
                                    />
                                    <input
                                        className="pretty"
                                        type="text"
                                        onChange={(e) => null}
                                        placeholder="Yıl"
                                    />
                                    <input
                                        className="pretty"
                                        type="text"
                                        onChange={(e) => null}
                                        placeholder="CVV"
                                    />
                                </div>
                            </div>
                            <h2 className="pretty">Taksit Seçenekleri</h2>
                            <hr className="pretty" />
                            <div className="radio-area flex-area gap10">
                                <label>
                                    <input
                                        type="radio"
                                        name="payment-select"
                                        value="1"
                                        onChange={(e) => null}

                                    />
                                    Tek Çekim
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="payment-select"
                                        value="2"
                                        onChange={(e) => null}
                                    />
                                    3 ay
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="payment-select"
                                        value="2"
                                        onChange={(e) => null}
                                    />
                                    6 ay
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="payment-select"
                                        value="2"
                                        onChange={(e) => null}
                                    />
                                    9 ay
                                </label>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <p>Merhaba ödemeyi yapabilmeniz için aşağıda paylaşılan iban adresine havale geçmeniz gerekmektedir.</p>
                            <div className='iban'>
                            <p>TR060006237133844698377473</p>
                            <p>Erhan Kasapoğlu</p>
                            <p>Akbank</p>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <p>Merhaba ödemeyi yapabilmeniz için aşağıda paylaşılan papara adresine havale geçmeniz gerekmektedir.</p>
                            <div className='iban'>
                            <p>TR060006237133844698377473</p>
                            <p>Erhan Kasapoğlu</p>
                            <p>Papara</p>
                            </div>
                        </TabPanel>
                    </Tabs>
                    <div className="order-total">

                        <div className="payment-info">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={(e) => null}
                                />
                                Koşulları okudum kabul ediyorum.
                            </label>
                            <span className="payment-info-header">Toplam Tutar</span>
                            <span className="payment-info-text">{state.totalAmount}</span>
                        </div>
                    </div>

            <SweetAlert2
                didClose={() => {
                    dispatch(setSwalProps({
                        show: false
                    }));
                }} 
                {...paymentInfo.swalProps}
                />
                    <button style={{marginTop:'30px'}} className="pretty" type="button" onClick={handleSelectedFlight}>Satın Al</button>
                    
                </div>

            </div>
        </React.Fragment >
    );
};

export default PaymentInfo;
