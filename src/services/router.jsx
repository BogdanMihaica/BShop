import React from "react";
import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import AddForm from "../pages/Profile/AddForm";
import Register from "../pages/Register";
import ProductPage from "../common/Layouts/Product/SeparatePage";

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
    path: "/profile/:userID",
    element: <Profile />,
  },
  {
    path: "/profile/add",
    element: <AddForm />,
  },
  {
    path: "/product/:productID",
    element: <ProductPage />,
  },
  {
    path: "*",
    element: <h1>{"Error! Page not found :("}</h1>,
  },
]);
