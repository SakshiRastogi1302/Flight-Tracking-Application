export const checkAllInputFieldsFilled = (airlineName, flightNo, date, fromLocation, toLocation) => {
    // Array to store missing fields
    const missingFields = [];

    // Check if each field is filled
    if (airlineName === "Select An Airline") {
        missingFields.push("Airline Name");
    }
    if (flightNo === "") {
        missingFields.push("Flight Number");
    }
    if (date === "mm/dd/yy") {
        missingFields.push("Departure Date");
    }
    if (fromLocation === "") {
        missingFields.push("From Location");
    }
    if (toLocation === "") {
        missingFields.push("To Location");
    }

    // Generate alert message based on missing fields
    if (missingFields.length > 0) {
        const message = `Please fill in the following fields: ${missingFields.join(", ")}.`;
        alert(message);
        return "false";
    }

    // All fields are filled
    return "true";
};
