import { useState, useEffect } from "react";
import defaultPoster from "../imagen/image-not-available.png";

export function useMovies(API_KEY) {
  const DEFAULT_IMAGE = defaultPoster;

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movieDetails, setMovieDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Películas populares al inicio
  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const sortByReleaseDate = (movies) => {
  return movies
    .filter(movie => movie.release_date)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
};


 const fetchPopularMovies = async (newPage = 1) => {
  setLoading(true);
  setError("");
  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${newPage}`;
    const res = await fetch(url);
    const data = await res.json();

    const sortedMovies = sortByReleaseDate(data.results);
    setMovies(sortedMovies);
    setTotalPages(data.total_pages);
    setPage(newPage);
  } catch {
    setError("Error al cargar películas populares.");
  }
  setLoading(false);
};


const searchMovies = async (e, newPage = 1) => {
  if (e) e.preventDefault();
  if (query.trim() === "") {
    fetchPopularMovies();
    return;
  }

  setLoading(true);
  setError("");

  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=es-ES&page=${newPage}`;
    const res = await fetch(url);
    const data = await res.json();

    const sortedMovies = sortByReleaseDate(data.results);
    setMovies(sortedMovies);
    setTotalPages(data.total_pages);
    setPage(newPage);
    setSuggestions([]);
  } catch {
    setError("Error al buscar películas.");
  }

  setLoading(false);
};


  const handleSearchInput = async (value) => {
    setQuery(value);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${value}&language=es-ES`;
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data.results.slice(0, 5));
    } catch {
      setSuggestions([]);
    }
  };

  const getMovieDetails = async (movieId) => {
    try {
      const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;
      const detailsRes = await fetch(detailsUrl);
      const detailsData = await detailsRes.json();

      const videosUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`;
      const videosRes = await fetch(videosUrl);
      const videosData = await videosRes.json();
      const trailer = videosData.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`;
      const creditsRes = await fetch(creditsUrl);
      const creditsData = await creditsRes.json();
      const cast = creditsData.cast.slice(0, 6);

      setMovieDetails({ ...detailsData, trailer, cast });
      setShowModal(true);
    } catch {
      alert("Error al obtener detalles.");
    }
  };

  return {
    DEFAULT_IMAGE,
    query,
    setQuery,
    movies,
    suggestions,
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
    getMovieDetails,
    setSuggestions
  };
}
