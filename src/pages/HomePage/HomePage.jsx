import { useState, useEffect } from "react";
import { fetchTrendingMovies } from "../../api/api";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchTrendingMovies()
      .then((data) => setMovies(data.results))
      .catch(() => setError("Failed to load trending movies"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default HomePage;
