import React, { useEffect, useState } from 'react'
import '../css/CheckFlightStatusComponent.css'
import searchIcon from '../images/search-icon.png'
import ShowSearchResult from './ShowSearchResult';
import { allInputFieldsSelected } from '../utils/helper';

const CheckFlightStatusComponent = () => {
    const [airlineName, setAirlineName] = useState("");
    const [flightNo, setFlightNo] = useState("");
    const [date, setDate] = useState("mm/dd/yy");
    const [flightData, setFlightData] = useState(null);

    useEffect(() => {
        resetAllInputValues();
    }, []);

    /**
     * This function is used to update the value of airlineName state variable upon changing the input field value
     * @param {*} e 
     */
    const updateAirLineName = (e) => {
        setAirlineName(e.target.value);
    }

    /**
     * This function is used to update the value of flight number state variable upon changing the input field value
     * @param {*} e 
     */
    const updateFlightNo = (e) => {
        setFlightNo(e.target.value);
    }
    
    /**
     * This function is used to update the value of date state variable upon changing the input field value.
     * @param {*} e 
     */
    const updateDate = (e) => {
        setDate(e.target.value);
    }

    /**
     *  Set the value of all input field to default value
     */
    const resetAllInputValues = () => {
        setAirlineName("Select An Airline")
        setFlightNo("");
        setDate("mm/dd/yy");
        setFlightData(null);
    }

    /**
     * This function set the flight data if and only if all the input fields are selected.
     */
    const findFlightDetails = () => {
        const receivedAllInput = allInputFieldsSelected(airlineName, flightNo, date);
        receivedAllInput === "success" ? setFlightData({
            "airlineName": airlineName,
            "flightNumber": flightNo,
            "currentFlightStatus": "Delayed",
            "arrivalLocation":"New Delhi",
            "departureLocation":"Banglore",

        }) : setFlightData(null);
    }

    return (
        // Created a search flight box container
        <div className='searchFlightBox'>
            {/* Created a box to check the status of flight by providing necessary details */}
            <div className='flightStatusBox'>
                {/* Added a heading */}
                <p className='heading'>Check Flight Status</p>
                {/* Added a table with heading and corresponding heading data */}
                <table>
                    {/* Added headings in table */}
                    <thead>
                        <tr className='tableHeading'>
                            <th className='airlineNameHeading'>Airline Name</th>
                            <th className='flightNoHeading'>Flight No. (e.g. 345)</th>
                            <th className='selectDateHeading'>Departure Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Added input fields for each heading.*/}
                        <tr className='tableData'>
                            <td>
                                <select className='airlineNamesInput' onChange={updateAirLineName} value={airlineName}>
                                    <option value="Select An Airline" disabled={true}>Select An Airline</option>
                                    <option value="Indigo">Indigo</option>
                                    <option value="Air India">Air India</option>
                                    <option value="SpiceJet">SpiceJet</option>
                                    <option value="Vistara">Vistara</option>
                                </select>
                            </td>
                            <td>
                                <input type='text' className='flightNoInput' onChange={updateFlightNo} value={flightNo}></input>
                            </td>
                            <td>
                                <input type="date" className='dateInput' onChange={updateDate} value={date}></input>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* Created a container for buttons.*/}
                <div className='btns'>
                    {/* Created a search button to find the status of the flight based upon the input.*/}
                    <button className='searchFlightBtn' onClick={findFlightDetails}><img src={searchIcon} alt='Search' className='searchIcon' ></img>Search</button>
                    {/* Created a reset button that set the input field value with default value.*/}
                    <button className='resetBtn' onClick={resetAllInputValues}>Reset</button>
                </div>
            </div>
            {/* If flight data exists for selected input field showcase the flight information.*/}
            {flightData ? (
                <div className='searchResultBox'>
                    <ShowSearchResult flightData={flightData} />
                </div>) : null}
        </div>
    )
}

export default CheckFlightStatusComponent