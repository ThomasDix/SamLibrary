import Image from "next/image";

import Navigation from '../components/Navigation'; // Nav

import styles from "./page.module.css";

import BooksList from "../components/BooksList";


export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.yer}>
          <Navigation /> {/* Navigation Bar */}
          <BooksList /> {/* BooksList container */}
          <p>My Books!</p>
        </div>
      </div>
    </div>
  );
}