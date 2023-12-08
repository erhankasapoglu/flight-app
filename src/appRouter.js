import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import FlightSearch from './pages/flightSearch';
import FlightList from './pages/flightList';
import FlightDetails from './pages/flightDetails';
import './styles/app.scss';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route>
        <Route path='/' element={<FlightSearch/>} />
        <Route path='/flights' element={<FlightList/>} />
        <Route path='/flight-details' element={<FlightDetails/>} />
      </Route>
    </Routes>
    </Router>
  );
};

export default App;
