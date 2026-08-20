import React from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          BEAST<span>MODE</span>
        </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>

        <button className="nav-button">
          Get Started
        </button>

      </nav>

    
      <main className="hero">

        <div className="badge">
           Built for Stronger You
        </div>

        <h1>
          Train Hard.
          <br />
          Become Stronger.
        </h1>

        <p>
          Track your workouts, stay consistent, and reach your fitness
          goals with a simple gym experience built for you.
        </p>

        <div className="hero-buttons">

          <button className="primary-button">
            Start Free Trial
          </button>

          <button className="secondary-button">
            Learn More
          </button>

        </div>

      </main>

    </div>
  );
}

export default App;

// function App() {
//   console.log(supabase);

//   return (
//     <h1>hi</h1>
//   );

// }

// export default App;