import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchMovieReviews(movieId)
      .then((data) => setReviews(data.results))
      .catch(() => setError("Failed to load reviews"))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {isLoading && <p>Loading reviews...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((review) => (
            <li key={review.id} className={css.reviewItem}>
              <h3 className={css.author}>Author: {review.author}</h3>
              <p className={css.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && !error && <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
