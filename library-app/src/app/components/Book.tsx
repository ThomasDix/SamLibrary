"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "./Book.Module.css";

type Book = {
    bookId: number;
    title: string;
    authors: string;
    categories: string;
    thumbNail: string;
    description: string;
    publishedYear: number;
    averageRating: number;
    userId: number | null;
};

export default function Book() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then(res => res.json())
            .then((data: Book[]) => setBooks(data))
            .catch(err => console.error("Failed to fetch books", err));
    }, []);

    return (
        <div className="bookcon">
            {books.map(book => (
                <div className="bookcard" key={book.bookId}>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.authors}</p>
                    <p><strong>Category:</strong> {book.categories}</p>
                    <p><strong>Published:</strong> {book.publishedYear}</p>
                    <p>{book.description}</p>
                    <div className='image-container'>
                        <img src={book.thumbNail} alt={`${book.title} cover`} />
                    </div>
                </div>
            ))}
        </div>
    );
}
