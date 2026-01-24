import Image from "next/image";
import React from 'react';
import BooksList from '../components/BooksList';

import Navigation from '../components/Navigation'; // Nav

import './page.css';


export default function Home() {
  return (
    <div className="background">
      <div className="wrapper">
        <div className="yer">
          <Navigation /> {/* Navigation Bar */}
          <BooksList /> {/* BooksList container */}
          <h1>Library</h1>
          
        </div>
      </div>
    </div>
  );
}