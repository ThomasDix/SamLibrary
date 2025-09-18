import React from 'react';
import Link from "next/link"

import './Navigation.Module.css';


const Navigation = () => {
    return (
        <nav className = "navbar">
            <Link href="/main" passHref>
                <p className="item">Main Books Page</p>
            </Link>
            <Link href="/MyBooks" passHref>
                <p className="item">My Books</p>
            </Link>
            <Link href="/Wishlist" passHref>
                <p className="item">Wishlist</p>
            </Link>
            <Link href="/Ratings" passHref>
                <p className="item">Book Ratings</p>
            </Link>
        </nav>
    );
};

export default Navigation;