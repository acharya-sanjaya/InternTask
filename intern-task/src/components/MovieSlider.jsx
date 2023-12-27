import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "../styles/MovieSlider.css";

const MovieSlider = ({ genre, genreId }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const apiUrl = "https://api.themoviedb.org/3/discover/movie";
        const API_KEY = "9142cbba633a6f2ccd740be4c14aa022";
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        const endpoint = `${apiUrl}?with_genres=${genreId}&sort_by=popularity.desc&api_key=${API_KEY}`;

        const fetchMovies = async () => {
            try {
                const response = await fetch(endpoint, options);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="slider-outer-container">
            <h2 className="title">{genre}</h2>
            <div className="slider-container">
                <div className="movie-slider">
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieSlider;
