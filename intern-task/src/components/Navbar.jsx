import React, { useState } from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="navbar">
            <Link to="/" className="navItems title">
                CineMania
            </Link>
            <Link to="/watching" className="navItems watching">
                Watching
            </Link>
            <Link to="/completed" className="navItems completed">
                Completed
            </Link>
            <Link to="/holdlist" className="navItems holdList">
                Hold List
            </Link>
            <div className="search">
                <input type="text" onChange={handleChange} value={searchText} />
                <div
                    className="search-icon"
                    onClick={() => {
                        navigate("/search/" + searchText);
                    }}
                >
                    🔍
                </div>
            </div>
        </div>
    );
};

export default Navbar;
