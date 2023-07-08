import React, { useEffect, useRef, useState } from "react";
import { calculate_mandelbrot } from "./load-wasm";

const width = 1920;
const height = 1080;

function MandelbrotImage() {
  const canvasRef = useRef(null);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [maxIterations, setMaxIterations] = useState(255);
  const [zoom, setZoom] = useState(1);
  const [zoomDisabled, setZoomDisabled] = useState(false);
  const [config, setConfig] = useState({
    centerX,
    centerY,
    maxIterations,
    zoom,
  });

  useEffect(() => {
    setZoomDisabled(true);
    const data = calculate_mandelbrot(
      width,
      height,
      config.centerX,
      config.centerY,
      config.zoom,
      config.maxIterations
    );
    const blob = new Blob([data], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 1920, 1080);
      ctx.drawImage(img, 0, 0, 1920, 1080);
      setZoomDisabled(false);
    };
    img.src = url;
  }, [config]);

  const handleClick = (event) => {
    if (zoomDisabled) return;
    event.preventDefault();
    const isDoubleClick = event.detail > 1;

    if (!isDoubleClick) return;

    const rect = event.target.getBoundingClientRect();

    // Calculate the position of the click in the canvas
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Now convert to fractal space and calculate the new fractal
    const center_x = zoom * (3.0 * (x / rect.width) - 2.0) + centerX;
    const center_y = zoom * (2.0 * (y / rect.height) - 1.0) + centerY;

    // Store the current center and zoom level for the next zoom operation
    setCenterX(center_x);
    setCenterY(center_y);
    setZoom(zoom * 0.3);
    setConfig({
      ...config,
      centerX: center_x,
      centerY: center_y,
      zoom: zoom * 0.3,
    });
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <canvas
        width={1920}
        height={1080}
        onClick={handleClick}
        className="absolute object-cover inset-0 object-center w-full h-full"
        ref={canvasRef}
      />
      <div className="text-white flex flex-col gap-8 justify-center z-8 fixed z-50 top-12 left-12">
        <label className="flex flex-col relative">
          <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
            Center X
          </span>
          <input
            className="px-8 py-4 border-4 border-green-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-green-600"
            type="text"
            value={centerX}
            onChange={(ev) => {
              if (isNaN(ev.target.value)) return;
              setCenterX(+ev.target.value);
            }}
            onBlur={(ev) => {
              setConfig({ ...config, centerX });
            }}
          ></input>
        </label>
        <label className="flex flex-col relative">
          <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
            Center Y
          </span>
          <input
            className="px-8 py-4 border-4 border-green-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-green-600"
            type="text"
            value={centerY}
            onChange={(ev) => {
              if (isNaN(ev.target.value)) return;
              setCenterY(+ev.target.value);
            }}
            onBlur={(ev) => {
              setConfig({ ...config, centerY });
            }}
          ></input>
        </label>
        <label className="flex flex-col relative">
          <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
            Zoom
          </span>
          <input
            className="px-8 py-4 border-4 border-green-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-green-600"
            type="text"
            value={zoom}
            onChange={(ev) => {
              if (isNaN(ev.target.value)) return;
              setZoom(+ev.target.value);
            }}
            onBlur={(ev) => {
              setConfig({ ...config, zoom });
            }}
          ></input>
        </label>
        <label className="flex flex-col relative">
          <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
            Iter
          </span>
          <input
            className="px-8 py-4 border-4 border-green-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-green-600"
            type="text"
            value={maxIterations}
            onChange={(ev) => {
              if (isNaN(ev.target.value)) return;
              setMaxIterations(+ev.target.value);
            }}
            onBlur={(ev) => {
              setConfig({ ...config, maxIterations });
            }}
          ></input>
        </label>
      </div>
    </div>
  );
}

export default MandelbrotImage;
