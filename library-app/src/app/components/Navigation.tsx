import React from 'react';
import Link from "next/link"
import styles from "./Navigation.module.css";



const Navigation = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/main" passHref>
                <p className={styles.item}>Books</p>
            </Link>
            <Link href="/MyBooks" passHref>
                <p className={styles.item}>My Books</p>
            </Link>
            <Link href="/Wishlist" passHref>
                <p className={styles.item}>Wishlist</p>
            </Link>
            
        </nav>
    );
};

export default Navigation;