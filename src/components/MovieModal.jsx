import { X } from "lucide-react"; 

export default function MovieModal({ movieDetails, setShowModal }) {
  if (!movieDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
        
        {/* Botón de cierre */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-white hover:text-red-500"
          aria-label="Cerrar"
        >
          <X className="w-8 h-8" />
</button>

        {/* Imagen */}
        <img
          src={
            movieDetails.poster_path
              ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
              : "/imagen/image-not-available.png"
          }
          alt={movieDetails.title}
          className="w-full h-[800px] object-cover rounded-lg shadow-lg mb-4"
        />

        {/* Detalles */}
        <h2 className="text-2xl font-bold mb-2">{movieDetails.title}</h2>
        <p className="text-yellow-400 mb-1">⭐ {movieDetails.vote_average?.toFixed(1)} / 10</p>
        <p className="text-gray-400 mb-4">📅 Estreno: {movieDetails.release_date}</p>

        {/* Sinopsis */}
        <p className="text-gray-300 mb-6">{movieDetails.overview}</p>

        {/* Trailer */}
        {movieDetails.trailer && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">🎬 Tráiler</h3>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movieDetails.trailer.key}`}
              title="Trailer"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}

        {/* Reparto */}
        {movieDetails.cast && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-400">👥 Reparto</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {movieDetails.cast.map((actor) => (
                <div key={actor.id} className="flex flex-col items-center min-w-[80px]">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/imagen/image-not-available.png"
                    }
                    alt={actor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <p className="text-xs text-center text-gray-300">{actor.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
