"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./BooksList.module.css";

type Book = {
    id: number;
    title: string;
    author: string;
    isbn?: string;
    thumbnail?: string | null;
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
        return (
            book.thumbnail ??
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vueR0dV-8LWMPMPHYqvYB_xB83b0d4lkQfiv2POxDoGa7odTy4UpSQfKDu&s=10"
        );
    };

    const removeBook = async (book: Book) => {
        if (!book.openLibraryKey) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/books/by-key?openLibraryKey=${encodeURIComponent(
                    book.openLibraryKey
                )}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            // Remove the book from the My Books page immediately
            setBooks((currentBooks) =>
                currentBooks.filter(
                    (currentBook) =>
                        currentBook.openLibraryKey !== book.openLibraryKey
                )
            );
        } catch (error) {
            console.error("Failed to remove book:", error);
        }
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
                        href={`/books/${encodeURIComponent(
                            book.openLibraryKey ?? ""
                        )}`}
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

                    <button
                        className={styles.button}
                        onClick={() => removeBook(book)}
                    >
                        Remove from Library
                    </button>
                </div>
            ))}
        </div>
    );
}

