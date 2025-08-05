import { Link } from "react-router-dom";

const MovieList = ({ movies, handleFavoritesClick, favoriteComponent: FavoriteComponent , darkMode}) => {
  return (
    <div className="movie-list"  data-aos="fade-up" >
      {movies.map((movie, index) => (
        
        <div className="movie-card" key={index}>
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
          </Link>
          <div className="overlay" onClick={() => handleFavoritesClick(movie)}>
            <FavoriteComponent />
          </div>
          <h4>{movie.Title} ({movie.Year})</h4>
        </div>
        
      ))}
        </div>
        
    
  );
};

export default MovieList;
