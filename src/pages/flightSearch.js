
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDatePicker from '../components/customDatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/flightSearch.scss';
import destinationData from '../data/destination.json';
import searchData from '../data/search.json';
import maxSvg from '../assets/img/max.svg';
import minSvg from '../assets/img/min.svg';
import { useSelector, useDispatch } from 'react-redux';
import TopMenu from '../components/topMenu';
import {
  setAdultCount,
  setStartDate,
  setEndDate,
  setArrSelectedPort,
  setDepSelectedPort,
} from '../features/flightSearchSlice';

const FlightSearch = ({ navigation }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flightSearch = useSelector((state) => state.flightSearch);

  const handleAdultCountChange = (value) => {
    dispatch(setAdultCount(value));
  };

  const handleBuyTicket = () => {
    const flights = searchData.departureLegs.filter((leg) => {
      return (
        leg.depPort === flightSearch.selectedDepPort &&
        leg.arrPort === flightSearch.selectedArrPort &&
        Date.parse(leg.flightDate) >= new Date(flightSearch.startDate).getTime() &&
        Date.parse(leg.flightDate) <= new Date(flightSearch.endDate).getTime()
      );
    });

    navigate('/flights', { state: { flights: flights, adultCount: flightSearch.adultCount } });
  };

  const handleArrPortChange = (event) => {
    dispatch(setArrSelectedPort(event.target.value));
  };
  const handleDepPortChange = (event) => {
    dispatch(setDepSelectedPort(event.target.value));
  };

  return (
    <React.Fragment>
    <TopMenu/>
    <h1 className='pretty'>Türkiye’nin Seyahat Sitesi</h1>

    <div className="ticket-form main-container">
      <div className="search-filters">
        <div className="location">
          <label className="pretty" htmlFor="depPort">Nereden</label>
          <select className="pretty" id="depPort" onChange={handleDepPortChange} name="depPort">

            {destinationData.ports.map((port, index) => (
              <option key={port.codeOnly} value={port.codeOnly}>
                {port.explanationOnly}
              </option>
            ))}
          </select>
        </div>

        <div className="location">
          <label className="pretty" htmlFor="arrPort">Nereye</label>
          <select className="pretty" id="arrPort" onChange={handleArrPortChange} name="arrPort">
            {destinationData.ports.map((port, index) => (
              <option key={port.codeOnly} value={port.codeOnly}>
                {port.explanationOnly}
              </option>
            ))}
          </select>
        </div>

        <div className="date-picker">
          <label className="pretty">Tarih Aralığı</label>
          <CustomDatePicker selected={new Date(flightSearch.startDate)} onChange={(date) => dispatch(setStartDate(date.toISOString()))} />
        </div>

        <div className="date-picker">
          <label className="pretty">&nbsp;</label>
          <CustomDatePicker selected={new Date(flightSearch.endDate)} onChange={(date) => dispatch(setEndDate(date.toISOString()))} />
        </div>
        <div className="passenger-count">
          <label className="pretty">Yetişkin Sayısı</label>
          <div className="counter">
            <button onClick={() => handleAdultCountChange(-1)}>
              <img src={minSvg} alt="increase" />
            </button>
            <span>{flightSearch.adultCount}</span>
            <button onClick={() => handleAdultCountChange(1)}>
              <img src={maxSvg} alt="decrease" />
            </button>
          </div>
        </div>
        <div className='buy-button'>
          <button className="pretty" type="button" onClick={handleBuyTicket}>Satın Al</button>
        </div>
      </div>
    </div>
    </React.Fragment>
  );
};

export default FlightSearch;
