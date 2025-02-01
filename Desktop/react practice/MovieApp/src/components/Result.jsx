import React from "react";
import { Link } from "react-router-dom";

export default function Result({ movies, darkMode }) {
  return (
    <div className="container">
      <div className="row g-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Box key={movie.id} movie={movie} darkMode={darkMode} />
          ))
        ) : (
          <p className="text-center">No movies found.</p>
        )}
      </div>
    </div>
  );
}

const Box = ({ movie, darkMode }) => {
  const rating = Math.round(movie.vote_average / 2); // Convert 10-scale to 5-scale

  return (
    <div className="col-md-3">
      <div className={`card shadow-sm ${darkMode ? "border-light" : "border-dark"}`}>
        <Link to={`/movie/${movie.id}`} className="text-decoration-none text-dark">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            className="card-img-top"
            alt={movie.title}
          />
          <div className={`card-body text-center ${darkMode ? "text-light bg-dark" : "text-dark bg-light"}`}>
            <h5 className="card-title">{movie.title}</h5>

            {/* Star Ratings */}
            <div className="text-warning">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < rating ? "★" : "☆"}</span>
              ))}
            </div>

            <p className="text-muted">Rating: {movie.vote_average}/10</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
