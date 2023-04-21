import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddForm from "../pages/Profile/AddForm";
import Register from "../pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/add",
    element: <AddForm />,
  },
  {
    path: "*",
    element: <h1>{"Error! Page not found :("}</h1>,
  },
]);
