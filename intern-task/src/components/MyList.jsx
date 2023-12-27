import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/MyList.css";

function MyList({ type }) {
    const [movieList, setMovieList] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);

    useEffect(() => {
        const keys = Object.keys(localStorage);

        const filteredList = keys.filter(
            (key) =>
                localStorage.getItem(key)?.toUpperCase() === type.toUpperCase()
        );
        setMovieList(filteredList);

        const fetchMovieInfo = async () => {
            try {
                const details = await Promise.all(
                    filteredList.map(async (movieId) => {
                        const response = await fetch(
                            `https://api.themoviedb.org/3/movie/${movieId}?api_key=9142cbba633a6f2ccd740be4c14aa022`
                        );
                        const data = await response.json();
                        return data;
                    })
                );
                setMovieDetails(details);
            } catch (error) {
                console.error("Error fetching movie details:", error);
                toast.error("Error fetching movie details");
            }
        };

        if (filteredList.length > 0) {
            fetchMovieInfo();
        }
    }, [type]);

    const handleAddToSection = (movieId, section) => {
        const movieStatus = localStorage.getItem(movieId);
        if (movieStatus === section) {
            toast.error(`Removed from ${section}`);
            localStorage.removeItem(movieId);
            setMovieList((prevList) => prevList.filter((id) => id !== movieId));
        } else {
            toast.success(`Added to ${section}`);
            localStorage.setItem(movieId, section);
            setMovieList((prevList) => [...prevList, movieId]);
        }
    };

    return (
        <div className="type-list-container">
            {movieDetails.length === 0 ? (
                <p style={{ fontSize: "40px", padding: "40px 140px" }}>
                    No items found in {type}
                </p>
            ) : (
                movieDetails.map((movie) => (
                    <div key={movie.id}>
                        <div className="details">
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    className="img1"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    height="200px"
                                    width="250px"
                                />
                            </Link>
                            <div className="list-desc">
                                <h2>Title: {movie.title}</h2>
                                <p>Release Date: {movie.release_date}</p>
                                <p>Rating: {movie.vote_average}</p>
                                <div className="list-actions">
                                    <div
                                        onClick={() =>
                                            handleAddToSection(
                                                movie.id,
                                                "watching"
                                            )
                                        }
                                    >
                                        {localStorage.getItem(movie.id) ===
                                        "watching"
                                            ? "Remove from Watching"
                                            : "Add to Watching"}
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleAddToSection(
                                                movie.id,
                                                "completed"
                                            )
                                        }
                                    >
                                        {localStorage.getItem(movie.id) ===
                                        "completed"
                                            ? "Remove from Completed"
                                            : "Add to Completed"}
                                    </div>
                                    <div
                                        onClick={() =>
                                            handleAddToSection(
                                                movie.id,
                                                "holdlist"
                                            )
                                        }
                                    >
                                        {localStorage.getItem(movie.id) ===
                                        "holdlist"
                                            ? "Remove from Hold List"
                                            : "Add to Hold List"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default MyList;
