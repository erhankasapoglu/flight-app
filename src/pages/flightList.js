import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/flightList.scss';
import { currencyIcon, calculateABSTime } from '../utils/helpers';
import { useDispatch } from 'react-redux';
import ProgressTimeline from '../components/progressTimeline';
import TopMenu from '../components/topMenu';
const FlightList = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const handleSelectedFlight = (flight,adultCount) => {
    navigate('/flight-details', { state: { flight: flight, adultCount: adultCount } });
  }
  return (
    <React.Fragment>
    <TopMenu/>
    <ProgressTimeline progress="1"></ProgressTimeline>
    <div className="flight-list main-container">
      <h2 className="pretty">Uçuş Listesi</h2>
      <hr className="pretty"/>
      {state.flights.map((flight, index) => (
        <div key={index} className="ticket">
          <div className="flight-info">
            <div className="info-item">
              <span>{flight.airlineCode}</span>
            </div>
            <div className="info-item">
              <span>{flight.airline}</span>
              <span>{flight.flightNo}</span>
            </div>
            <div className="info-item">
              <div>{flight.depPort}</div>
              <div>{flight.depTime}</div>
            </div> 
            <div className="info-item">
              <span>{calculateABSTime(flight.depTime, flight.arrTime)}</span>
            </div>
            <div className="info-item">
              <div>{flight.arrPort}</div>
              <div>{flight.arrTime}</div>
            </div>
            <div className="info-item">
              <div className="item-price">{flight.priceDetail.basePrice.amount.toFixed(2)} {currencyIcon(flight.priceDetail.basePrice.currency)}</div>
              <div className='buy-now' onClick={()=>{handleSelectedFlight(flight,state.adultCount)}}>Seç</div>
              <div className="mini-info">
                {state.adultCount} kişi için {(flight.priceDetail.basePrice.amount * state.adultCount).toFixed(2)} {currencyIcon(flight.priceDetail.basePrice.currency)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </React.Fragment>
  );
};

export default FlightList;
