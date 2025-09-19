import Image from "next/image";

import Navigation from '../components/Navigation'; // Nav

import './page.css';


export default function Home() {
  return (
    <div className="background">
      <div className="wrapper">
        <div className="yer">
          <Navigation /> {/* Navigation Bar */}
          <p>My Books!</p>
        </div>
      </div>
    </div>
  );
}