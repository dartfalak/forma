import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

import Features from "./Features";
import About from "./About";
import Connect from "./Connect";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";
function App() {

  // Controls whether the Sign In / Sign Up modal is visible

  const [showAuth, setShowAuth] = useState(false);

  const [session, setSession] = useState(null);

  // Controls Light / Dark mode
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("forma-theme") || "dark";
  });


  // Save the selected theme
  useEffect(() => {
    localStorage.setItem("forma-theme", theme);
  }, [theme]);

  useEffect(() => {

  // Check if someone is already logged in
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  // Listen for login and logout
  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      setSession(session);
    }
  );

  return () => {
    listener.subscription.unsubscribe();
  };

}, []);


  // Open authentication modal
  const openAuth = () => {
    setShowAuth(true);
  };


  // Close authentication modal
  const closeAuth = () => {
    setShowAuth(false);
  };


  return (
    <div className={`app ${theme}-theme`}>

      <nav className="navbar">

        <div className="logo">
          FORMA
        </div>

<div className="nav-links">

  <a href="#features">
    Features
  </a>

  <a href="#about">
    About
  </a>

  <a href="#connect">
    Connect
  </a>

</div>

        {/* THEME TOGGLE */}
    <button
  className="theme-toggle"
  onClick={() =>
    setTheme(theme === "dark" ? "light" : "dark")
  }
  aria-label="Toggle light and dark mode"
>
  <span className="theme-icon">
    {theme === "dark" ? "☀" : "☾"}
  </span>
</button>

        {/* GET STARTED */}
        <button
          className="nav-button"
          onClick={openAuth}
        >
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

          <button
            className="primary-button"
            onClick={openAuth}
          >
            Start Free Trial
          </button>


          <button className="secondary-button">
            Learn More
          </button>

        </div>

      </main>


      {/* FEATURES */}

      <div id="features">
        <Features />
      </div>


    {/* ABOUT */}

<About />


{/* LET'S CONNECT */}

<Connect onGetStarted={openAuth} />


{/* AUTHENTICATION MODAL */}

{showAuth && (
<AuthModal
  onClose={closeAuth}
  theme={theme}
/>
)}
    </div>
  );
}


export default App;