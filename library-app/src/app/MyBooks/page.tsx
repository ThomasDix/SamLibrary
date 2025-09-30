import Image from "next/image";

import Navigation from '../components/Navigation'; // Nav

import './page.css';
import BooksList from "../components/BooksList";


export default function Home() {
  return (
    <div className="background">
      <div className="wrapper">
        <div className="yer">
          <Navigation /> {/* Navigation Bar */}
          <BooksList /> {/* BooksList container */}
          <p>My Books!</p>
        </div>
      </div>
    </div>
  );
}