import React from 'react';
import '../css/ShowSearchResultComponent.css';

// Helper function to format time from ISO string
const formatTime = (timeString) => {
  if (timeString === "null") return null;
  return timeString.split("T")[1].split("Z")[0];
};

const ShowSearchResultComponent = ({ flightData }) => {
  const {
    airline,
    flight_id,
    from_location,
    to_location,
    status,
    departure_gate,
    arrival_gate,
    actual_departure,
    actual_arrival,
    scheduled_departure,
    scheduled_arrival
  } = flightData;

  const departureTime = formatTime(actual_departure) || formatTime(scheduled_departure);
  const arrivalTime = formatTime(actual_arrival) || formatTime(scheduled_arrival);

  return (
    <div className='searchedFlightInfo'>
      <h1 className='checkFlightStatusHeading'>Searched Flight Status</h1>

      <div className='flightNameAndNumber'>
        <p className='name'>Airline Name: {airline}</p>
        <p className='flightNo'>Flight Number: {flight_id}</p>
      </div>

      <div className='fromToLocation'>
        <p>From: {from_location}</p>
        <p>To: {to_location}</p>
      </div>

      <div className='flightStatus'>
        <p className='status'>
          Flight Status :- {status === "Departure Gate Is Changed"
            ? `${status} to ${departure_gate}`
            : status}
        </p>
      </div>

      <hr className='horizontalLine' />

      <div className='location'>
        <div className='departureContainer'>
          <h1 className='departure'>Departure Time</h1>
          <p className='departureLocation'>{departureTime}</p>
        </div>

        <div className='departureContainer'>
          <h1 className='departure'>Departure Gate</h1>
          <p className='departureLocation'>
            {status === "Departure Gate Is Changed"
              ? `${departure_gate} (New Departure Gate)`
              : departure_gate}
          </p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Time</h1>
          <p className='arrivalLocation'>{arrivalTime}</p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Gate</h1>
          <p className='arrivalLocation'>{arrival_gate}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowSearchResultComponent;
