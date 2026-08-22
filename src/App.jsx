import React from "react";
import { supabase } from "./supabaseClient";
import "./App.css";
import Features from "./Features";
import About from "./About";


function App() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          FORMA
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
          Built for a Stronger You
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
<Features />
<About />
    </div>
  );
}

export default App;
