import { useMovies } from "./hooks/useMovies";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import Pagination from "./components/Pagination";
import MovieModal from "./components/MovieModal";
import "./App.css";

export default function App() {
  const API_KEY = "TU_API_KEY_AQUI"; // Reemplaza con tu clave API

  const {
    DEFAULT_IMAGE,
    query,
    setQuery,
    movies,
    suggestions,
    setSuggestions,
    loading,
    error,
    movieDetails,
    showModal,
    setShowModal,
    page,
    totalPages,
    fetchPopularMovies,
    searchMovies,
    handleSearchInput,
    getMovieDetails
  } = useMovies(API_KEY);

  const handleResetToHome = () => {
    setQuery("");
    setSuggestions([]);
    fetchPopularMovies(1); // Ya no necesitas limpiar filtros
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 min-w-full">
      <Navbar onTitleClick={handleResetToHome} />

      <SearchBar
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        handleSearchInput={handleSearchInput}
        searchMovies={searchMovies}
        fetchPopularMovies={fetchPopularMovies}
      />

      <MovieGrid
        movies={movies}
        DEFAULT_IMAGE={DEFAULT_IMAGE}
        getMovieDetails={getMovieDetails}
        loading={loading}
        error={error}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          if (query) {
            searchMovies(null, newPage);
          } else {
            fetchPopularMovies(newPage);
          }
        }}
      />

      {showModal && (
        <MovieModal movieDetails={movieDetails} setShowModal={setShowModal} />
      )}
    </div>
  );
}
