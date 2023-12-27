import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/MovieDescription.css";

const MovieDescription = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiKey = "9142cbba633a6f2ccd740be4c14aa022";
                const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

                const response = await fetch(apiUrl);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    return (
        <>
            {movie ? (
                <div className="movie-description">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                    <div className="movie-desc-details">
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                        <p>Release Date: {movie.release_date}</p>
                        <p>Language: {movie.original_language}</p>
                        <p>Rating: {movie.vote_average}</p>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default MovieDescription;
