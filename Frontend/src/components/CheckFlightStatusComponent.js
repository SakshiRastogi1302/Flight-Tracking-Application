import React, { useEffect, useState } from 'react';
import '../css/CheckFlightStatusComponent.css';
import searchIcon from '../images/search-icon.png';
import ShowSearchResultComponent from './ShowSearchResultComponent';
import { checkAllInputFieldsFilled } from '../utils/helper';
import {Link} from 'react-router-dom';

const CheckFlightStatusComponent = () => {
    const [airlineName, setAirlineName] = useState("");
    const [flightNo, setFlightNo] = useState("");
    const [date, setDate] = useState("mm/dd/yy");
    const [flightData, setFlightData] = useState(null);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [allInputFieldsFilled, setAllInputFieldsFilled] = useState(false);

    useEffect(() => {
        resetAllInputValues();
    }, []);

    const updateAirlineName = (e) => setAirlineName(e.target.value);
    const updateFlightNo = (e) => setFlightNo(e.target.value);
    const updateDate = (e) => setDate(e.target.value);
    const updateFromLocation = (e) => setFromLocation(e.target.value);
    const updateToLocation = (e) => setToLocation(e.target.value);

    const resetAllInputValues = () => {
        setAirlineName("Select An Airline");
        setFlightNo("");
        setDate("mm/dd/yy");
        setFlightData(null);
        setFromLocation("");
        setToLocation("");
        setAllInputFieldsFilled(false);
    };

    const findFlightDetails = async () => {
        const allInputFieldsSelected = checkAllInputFieldsFilled(airlineName, flightNo, date, fromLocation, toLocation);
        setAllInputFieldsFilled(allInputFieldsSelected);

        if (allInputFieldsSelected) {
            try {
                const response = await fetch(`http://localhost:8081/flight?param1=${flightNo}&param2=${date}&param3=${fromLocation}&param4=${toLocation}`);
                const filteredFlightData = await response.json();
                setFlightData(filteredFlightData[0]);

                if (filteredFlightData[0]) {
                    const emailList = JSON.parse(filteredFlightData[0].passengers_list);
                    for (const passenger in emailList) {
                        const flightInfo = {
                            email: emailList[passenger].emailId,
                            subject: getEmailSubject(filteredFlightData[0].status),
                            text: getEmailBody(filteredFlightData[0])
                        };

                        await fetch("http://localhost:8081/sendEmail", {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(flightInfo)
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching flight details:", error);
            }
        }
    };

    const getEmailSubject = (status) => {
        switch (status) {
            case "On Time":
                return "Flight On Time";
            case "Delayed":
                return "Flight Delayed";
            case "Cancelled":
                return "Flight Cancelled";
            default:
                return "Flight Departure Gate Is Changed";
        }
    };

    const getEmailBody = (flight) => {
        switch (flight.status) {
            case "On Time":
                return `Your flight ${flight.flight_id} is on time. Departure gate: ${flight.departure_gate}.`;
            case "Delayed":
                return `Your flight ${flight.flight_id} is delayed. New departure time: ${flight.actual_departure}. Departure gate: ${flight.departure_gate}.`;
            case "Cancelled":
                return `Your flight ${flight.flight_id} has been cancelled.`;
            default:
                return `Your flight ${flight.flight_id} is on time. But the departure gate is changed to ${flight.departure_gate}.`;
        }
    };

    return (
        <div className='search-flight-box'>
            <div className='flight-status-box'>
                <p className='heading'>Check Flight Status</p>
                <table>
                    <thead>
                        <tr className='table-heading'>
                            <th className='airline-name-heading'>Airline Name</th>
                            <th className='flight-no-heading'>Flight No.</th>
                            <th className='departure-date-heading'>Departure Date</th>
                            <th className='from-location-heading'>From</th>
                            <th className='to-location-heading'>To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='table-data'>
                            <td>
                                <select className='airline-name-input' onChange={updateAirlineName} value={airlineName}>
                                    <option value="Select An Airline" disabled>Select An Airline</option>
                                    <option value="Indigo">Indigo</option>
                                    <option value="Air India">Air India</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' className='flight-no-input' onChange={updateFlightNo} value={flightNo} />
                            </td>
                            <td>
                                <input type="date" className='date-input' onChange={updateDate} value={date} />
                            </td>
                            <td>
                                <input type='text' className='from-location-input' onChange={updateFromLocation} value={fromLocation} />
                            </td>
                            <td>
                                <input type='text' className='to-location-input' onChange={updateToLocation} value={toLocation} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='buttons'>
                    <button className='search-flight-btn' onClick={findFlightDetails}>
                        <img src={searchIcon} alt='Search' className='search-icon' /> Show Flight Status
                    </button>
                    <button className='reset-btn' onClick={resetAllInputValues}>Reset</button>
                    <Link to="/"><button className='back-btn'>Back</button></Link>
                </div>
            </div>
            {flightData ? (
                <div className='search-result-box'>
                    <ShowSearchResultComponent flightData={flightData} />
                </div>
            ) : allInputFieldsFilled === "true" ? (
                <div className='no-flight'>
                    <h1>We couldn't find any flights with the specified information.</h1>
                </div>
            ) : <div className='no-flight'>
                <h1>Complete all the input fields to retrieve the flight status.</h1>
            </div>}
        </div>
    );
};

export default CheckFlightStatusComponent;
