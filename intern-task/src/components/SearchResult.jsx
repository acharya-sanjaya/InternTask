import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

const SearchResults = () => {
    const { query } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const apiUrl = "https://api.themoviedb.org/3/search/movie";
        const API_KEY = "9142cbba633a6f2ccd740be4c14aa022";
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        const endpoint = `${apiUrl}?query=${query}&api_key=${API_KEY}`;

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(endpoint, options);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSearchResults(data.results);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <div
            className="slider-outer-container"
            style={{
                width: "90vw",
                margin: "auto",
            }}
        >
            <h2>Search Results for "{query}"</h2>
            <div
                style={{
                    display: "flex",
                    width: "100%",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
            >
                {searchResults.length === 0 ? (
                    <p>No movies found for "{query}"</p>
                ) : (
                    searchResults.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchResults;
