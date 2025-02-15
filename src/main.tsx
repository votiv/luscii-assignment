import React from "react"
import ReactDOM from "react-dom/client"
import Modal from "react-modal"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { RegisteredTrainers } from "./pages/RegisteredTrainers"
import { RegisteredTrainerDetails } from "./pages/RegisteredTrainerDetails"
import Home from "./pages/Home"

import "./main.css"

Modal.setAppElement("#root")

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Navigate to="/trainers" replace />,
      },
      {
        path: "trainers",
        element: <RegisteredTrainers />,
      },
      {
        path: "trainers/details/:trainerId",
        element: <RegisteredTrainerDetails />,
      },
      {
        path: "trainers/register",
        element: <RegisteredTrainerDetails />,
      },
    ],
  },
])

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
