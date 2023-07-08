import React, { useEffect, useRef, useState } from "react";
import { calculate_mandelbrot } from "./load-wasm";

const width = 1920;
const height = 1080;

function MandelbrotImage() {
  const canvasRef = useRef(null);
  const [centerX, setCenterX] = useState(0);
  const [centerY, setCenterY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [zoomDisabled, setZoomDisabled] = useState(false);

  useEffect(() => {
    setZoomDisabled(true);
    const data = calculate_mandelbrot(
      width,
      height,
      centerX,
      centerY,
      zoom,
      510
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
  }, [zoom, centerX, centerY]);

  const handleClick = (event) => {
    if (zoomDisabled) return;
    console.log(zoom, centerX, centerY);
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
    </div>
  );
}

export default MandelbrotImage;
