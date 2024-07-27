import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BodyComponent from "./components/BodyComponent";
import CheckFlightStatusComponent from "./components/CheckFlightStatusComponent";
import './css/App.css';


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
    },

    /**
     * When the url of the website opened at local server is localhost:3000/checkFlightStatus, CheckFlightStatusComponent will be rendered.
     */
    {
      path:"/checkFlightStatus",
      element:<CheckFlightStatusComponent />
    }
  ])
  return (
    <div className="app">
      {/* <RouterProvider router={appRouter}> is used to provide the routing configuration defined by appRouter to the React application, enabling navigation and route management within the app based on the specified router instance. */}
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
