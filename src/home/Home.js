import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-black flex items-center h-screen w-screen justify-center ">
      <div className="grid grid-cols-2 gap-16">
        <Link
          to="/game-of-life"
          className="text-white text-2xl p-16 text-center border-4 border-rose-600 rounded-2xl uppercase font-bold transition-all duration-100"
        >
          Game of Life
        </Link>
        <Link
          to="/mandelbrot"
          className="text-white text-2xl p-16 text-center border-4 border-rose-600 rounded-2xl uppercase font-bold transition-all duration-100"
        >
          Mandelbrot Image
        </Link>
      </div>
    </div>
  );
}

export default Home;
