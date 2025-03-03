import axios from "axios";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTBlMDZiNWZjMjZiZjQyNjM2ZTk3MDBhODg4NTM5NyIsIm5iZiI6MTc0MDkwOTk5Ni4zMTUsInN1YiI6IjY3YzQyZGFjM2RlN2M5Yzg3NTRiMGVjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z_j1Pwi4oui12AhKo3f8DG8IdQfSBAc0EdDhnY8mJQE";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;

export async function fetchTrendingMovies() {
  const response = await axios.get("/trending/movie/day?language=en-US");
  return response.data;
}

export async function fetchMovieByQuery(movieQuery) {
  const response = await axios.get(
    `/search/movie?query=${movieQuery}&include_adult=false&language=en-US&page=1`
  );
  return response.data;
}

export async function fetchMovieById(movieId) {
  const response = await axios.get(`/movie/${movieId}?language=en-US`);
  return response.data;
}

export async function fetchMovieCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits?language=en-US`);
  return response.data;
}

export async function fetchMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews?language=en-US`);
  return response.data;
}
