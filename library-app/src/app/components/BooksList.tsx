"use client";
import { useState, type KeyboardEvent } from "react";
import Book from "./Book";
import styles from "./BooksList.module.css";


const BooksList = () => {

    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
        e.preventDefault();

        setPage(1);
        setSearchQuery(searchInput);
    }
};

     return (
        <div className={styles.booksList}>
            <div className={styles.searchBar}>
                <select aria-label="search by">
                    <option value="all">All</option>
                    <option value="title">Title</option>
                    <option value="genre">Genre</option>
                    <option value="author">Author(s)</option>
                </select>

                <input
                    name="title"
                    type="text"
                    placeholder="Search Titles"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

            <div className={styles.container}>
                <Book searchQuery={searchQuery} 
                page={page} 
                setPage={setPage}
                />
            </div>
        </div>
    );
};

export default BooksList;