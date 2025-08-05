import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./components/MovieList";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const API_KEY = "df163dd3";

const getMovieRequest = async (searchValue, page) => {
  if (!searchValue) {
    setError("Please enter a movie name");
    return;
  }

  setLoading(true);
  setError("");
  try {
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=${API_KEY}`;
    const response = await axios.get(url);

    if (response.data.Response === "True") {
      setMovies(response.data.Search);
    } else {
      setError(response.data.Error || "No movies found");
    }
  } catch (err) {
    setError("Failed to fetch movies");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (searchValue !== "") {
    getMovieRequest(searchValue, page);
  } else {
    setMovies([]);
    setError("");
  }
}, [searchValue, page]);
 

useEffect(() => {
    getMovieRequest(searchValue, page);
  }, [searchValue, page]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);


  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);


  const saveToLocalStorage = (items) => {
    localStorage.setItem("favorites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
    toast.success(`${movie.Title} added to favorites!`);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
    toast.error(`${movie.Title} removed from favorites!`);
  };

  return (
    <div className="container">
      <header className="app-header">
        <div className="logo">🎬 MovieHub</div>
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
       

      </header>

      <SearchBox value={searchValue} setSearchValue={setSearchValue} />

      <Routes>
        <Route path="/" element={
          <>
            <h2>Movies</h2>
            <MovieList
              movies={movies}
              handleFavoritesClick={addFavoriteMovie}
              favoriteComponent={AddFavorites}
              
              
            />

            <h2>Favorites</h2>
            <MovieList
              movies={favorites}
              handleFavoritesClick={removeFavoriteMovie}
              favoriteComponent={RemoveFavorites}
                
            />


            {loading && <h3>Loading...</h3>}
            {error && <h3 style={{ color: "red" }}>{error}</h3>}


          </>
        } />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <div className="pagination">
        <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />

         
    </div>
  );
};
export default App;
