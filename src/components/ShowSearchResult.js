import React from 'react'
import '../css/ShowSearchResult.css'

const ShowSearchResult = ({ flightData }) => {
  return (
    <div>
      {/* Created a container */}
      <div className='searchBox'>
        {/* Added a heading to the search box */}
        <h1 className='checkFlightStatusHeading'>Searched Flight Status</h1>
        {/* Displaying the flight name and number */}
        <div className='flightNameAndNumber'>
          <p className='name'>Airline Name :- {flightData.airlineName}</p>
          <p className='flightNo'>Flight Number :- {flightData.flightNumber}</p>
        </div>
        {/* Displaying the status of flight */}
        <div className='flightStatus'>
          <p className='status'>Flight {flightData.currentFlightStatus}</p>
        </div>
        {/* Created a horizontal line */}
        <hr className='horizontalLine'></hr>
        {/* Created a location container to display the arrival and departure location of flight */}
        <div className='location'>
          {/* Arrival Container */}
          <div>
            <h1 className='arrival'>Arrival</h1>
            <p className='arrivalLocation'>{flightData.arrivalLocation}</p>
          </div>
          {/* Departure Container */}
          <div>
            <h1 className='departure'>Departure</h1>
            <p className='departureLocation'>{flightData.departureLocation}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSearchResult