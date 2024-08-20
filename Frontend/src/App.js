import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BodyComponent from "./components/BodyComponent";
import './css/App.css';
import HomePageComponent from "./components/HomePageComponent";
import ErrorComponent from "./components/ErrorComponent";
import BookYourFlightComponent from "./components/BookYourFlightComponent";
import AboutUsComponent from "./components/AboutUsComponent";
import BookingTermsComponent from "./components/BookingTermsComponent";
import ContactComponent from "./components/ContactComponent";
import CheckFlightStatusComponent from './components/CheckFlightStatusComponent';
import AppNotificationComponent from "./components/AppNotificationComponent";


function App() {
  /**
   * Created the router instance (appRouter) that manages navigation and routing in a browser environment, with the provided array typically containing route definitions.
   */
    const appRouter = createBrowserRouter([
      /**
       * When the url of the website opened at local server is localhost:3000, BodyComponent will be rendered.
       */
      {
      path:"/",
      element:<BodyComponent />,
      children:[
        {
          path:"/",
          element:<HomePageComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/about",
          element:<AboutUsComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/bookingTerms",
          element:<BookingTermsComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/contact",
          element:<ContactComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/bookYourFlight",
          element:<BookYourFlightComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/checkFlightStatus",
          element:<CheckFlightStatusComponent />,
          errorElement:<ErrorComponent />
        },
        {
          path:"/appNotifications",
          element:<AppNotificationComponent />,
          errorElement:<ErrorComponent />
        }
      ],
      errorElement:<ErrorComponent />
      }
      
    ])
  return (
    <div>
      {/* <RouterProvider router={appRouter}> is used to provide the routing configuration defined by appRouter to the React application, enabling navigation and route management within the app based on the specified router instance. */}
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
