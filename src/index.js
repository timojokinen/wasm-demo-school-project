import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import GameOfLife from "./game-of-life/GameOfLife";
import MandelbrotImage from "./mandelbrot-img/MandelbrotImage";
import Home from "./home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game-of-life",
    element: <GameOfLife />,
  },
  {
    path: "/mandelbrot",
    element: <MandelbrotImage></MandelbrotImage>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
