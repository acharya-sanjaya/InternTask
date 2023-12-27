import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaCheck, FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/MovieCard.css";

const MovieCard = ({ movie }) => {
    const [movieStatus, setMovieStatus] = useState("");

    useEffect(() => {
        const storedMovieStatus = localStorage.getItem(movie.id);
        if (storedMovieStatus) {
            setMovieStatus(storedMovieStatus);
        }
    }, [movie.id]);

    const handleAddToWatching = () => {
        if (movieStatus === "watching") {
            toast.error("Removed from Watching");
            localStorage.removeItem(movie.id);
            setMovieStatus("");
        } else {
            toast.success("Added to Watching");
            localStorage.setItem(movie.id, "watching");
            setMovieStatus("watching");
        }
    };

    const handleAddToCompleted = () => {
        if (movieStatus === "completed") {
            toast.error("Removed from Completed");
            localStorage.removeItem(movie.id);
            setMovieStatus("");
        } else {
            toast.success("Added to Completed");
            localStorage.setItem(movie.id, "completed");
            setMovieStatus("completed");
        }
    };

    const handleAddToHoldList = () => {
        if (movieStatus === "holdlist") {
            toast.error("Removed from Hold List");
            localStorage.removeItem(movie.id);
            setMovieStatus("");
        } else {
            toast.success("Added to Hold List");
            localStorage.setItem(movie.id, "holdlist");
            setMovieStatus("holdlist");
        }
    };

    return (
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img
                    className="movie-image"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="Movie Image"
                />
                <div className="movie-title">{movie.title}</div>
                <div className="movie-rating">⭐ {movie.vote_average}</div>
            </Link>
            <div className="actions">
                <div
                    className={`add-to-watching ${
                        movieStatus === "watching" ? "solid" : "regular"
                    }`}
                    onClick={handleAddToWatching}
                >
                    <FaEye />
                </div>
                <div
                    className={`add-to-completed ${
                        movieStatus === "completed" ? "solid" : "regular"
                    }`}
                    onClick={handleAddToCompleted}
                >
                    <FaCheck />
                </div>
                <div
                    className={`add-to-hold-list ${
                        movieStatus === "holdlist" ? "solid" : "regular"
                    }`}
                    onClick={handleAddToHoldList}
                >
                    <FaList />
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
