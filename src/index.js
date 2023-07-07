import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GameOfLife from "./game-of-life/GameOfLife";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GameOfLife />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
