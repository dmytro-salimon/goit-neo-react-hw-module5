import { useParams, Link, useLocation, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchMovieById } from "../../api/api";
import css from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

function MovieDetailsPage() {
  const location = useLocation();
  const goBackLink = useRef(location.state ?? "/");
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchMovieById(movieId)
      .then((data) => setMovie(data))
      .catch(() => setError("Failed to load movie details"))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link to={goBackLink.current} className={css.backLink}>
        Go back
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && movie && (
        <div className={css.mainInfo}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            alt="poster"
            className={css.poster}
          />
          <div className={css.details}>
            <h1 className={css.title}>{movie.title}</h1>
            <p className={css.score}>User score: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p className={css.overview}>{movie.overview}</p>
            <h3>Genres</h3>
            <ul className={css.genresList}>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={css.subLinks}>
        <h3 className={css.sublinksTitle}>Additional information</h3>
        <Link to="cast" className={css.subLink}>
          Cast
        </Link>
        <Link to="reviews" className={css.subLink}>
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
