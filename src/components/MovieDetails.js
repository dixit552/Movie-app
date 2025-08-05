import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const API_KEY = "df163dd3";

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      setMovie(res.data);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="movie-card2">
  <div className="movie-poster2">
    <img src={movie.Poster} alt={movie.Title} />
  </div>
  <div className="movie-info2">
    <h1>{movie.Title}</h1>
    <p className="plot2">{movie.Plot}</p>
    <div className="meta2">
      <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
      <p><strong>📅 Released:</strong> {movie.Released}</p>
      <p><strong>⭐ IMDB Rating:</strong> {movie.imdbRating}</p>
    </div>
  </div>
</div>

  );
};

export default MovieDetails;
