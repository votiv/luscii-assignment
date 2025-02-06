import React from "react";
import ReactDOM from "react-dom/client";
import Modal from "react-modal";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

import "./main.css";
import { RegisteredTrainers } from "./pages/RegisteredTrainers";
import { RegisterdTrainerDetails } from "./pages/RegisterdTrainerDetails";

Modal.setAppElement("#root");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "trainers",
        element: <RegisteredTrainers />,
      },
      {
        path: "trainers/details/:trainerId",
        element: <RegisterdTrainerDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
