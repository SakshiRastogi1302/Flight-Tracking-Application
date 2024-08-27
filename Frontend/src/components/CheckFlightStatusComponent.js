import React, { useEffect, useState, useRef } from 'react';
import '../css/CheckFlightStatusComponent.css';
import searchIcon from '../images/search-icon.png';
import ShowSearchResultComponent from './ShowSearchResultComponent';
import { checkAllInputFieldsFilled, sendEmail } from '../utils/helper';
import { Link } from 'react-router-dom';

const CheckFlightStatusComponent = () => {
    const [airlineName, setAirlineName] = useState("");
    const [flightNo, setFlightNo] = useState("");
    const [date, setDate] = useState("mm/dd/yy");
    const [flightData, setFlightData] = useState(null);
    const [fromLocation, setFromLocation] = useState("");
    const [toLocation, setToLocation] = useState("");
    const [allInputFieldsFilled, setAllInputFieldsFilled] = useState(false);

    const flightInfoRef = useRef(flightData); // Use ref to keep track of the latest flight information
    const emailScheduledRef = useRef(false); // Flag to prevent multiple emails

    useEffect(() => {
        // Update the ref when the flightInformation state changes
        flightInfoRef.current = flightData;
    }, [flightData]);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8081');
        ws.onmessage = (event) => {
            const notifications = JSON.parse(event.data);
            notifications.forEach(notification => {
                // Update flight information state
                setFlightData(notification);
            });

            // Schedule sending email only once after processing all notifications
            if (!emailScheduledRef.current) {
                emailScheduledRef.current = true;
                setTimeout(() => {
                    if (flightInfoRef.current) {
                        console.log("EMAIL SENTT");
                        sendEmail(flightInfoRef.current);
                    }
                    // Reset for the next batch of notifications
                    emailScheduledRef.current = false;
                }, 1000); // Adjust timeout as needed
                console.log("EMAILL WILL BE SENTT");

            }
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, []);

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
            } catch (error) {
                console.error("Error fetching flight details:", error);
            }
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
            <div>
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
        </div>
    );
};

export default CheckFlightStatusComponent;
