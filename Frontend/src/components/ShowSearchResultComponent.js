import React, { useEffect, useRef, useState } from 'react';
import '../css/ShowSearchResultComponent.css';
import { formatTime, sendEmail } from '../utils/helper';

const ShowSearchResultComponent = ({ flightData }) => {
  const [flightInformation, setFlightInformation] = useState(flightData);
  const flightInfoRef = useRef(flightData); // Use ref to keep track of the latest flight information
  const emailScheduledRef = useRef(false); // Flag to prevent multiple emails

  useEffect(() => {
    // Update the ref when the flightInformation state changes
    flightInfoRef.current = flightInformation;
  }, [flightInformation]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8081');

    ws.onmessage = (event) => {
      const notifications = JSON.parse(event.data);
      notifications.forEach(notification => {
        // Update flight information state
        setFlightInformation(notification);
      });

      // Schedule sending email only once after processing all notifications
      if (!emailScheduledRef.current) {
        emailScheduledRef.current = true;
        setTimeout(() => {
          if (flightInfoRef.current) {
            sendEmail(flightInfoRef.current);
          }
          // Reset for the next batch of notifications
          emailScheduledRef.current = false;
        }, 1000); // Adjust timeout as needed
      }
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className='searchedFlightInfo'>
      <h1 className='checkFlightStatusHeading'>Searched Flight Status</h1>

      <div className='flightNameAndNumber'>
        <p className='name'>Airline Name: {flightInformation.airline}</p>
        <p className='flightNo'>Flight Number: {flightInformation.flight_id}</p>
      </div>

      <div className='fromToLocation'>
        <p>From: {flightInformation.from_location}</p>
        <p>To: {flightInformation.to_location}</p>
      </div>

      <div className='flightStatus'>
        <p className='status'>
          Flight Status :- {flightInformation.status === "Departure Gate Is Changed"
            ? `${flightInformation.status} to ${flightInformation.departure_gate}`
            : flightInformation.status}
        </p>
      </div>

      <hr className='horizontalLine' />

      <div className='location'>
        <div className='departureContainer'>
          <h1 className='departure'>Departure Time</h1>
          <p className='departureLocation'>{formatTime(flightInformation.actual_departure) || formatTime(flightInformation.scheduled_departure)}</p>
        </div>

        <div className='departureContainer'>
          <h1 className='departure'>Departure Gate</h1>
          <p className='departureLocation'>
            {flightInformation.status === "Departure Gate Is Changed"
              ? `${flightInformation.departure_gate} (New Departure Gate)`
              : flightInformation.departure_gate}
          </p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Time</h1>
          <p className='arrivalLocation'>{formatTime(flightInformation.actual_arrival) || formatTime(flightInformation.scheduled_arrival)}</p>
        </div>

        <div className='arrivalContainer'>
          <h1 className='arrival'>Arrival Gate</h1>
          <p className='arrivalLocation'>{flightInformation.arrival_gate}</p>
        </div>
      </div>
    </div>
  );
}

export default ShowSearchResultComponent;
