export default function MovieGrid({ movies, DEFAULT_IMAGE, getMovieDetails, loading, error }) {
  if (loading) return <p className="text-center text-yellow-300">Cargando...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (movies.length === 0) return <p className="text-center text-gray-400">No se encontraron películas</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition"
          onClick={() => getMovieDetails(movie.id)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : DEFAULT_IMAGE
            }
            alt={movie.title}
            className="w-full h-72 object-cover"
          />
            <div className="p-3">
              <h2 className="text-lg font-bold truncate">{movie.title}</h2>
              <p className="text-sm text-gray-400">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}{" "}
                | 📅{" "}
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "Sin fecha"}
              </p>
            </div>
        </div>
      ))}
    </div>
  );
}
