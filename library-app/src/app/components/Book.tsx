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
        fetch("http://localhost:8080/api/books/search?query=the+lord+of+the+rings")
            .then(res => res.json())
            .then((data: Book[]) => setBooks(data))
            .catch(err => console.error("Failed to fetch books", err));


    }, []);

    const urlDisp = (props: Book) => {
        return props.thumbnail ?? "https://storage.needpix.com/rsynced_images/red-146613_1280.png";
    }

    return (
        <div className="bookcon">
            {books.map(book => (
                <Link href={`/books/${book.id}`} prefetch className="bookcard" key={book.id}>
                    <div className='image-container'>
                        <img src={urlDisp(book)} alt={`${book.title} cover`} />
                    </div>
                    <h2><strong>{book.title}</strong></h2>
                    <p>{book.author}</p>
                </Link>
            ))}
        </div>
    );
}
