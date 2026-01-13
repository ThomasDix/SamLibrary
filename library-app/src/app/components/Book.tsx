"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Book.Module.css";

type Book = {
    id: number;
    title: string;
    author: string;
    categories: string;
    thumbnail: string;
    description: string;
    publishYear: number;
    averageRating: number;
    userId: number | null;
};

export default function Book() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/books/search?query=he-who-fights-with-monsters")
            .then(res => res.json())
            .then((data: Book[]) => setBooks(data))
            .catch(err => console.error("Failed to fetch books", err));
    }, []);

    return (
        <div className="bookcon">
            {books.map(book => (
                <Link href={`/books/${book.id}`} prefetch className="bookcard" key={book.id}>
                    <div className='image-container'>
                        <img src={book.thumbnail} alt={`${book.title} cover`} />
                    </div>
                    <h2><strong>{book.title}</strong></h2>
                    <p>{book.author}</p>
                </Link>
            ))}
        </div>
    );
}
