# Flight-Tracking-Application

## FRONTEND

**TECHNOLOGY STACK & LIBRARY USED IN FRONTEND:-**

1. HTML
2. CSS
3. React JS
4. React-Router-DOM

**PROJECT STRUCTURE**

1. I have created the react app using the following command :- **npx create-react-app Flight-Tracking-System**.
2. I have created two folders :- **Frontend** - that contains the code of User Interface. **Backend** that contains the code of server and database.
2. I have installed the routing library **react-router-dom** for the React. It helps us to route to pages based on URL.
3. I have changed the title of my website to **Flight Tracking System** in the index.html file present inside public folder.
4. I have changed the favicon for the website.
5. I have createa a **components folder** inside src folder that stores all the components that I have created in the website.
6. I have created a **css folder** inside src folder that stores the css of all the components that I have created in the website.
7. I have created an **image folder** inside src folder that stores all the images and icons that I have used in the website.
8. I have created a **util folder** inside src folder that stores all the helper functions that are used frequently in the website to perform a task.

# Components Explanation

**1. App Component (App.js)**

1. In this component, I have created the router instance (appRouter) that manages navigation and routing in a browser environment, with the provided array typically containing 2 route definitions. The route "/" renders the BodyComponent and the route "/checkFlightStatus" calls the CheckFlightStatusComponent.

2. Then, I have provided this router instance (appRouter) to the RouterProvider which is used to provide the routing configuration defined by appRouter to the React application, enabling navigation and route management within the app.

3. I have added css for this file in App.css file & it is present inside css folder.

**2. Body Component**

![Home Page](./Images/homepage.png)

1. BodyComponent displays the above UI. It consists of background image, heading (Check Flight Status) and a button (Check Status). 

2. BodyComponent.css file which is present inside css folder is used to provide styling to this component.

3. Once you click on Check Status button, it will change the route from "/" to "/checkFlightStatus and CheckFlightStatusComponent is rendered.


**3. Check Flight Status Component**

![Check Flight Status](./Images/checkflightstatus.png)


1. CheckFlightStatusComponent displays the above UI. It consists of a white box that has a heading (Check Flight Status), Airline Name dropdown consisting of two options (Indigo & Air India), Flight No/ Flight Id (e.g. 6E 2341 - Indigo Flight Id, AI 142 - Air India Flight Id), Departure Date (date for which you have booked the flight),From Location (from where you will board the flight), To Location (Where you want to land), Show Flight Status Button (to check the status of the flight), Reset Button (to change the input fields to their default values), Back Button (to go to the homepage).

2. Once you click on Show Flight Status Button, it will check whether all fields are filled. If yes, it will show the flight details based on your input. If no, it will show a pop up telling these particular fields are required.

3. Once you click on Show Flight Status Button, it will make an api call to "http://localhost:8081/flight" along with some parameters like flight number, departure date, from location and to location which will fetch the particular data from database using sql query and returns the data to the UI. Now, we will pass the flight information to ShowSearchResult Component that is responsible for displaying the flight information. If the user has entered a wrong airline name or flight no or departure date or from location or to location then it will show {We couldn't find any flights with the specified information.}

4. Once you click on reset button, it will set the input fields (Airline Name, Flight No., Departure Date, From Location, To Location) to default value.

5. I have added css for this file in CheckFlightStatusComponent.css file & it is present inside css folder.



**4. Show Search Result Component**

![Show Search Result](./Images/showsearchresult.png)

1. ShowSearchResultComponent displays the above UI.

2. If the entered input fields are correct, ShowSearchResultComponent will receive the flight information as props from CheckFlightStatusComponent which it will then display on the UI.
    
3. ShowSearchResultComponent displays a heading (Searched Flight Status), Airline Name (e.g. Indigo), Flight Number (e.g. 6E 2341), From Location (e.g. Mumbai), To Location (e.g. Lucknow), Flight Status (e.g. On Time), Departure Time, Departure Gate, Arrival Time and Arrival Gate.

4. I have added css for this file in ShowSearchResultComponent.css file & it is present inside css folder.

**5. Send Email**

![Email](./Images/email.png)

1. Whenever there is a change in the status of the flight in the database like (status of the flight got changed from On Time to Cancelled), the server will tell the client about the update in database through web sockets & then an email will be send using nodemailer to all the passengers who have booked this flight by sending a post request to (http://localhost:8081/sendEmail) along with JSON stringified body which consists of passenger email, subject and text. This post api calls the sendMail function defined inside the backend.

**How To Run Frontend Folder**

    1. Inside the terminal, use cd to go to the Frontend Directory.
    2. Run npm install to install the required packages.
    3. Run npm start to start the application.



## BACKEND

**TECHNOLOGY STACK & TOOLS USED IN BACKEND:-**

1. Express.js
2. Nodemailer
3. Nodemon
4. MySQL


**SERVER - (Using Express JS)**

![Server](./Images/server.png)

1. In the server.js file, I have created a server that is running on port # (8081). 

2. I have created a connection between mysql database 
    and the server.
    
3. I have created a get api for fetching flights information stored in database.
    
4. I have created a post api that is used to send email to all the passengers whose flight either has been delayed or cancelled or their departure gate has been changed.

5. I have created a function (checkForUpdates) which is called in every 1 second to check whether there is an update in the database or not. If, yes then the server will inform the client about the update in database using websockets. 
 

**SEND EMAIL (Using NodeMailer)**
1. I have created a nodemailer transporter using SMTP.
2. Using transporter, call sendMail method which take message option object as input. Message option object consists of sender email, receiver email, subject, text.

**How To Run Backend Folder**
1. Inside the terminal, use cd to go to the Backend Directory.
2. Run npm install to install the required packages.
3. Run npm start to start the server.



## DATABASE

1. I have created the database (flight_tracking_application_database) using MySQL (phpMyAdmin). The database consists of two tables (flight and updated_flight_information). The flight table contains the information about the flights and updated_flight_information table stores those flight information whose status has been updated. I have created a trigger (Updated Flight Information) in flight table that gets invoked or triggered automatically after an UPDATE operation gets successfully executed on the flight table. 


**How To Create MySQL Database**

1. Install & open XAMPP application in your computer.

2. Install MySQL & Apache module by clicking on the checkboxes. 
    
3. Now click on start button to start the modules.
    
4. Once you have completed the above procedure, open your browser and type https://localhost/phpmyadmin/.
    
5. You can now use your phpmyadmin to create a database by adding table, columns and data into it.


## APPROACH

**Overview**:

The Flight Tracking Application delivers real-time flight status updates on the user interface and sends notifications to passengers whenever there is a change in flight status.

### Features Implemented:

**1. Real-time Updates:**\
I have used WebSockets, a protocol that facilitates full-duplex communication over a single, persistent connection between client and server, enabling real-time data exchange. This technology allowed me to push live flight status updates such as delays, cancellations, and gate changes directly to the frontend, where the latest flight information is dynamically displayed as it arrives.

**2. Push Notifications:**\
I have used NodeMailer to send notifications to passengers whenever the flight status changes, ensuring they are promptly informed. This process involves making an API call from the UI, which triggers the `sendMail` function. The implementation includes creating a transporter and then invoking the `sendMail` function with the recipient's email, subject, and message text as parameters.

**3.Integration with Airport Systems:**\
I have created a MySQL database to store and manage flight information for Indigo and Air India, ensuring the data is accurate and up-to-date. The system retrieves flight data from this database using a GET API.

**Technology Stack Used:**

1. **Frontend**: React JS for a responsive UI, HTML/CSS for styling, React-Router-DOM for navigation.

2. **Backend**: Express.js for API management, WebSockets for real-time data, NodeMailer for email notifications.

3. **Database**: MySQL for data storage and management.


This solution ensures passengers receive timely and accurate flight status updates and notifications, enhancing their overall travel experience.






