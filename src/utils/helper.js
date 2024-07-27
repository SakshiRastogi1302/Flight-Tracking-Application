export const allInputFieldsSelected = (airlineName, flightNo, date) => {
    if (airlineName === "Select An Airline" && flightNo === "" && date === "mm/dd/yy") {
        alert("Airline Name, Flight Number, Departure Date Is Required");
    }
    else if (airlineName === "Select An Airline" && date === "mm/dd/yy") {
        alert("Airline Name & Departure Date Is Required");
    }
    else if (airlineName === "Select An Airline" && flightNo === "") {
        alert("Airline Name & Flight Number Is Required");
    }
    else if (airlineName === "Select An Airline") {
        alert("Airline Name Is Required");
    }
    else if (airlineName !== "Select An Airline") {
        if (flightNo === "" && date === "mm/dd/yy") {
            alert("Flight Number & Departure Date Is Required");
        }
        else if (flightNo === "") {
            alert("Flight No Is Required");
        }
        else {
            if (date === "mm/dd/yy") {
                alert("Departure Date Is Required");
            }
            else {
                return "true";
            }
        }
    }

    return "false";
}