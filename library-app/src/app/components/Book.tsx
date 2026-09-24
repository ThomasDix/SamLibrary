"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Book.module.css";

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

type BookProps = {
    searchQuery: string;
};

export default function Book({ searchQuery }: BookProps) {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {

         if (!searchQuery.trim()) {
        setBooks([]);
        return;
    }

    fetch(`http://localhost:8080/books/search?query=${encodeURIComponent(searchQuery)}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error: ${res.status}`);
            }
            return res.json();
        })
        .then((data: Book[]) => setBooks(data))
        .catch(err => console.error("Failed to fetch books", err));
}, [searchQuery]);



/*
    useEffect(() => {
        fetch("http://localhost:8080/books")
            .then(res => res.json())
            .then(setBooks);
        }, []);
*/

    const urlDisp = (props: Book) => {
        return props.thumbnail ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vueR0dV-8LWMPHYqvYB_xB83b0d4lkQfiv2POxDoGa7odTy4UpSQfKDu&s=10";
    };

    return (
        <div className={styles.bookcon}>
            {books.map(book => (
                <Link href={`/books/${book.id}`} prefetch className={styles.bookcard} key={book.id}>
                    <div className={styles.imagecontainer}>
                        <img className={styles.image} src={urlDisp(book)} alt={`${book.title} cover`} />
                    </div>
                    <h2><strong>{book.title}</strong></h2>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                </Link>
            ))}
        </div>
    );
}
