import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Fibonacci from "./components/Fibonacci";
import OtherPage from "./components/OtherPage";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Fibonacci />,
  },
  {
    path: "/otherpage",
    element: <OtherPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
