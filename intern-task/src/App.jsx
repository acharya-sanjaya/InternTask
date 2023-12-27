import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieSlider from "./components/MovieSlider";
import Navbar from "./components/Navbar";
import MovieDescription from "./components/MovieDescription";
import MyList from "./components/MyList";
import SearchResult from "./components/SearchResult";

const App = () => {
    const dashboard = (
        <div className="dashboard">
            <MovieSlider genre="Action" genreId={28} />
            <MovieSlider genre="History" genreId={36} />
            <MovieSlider genre="Animation" genreId={16} />
            <MovieSlider genre="Comedy" genreId={35} />
            <MovieSlider genre="Drama" genreId={18} />
        </div>
    );

    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={dashboard} />
                    <Route path="/search/:query" element={<SearchResult />} />
                    <Route
                        path="/watching"
                        element={<MyList key="watching" type="watching" />}
                    />
                    <Route
                        path="/completed"
                        element={<MyList key="completed" type="completed" />}
                    />
                    <Route
                        path="/holdList"
                        element={<MyList key="holdlist" type="holdlist" />}
                    />
                    <Route path="/movie/:id" element={<MovieDescription />} />
                    <Route path="*" element={<>Page not found</>} />
                </Routes>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
};

export default App;
