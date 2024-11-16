import ReactDOM from "react-dom/client";
import { createHashRouter, Form, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import { store }  from "./redux/store";
import App from "./App";
import React from "react";
import { Toaster } from "react-hot-toast";
import Favorites from "./components/Favorites/Favorites";
import About from "./components/About/About";
import  Register  from "./components/Form/Register";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Favorites",
    element: <Favorites />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Login",
    element: <Form/>,
  },
  {
    path: "/Register",
    element: <Register/>,
  },
  
],

)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
