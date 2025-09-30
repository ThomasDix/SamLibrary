import React from 'react';
import Link from "next/link"

import './BooksList.Module.css';

import Book from "./Book";




const BooksList = () => {
    return (
        <div className="container">
            <Book />
        </div>
    );
};

export default BooksList;