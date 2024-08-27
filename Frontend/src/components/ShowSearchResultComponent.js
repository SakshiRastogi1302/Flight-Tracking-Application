import React from 'react';
import '../css/ShowSearchResultComponent.css';
import { formatTime } from '../utils/helper';

const ShowSearchResultComponent = ({ flightData }) => {

  return (
    <div className='searchedFlightInfo'>
      <h1 className='checkFlightStatusHeading'>Searched Flight Status</h1>

      <div className='flightNameAndNumber'>
        <p className='name'>Airline Name: {flightData.airline}</p>
        <p className='flightNo'>Flight Number: {flightData.flight_id}</p>
      </div>

      <div className='fromToLocation'>
        <p>From: {flightData.from_location}</p>
        <p>To: {flightData.to_location}</p>
      </div>

      <div className='flightStatus'>
        <p className='status'>
          Flight Status :- {flightData.status === "Departure Gate Is Changed"
            ? `${flightData.status} to ${flightData.departure_gate}`
            : flightData.status}
        </p>
      </div>

      <hr className='horizontalLine' />

      <div className='location'>
        <div className='departureContainer'>
          <h1 className='departure'>Departure Time</h1>
          <p className='departureLocation'>{formatTime(flightData.actual_departure) || formatTime(flightData.scheduled_departure)}</p>
        </div>

        <div className='departureContainer'>
          <h1 className='departure'>Departure Gate</h1>
          <p className='departureLocation'>
            {flightData.status === "Departure Gate Is Changed"
              ? `${flightData.departure_gate} (New Departure Gate)`
              : flightData.departure_gate}
          </p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Time</h1>
          <p className='arrivalLocation'>{formatTime(flightData.actual_arrival) || formatTime(flightData.scheduled_arrival)}</p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Gate</h1>
          <p className='arrivalLocation'>{flightData.arrival_gate}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowSearchResultComponent;
