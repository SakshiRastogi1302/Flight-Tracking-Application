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

export const getEmailSubject = (status) => {
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

export const getEmailBody = (flight) => {
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


export const sendEmail = async(flightInformation) => {
    const emailList = JSON.parse(flightInformation.passengers_list);
      for (const passenger in emailList) {
        const flightInfo = {
          email: emailList[passenger].emailId,
          subject: getEmailSubject(flightInformation.status),
          text: getEmailBody(flightInformation)
        };

        await fetch("http://localhost:8081/sendEmail", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(flightInfo)
        })
      }
}

// Helper function to format time from ISO string
export const formatTime = (timeString) => {
    if (timeString === "null") return null;
    return timeString.split("T")[1].split("Z")[0];
  };