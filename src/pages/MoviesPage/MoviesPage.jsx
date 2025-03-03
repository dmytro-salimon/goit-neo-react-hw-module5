import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieByQuery } from "../../api/api";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import css from "./MoviesPage.module.css";

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleSearch(query) {
    setSearchParams({ query });
  }

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    setIsLoading(true);
    setError(null);
    fetchMovieByQuery(query)
      .then((data) => setMovies(data.results))
      .catch(() => setError("Failed to load search results"))
      .finally(() => setIsLoading(false));
  }, [searchParams]);

  return (
    <div className={css.container}>
      <div className={css.searchBar}>
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;
