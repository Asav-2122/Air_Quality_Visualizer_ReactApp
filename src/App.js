import { Provider } from "react-redux";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home/Home.js";
import { store } from "./redux/store/store";
import { Outlet, createBrowserRouter } from "react-router-dom";
import MeasurmentsOfSelectedCity from "./components/pages/Home/MeasurmentsOfSelectedCity";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        {/* <Home/> */}
        <Outlet />
      </div>
    </Provider>
  );
}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/city/:city",
        element: <Home />,
      },
    ],
  },
]);

export default App;
