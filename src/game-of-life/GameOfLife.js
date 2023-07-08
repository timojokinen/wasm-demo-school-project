import { useEffect, useRef, useState } from "react";
import { Universe, Cell, memory } from "./load-wasm.js";

const CELL_SIZE = 15;
const GRID_COLOR = "#000000";
const DEAD_COLOR = "#000000";
const ALIVE_COLOR = "#e11d48";

function GameOfLife() {
  const canvasRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [redraw, setRedraw] = useState(1);
  const [universe] = useState(Universe.new());
  const [width, setWidth] = useState(universe.width());
  const [height, setHeight] = useState(universe.height());

  useEffect(() => {
    let animationId = null;
    console.log("run");
    const canvas = canvasRef.current;

    const initWasm = async () => {
      const height = universe.height();
      const width = universe.width();

      canvasRef.current.height = (CELL_SIZE + 1) * height + 1;
      canvasRef.current.width = (CELL_SIZE + 1) * width + 1;

      const ctx = canvas.getContext("2d");
      const drawGrid = () => {
        ctx.beginPath();
        ctx.strokeStyle = GRID_COLOR;

        // Vertical lines.
        for (let i = 0; i <= width; i++) {
          ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
          ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
        }

        // Horizontal lines.
        for (let j = 0; j <= height; j++) {
          ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
          ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
        }

        ctx.stroke();
      };

      const getIndex = (row, column) => {
        return row * width + column;
      };

      const drawCells = () => {
        const cellsPtr = universe.cells();
        const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

        ctx.beginPath();

        for (let row = 0; row < height; row++) {
          for (let col = 0; col < width; col++) {
            const idx = getIndex(row, col);

            ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR;

            ctx.fillRect(
              col * (CELL_SIZE + 1) + 1,
              row * (CELL_SIZE + 1) + 1,
              CELL_SIZE,
              CELL_SIZE
            );
          }
        }

        ctx.stroke();
      };

      const renderLoop = () => {
        if (paused) {
          return;
        }
        universe.tick();
        drawGrid();
        drawCells();

        animationId = requestAnimationFrame(renderLoop);
      };

      drawGrid();
      drawCells();
      renderLoop();
    };

    initWasm();

    return () => {
      cancelAnimationFrame(animationId);
      animationId = null;
    };
  }, [universe, paused, redraw]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="flex">
        <div className="flex flex-auto items-center justify-center w-screen h-screen fixed inset-0">
          <canvas
            className="m-0 max-w-full max-h-full"
            ref={canvasRef}
          ></canvas>
        </div>
        <div className="text-white flex flex-col gap-8 justify-center z-8 fixed z-50 top-12 left-12">
          <button
            className="px-8 py-4 border-4 border-rose-600 rounded uppercase font-bold text-xl bg-black shadow shadow-rose-600"
            onClick={() => {
              setPaused(!paused);
            }}
          >
            {paused ? "Play" : "Pause"}
          </button>
          <button
            className="px-8 py-4 border-4 border-rose-600 rounded uppercase font-bold text-xl bg-black shadow shadow-rose-600"
            onClick={() => {
              universe.reset_random();
              setRedraw(redraw + 1);
            }}
          >
            Reset with random order
          </button>
          <button
            className="px-8 py-4 border-4 border-rose-600 rounded uppercase font-bold text-xl bg-black shadow shadow-rose-600"
            onClick={() => {
              universe.reset_pattern();
              setRedraw(redraw + 1);
            }}
          >
            Reset with pattern order
          </button>
          <label className="flex flex-col relative">
            <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
              Width
            </span>
            <input
              className="px-8 py-4 border-4 border-rose-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-rose-600"
              type="text"
              name="width"
              value={width}
              onBlur={(ev) => {
                ev.preventDefault();
                setPaused(true);
                universe.set_width(width);
                universe.reset_pattern();
                setRedraw(redraw + 1);
                setPaused(false);
              }}
              onChange={(ev) => {
                if (!isNaN(ev.target.value)) {
                  setWidth(ev.target.value);
                }
              }}
            ></input>
          </label>
          <div>
            <label className="flex flex-col relative">
              <span className="text-xl font-bold uppercase text-center absolute left-8 top-1/2 transform -translate-y-1/2 pointer-events-none">
                Height
              </span>
              <input
                className="px-8 py-4 border-4 border-rose-600 rounded uppercase font-bold w-full text-white text-right bg-black text-xl outline-none shadow shadow-rose-600"
                type="text"
                name="width"
                value={height}
                onBlur={(ev) => {
                  ev.preventDefault();
                  setPaused(true);
                  universe.set_height(height);
                  universe.reset_pattern();
                  setRedraw(redraw + 1);
                  setPaused(false);
                }}
                onChange={(ev) => {
                  if (!isNaN(ev.target.value)) {
                    setHeight(ev.target.value);
                  }
                }}
              ></input>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameOfLife;
