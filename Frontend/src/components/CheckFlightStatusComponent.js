import React, { useEffect, useState } from 'react'
import '../css/CheckFlightStatusComponent.css'
import searchIcon from '../images/search-icon.png'
import ShowSearchResultComponent from './ShowSearchResultComponent';
import { checkAllInputFieldsFilled } from '../utils/helper';

const CheckFlightStatusComponent = () => {
    const [airlineName, setAirlineName] = useState("");
    const [flightNo, setFlightNo] = useState("");
    const [date, setDate] = useState("mm/dd/yy");
    const [flightData, setFlightData] = useState(null);
    const [allInputFieldsFilled, setAllInputFieldsFilled] = useState(false);

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
        setAllInputFieldsFilled(false);
    }

    /**
     * This function set the flight data if and only if all the input fields are selected.
     */
    const findFlightDetails = async () => {
        const allInputFieldsSelected = checkAllInputFieldsFilled(airlineName, flightNo, date);
        setAllInputFieldsFilled(allInputFieldsSelected);
        if (allInputFieldsSelected) {
            const allFlightData = await (await fetch("http://localhost:8081/flight")).json();
            const matchedFlightInfo = allFlightData.filter((flightData) => {
                const departureDate = flightData.actual_departure === "null" ? flightData.scheduled_departure.split("T")[0] : flightData.actual_departure.split("T")[0];
                return flightData.airline === airlineName && flightData.flight_id === flightNo && departureDate === date;
            })
            setFlightData(matchedFlightInfo[0]);
            if(matchedFlightInfo[0] !== undefined){
                const email = JSON.parse(matchedFlightInfo[0].passengersList);
                for(let val in email){
                    const flightInfo = {
                        email: email[val]["emailId"],
                        
                        subject: matchedFlightInfo[0].status === "On Time"? "Flight On time" : matchedFlightInfo[0].status === "Delayed" ? "Flight is delayed" : matchedFlightInfo[0].status === "Cancelled" ? "Flight has been cancelled" : matchedFlightInfo[0].status === "Departure Gate Is Changed" ? "New departure gate is " +matchedFlightInfo[0].changed_departure_gate :  "New arrival gate is "+ matchedFlightInfo[0].changed_arrival_gate,

                        text: matchedFlightInfo[0].status === "On Time"? "Your flight " + matchedFlightInfo[0].flight_id +" is on time. Departure gate: " + matchedFlightInfo[0].departure_gate+"." : matchedFlightInfo[0].status === "Delayed" ? "Your flight " + matchedFlightInfo[0].flight_id +" is delayed. New departure time: "+ matchedFlightInfo[0].actual_departure +". Departure gate: "+ matchedFlightInfo[0].departure_gate+".": matchedFlightInfo[0].status === "Cancelled" ? "Your flight "+ matchedFlightInfo[0].flight_id + " has been cancelled." : matchedFlightInfo[0].status === "Departure Gate Is Changed" ? "Your flight " + matchedFlightInfo[0].flight_id +" is on time. But the departure gate is changed from "+ matchedFlightInfo[0].departure_gate +" to "+ matchedFlightInfo[0].changed_departure_gate+"." :  "Your flight " + matchedFlightInfo[0].flight_id +" is on time. But the arrival gate is changed from "+ matchedFlightInfo[0].arrival_gate +" to "+ matchedFlightInfo[0].changed_arrival_gate+"."
                    }
                    const options = {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(flightInfo)
                    }
                    await fetch("http://localhost:8081/sendEmail", options);
                }
                   
            }
        }
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
                            <th className='flightNoHeading'>Flight No.</th>
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
                    <button className='searchFlightBtn' onClick={findFlightDetails}><img src={searchIcon} alt='Search' className='searchIcon' ></img>Show Flight Status</button>
                    {/* Created a reset button that set the input field value with default value.*/}
                    <button className='resetBtn' onClick={resetAllInputValues}>Reset</button>
                </div>
            </div>
            {/* If flight data exists for selected input field showcase the flight information.*/}
            {flightData ? (
                <div className='searchResultBox'>
                    <ShowSearchResultComponent flightData={flightData} />
                </div>) : allInputFieldsFilled ? <div className='noFlight'><h1>Sorry!! We cannot find any flight with the mentioned details.</h1></div> : null}
        </div>
    )
}

export default CheckFlightStatusComponent