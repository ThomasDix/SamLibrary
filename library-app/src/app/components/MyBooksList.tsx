"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./BooksList.module.css";

type Book = {
id: number;
title: string;
author: string;
isbn?: string;
thumbnail?: string;
publishYear?: number;
openLibraryKey: string | null;
};

export default function MyBooksList() {

const [books, setBooks] = useState<Book[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {

    fetch("http://localhost:8080/books")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }

            return res.json();
        })
        .then((data: Book[]) => {
            setBooks(data);
        })
        .catch((err) => {
            console.error("Failed to fetch saved books:", err);
            setError("Failed to load your books.");
        })
        .finally(() => {
            setLoading(false);
        });

}, []);

const urlDisp = (book: Book) => {
    return book.thumbnail ??
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vueR0dV-8LWMPHYqvYB_xB83b0d4lkQfiv2POxDoGa7odTy4UpSQfKDu&s=10";
};

if (loading) {
    return <p>Loading your books...</p>;
}

if (error) {
    return <p>{error}</p>;
}

if (books.length === 0) {
    return <p>You haven't added any books yet.</p>;
}

return (
    <div className={styles.container}>

        {books.map((book) => (

            <div className={styles.bookcard} key={book.id}>

                <Link
                    href={`/books/${encodeURIComponent(book.openLibraryKey ?? "")}`}
                    prefetch
                >
                    <div className={styles.imagecontainer}>
                        <img
                            className={styles.image}
                            src={urlDisp(book)}
                            alt={`${book.title} cover`}
                        />
                    </div>

                    <h2>
                        <strong>{book.title}</strong>
                    </h2>

                    <p>{book.author}</p>
                </Link>

            </div>

        ))}

    </div>
);

}
