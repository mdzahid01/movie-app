import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Result from "./components/Result";
import MovieDetails from "./components/MovieDetails";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function App({ darkMode }) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch trending movies
  const getAllMovies = () => {
    axios
      .get(API_URL)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  };

  // Fetch movies by search query
  const getMoviesBySearch = () => {
    if (search.trim() === "") {
      getAllMovies();
      return;
    }
    axios
      .get(`${SEARCH_URL}${search}`)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  useEffect(() => {
    getMoviesBySearch();
  }, [search]);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      {/* Search Bar */}
      <input
        type="search"
        className={`form-control border-2 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} p-3 mb-4`}
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Result movies={movies} darkMode={darkMode} />} />
        <Route path="/movie/:id" element={<MovieDetails darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
