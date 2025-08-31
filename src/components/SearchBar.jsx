export default function SearchBar({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  handleSearchInput,
  searchMovies,
  fetchPopularMovies
}) {
  return (
    <form onSubmit={searchMovies} className="flex justify-center mb-4 gap-2 relative">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          placeholder="Buscar película..."
          className="w-full p-3 pl-4 rounded-lg text-gray-900 bg-gray-200 border border-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={query}
          onChange={(e) => handleSearchInput(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute left-0 w-full bg-white text-black rounded-lg shadow-lg mt-1 max-h-60 overflow-auto z-10">
            {suggestions.map((s) => (
              <li
                key={s.id}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setQuery(s.title);
                  setSuggestions([]);
                  searchMovies();
                }}
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="bg-yellow-400 text-black px-5 py-3 rounded-lg hover:bg-yellow-300 transition font-semibold"
      >
        Buscar
      </button>
      <button
        type="button"
        onClick={() => {
          setQuery("");
          fetchPopularMovies(1);
        }}
        className="bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-400 transition font-semibold"
      >
        Volver
      </button>
    </form>
  );
}
