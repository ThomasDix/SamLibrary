import React from 'react';
import Link from "next/link"

import './Navigation.Module.css';


const Navigation = () => {
    return (
        <nav className = "navbar">
            <Link href="/main" passHref>
                <p className="item">Books</p>
            </Link>
            <Link href="/MyBooks" passHref>
                <p className="item">My Books</p>
            </Link>
            <Link href="/Wishlist" passHref>
                <p className="item">Wishlist</p>
            </Link>
            <div className="search-bar">
                <div className="search-select">
                    
                    <select aria-label="search by">
                        <option value="all">All</option>
                        <option value="title">Title</option>
                        <option value="genre">Genre</option>
                        <option value="author">Author(s)</option>

                    </select>
                </div>
                <form className="search">
                    <input className="searchbar" name="query" type="text" placeholder="Search Titles"></input>
                </form>
            </div>
        </nav>
    );
};

export default Navigation;