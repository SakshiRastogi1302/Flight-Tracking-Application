import React from 'react'
import '../css/ShowSearchResultComponent.css'

const ShowSearchResultComponent = ({ flightData }) => {
  const departureTime = flightData.actual_departure === "null" ? flightData.scheduled_departure.split("T")[1].split("Z")[0] : flightData.actual_departure.split("T")[1].split("Z")[0];
  const arrivalTime = flightData.actual_arrival === "null" ? flightData.scheduled_arrival.split("T")[1].split("Z")[0] : flightData.actual_arrival.split("T")[1].split("Z")[0];

  return (
    <div>
      {/* Created a container */}
      <div className='searchedFlightInfo'>
        {/* Added a heading to the search box */}
        <h1 className='checkFlightStatusHeading'>Searched Flight Status</h1>
        {/* Displaying the flight name and number */}
        <div className='flightNameAndNumber'>
          <p className='name'>Airline Name :- {flightData.airline}</p>
          <p className='flightNo'>Flight Number :- {flightData.flight_id}</p>
        </div>
        {/* Displaying the status of flight */}
        <div className='flightStatus'>
          <p className='status'>Flight Status :- {flightData.status === "Departure Gate Is Changed" ? flightData.status + " from " + flightData.departure_gate + " to " + flightData.changed_departure_gate : flightData.status === "Arrival Gate Is Changed" ? flightData.status + " from " + flightData.arrival_gate + " to " + flightData.changed_arrival_gate : flightData.status}</p>
        </div>
        {/* Created a horizontal line */}
        <hr className='horizontalLine'></hr>
        {/* Created a location container to display the arrival and departure location of flight */}
        <div className='location'>
          {/* Departure Container */}
          <div>
            <h1 className='departure'>Departure Time</h1>
            <p className='departureLocation'>{departureTime}</p>
          </div>
          <div>
            <h1 className='departure'>Departure Gate</h1>
            <p className='departureLocation'>{flightData.status === "Departure Gate Is Changed" ? flightData.changed_departure_gate + " (New Departure Gate)" : flightData.departure_gate}</p>
          </div>

          {/* Arrival Container */}
          <div>
            <h1 className='arrival'>Arrival Time</h1>
            <p className='arrivalLocation'>{arrivalTime}</p>
          </div>
          <div>
            <h1 className='arrival'>Arrival Gate</h1>
            <p className='arrivalLocation'>{flightData.status === "Arrival Gate Is Changed" ? flightData.changed_arrival_gate + " (New Arrival Gate)" : flightData.arrival_gate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSearchResultComponent