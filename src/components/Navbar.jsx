export default function Navbar({ onTitleClick }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <h1
        className="text-4xl font-bold cursor-pointer"
        onClick={onTitleClick}
      >
        🎬 Movie Search
      </h1>
      <p className="text-gray-400 mt-2 text-center max-w-xl">
        Encuentra información de tus películas favoritas: calificación, fecha de estreno, sinopsis, tráiler y reparto.
      </p>
    </div>
  );
}
