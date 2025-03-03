import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchMovieCast(movieId)
      .then((data) => setCast(data.cast))
      .catch(() => setError("Failed to load cast"))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      {isLoading && <p>Loading cast...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <ul className={css.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={css.castItem}>
              {actor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
