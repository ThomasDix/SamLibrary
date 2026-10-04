"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Book.module.css";

type Book = {
    isbn?: string;
    id: number;
    title: string;
    author: string;
    categories: string;
    thumbnail: string;
    publishYear: number;
    averageRating: number;
    openLibraryKey: string | null;
};

type BookSearchResponse = {
    books: Book[];
    page: number;
    limit: number;
    totalResults: number;
};


type BookProps = {
    searchQuery: string;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};


export default function BookResults({ searchQuery, page, setPage }: BookProps) {

    const [books, setBooks] = useState<Book[]>([]);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {

        if (!searchQuery.trim()) {
            setBooks([]);
            setTotalResults(0);
            return;
        }

    fetch(`http://localhost:8080/books/search?query=${encodeURIComponent(searchQuery)}&page=${page}&limit=12`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            return res.json();
        })
        .then((data: BookSearchResponse) => {
            setBooks(data.books);
            setTotalResults(data.totalResults);
        })
.catch(err => console.error("Failed to fetch books", err));
}, [searchQuery, page]);

const limit = 12;
const totalPages = Math.ceil(totalResults / limit);


    const urlDisp = (props: Book) => {
        return props.thumbnail ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vueR0dV-8LWMPHYqvYB_xB83b0d4lkQfiv2POxDoGa7odTy4UpSQfKDu&s=10";
    };


    const addBook = async (book: Book) => {
        try {
            const response = await fetch("http://localhost:8080/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
            });

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const newBook = await response.json();
            return newBook;

        } catch (error) {
            console.error("Failed to add book", error);
            throw error;
        }
    };

    return (
        <div className={styles.bookcon}>
            {books.map((book) => (
                <div className={styles.bookcard} key={book.openLibraryKey}>
                    <div className={styles.imagecontainer}>
                        <img className={styles.image} src={urlDisp(book)} alt={`${book.title} cover`} />
                    </div>
                    <h2><strong>{book.title}</strong></h2>
                    <p>{book.author}</p>
                    <button className={styles.button} onClick={() => addBook(book)}>
                        Add to Library
                    </button>
                </div>
            ))}

            <div className={styles.pagination}>
                <button className={styles.button}
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button className={styles.button}
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </button>

            </div>
        </div>
    );
}
