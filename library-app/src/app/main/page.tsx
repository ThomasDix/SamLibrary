import Image from "next/image";
import React from 'react';
import BooksList from '../components/BooksList';
import Navigation from '../components/Navigation'; // Nav
import styles from "./page.module.css";



export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.yer}>
          <Navigation /> {/* Navigation Bar */}
          <BooksList /> {/* BooksList container */}
          <h1>Library</h1>
        </div>
      </div>
    </div>
  );
}