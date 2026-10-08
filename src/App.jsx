import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

import Features from "./Features";
import About from "./About";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";
import Workout from "./Workout";
import Progress from "./Progress";

function getDashboardPageFromHash() {
  if (window.location.hash === "#workout") {
    return "workout";
  }

  if (window.location.hash === "#progress") {
    return "progress";
  }

  return "dashboard";
}

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [dashboardPage, setDashboardPage] = useState(
    getDashboardPageFromHash()
  );

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("forma-theme") || "dark";
  });

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    localStorage.setItem("forma-theme", theme);
  }, [theme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);

      const currentHash = window.location.hash;

      if (
        data.session &&
        (currentHash === "#dashboard" ||
          currentHash === "#workout" ||
          currentHash === "#progress")
      ) {
        setShowDashboard(true);
        setDashboardPage(getDashboardPageFromHash());
      }

      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);

        if (event === "SIGNED_IN") {
          setShowDashboard(true);
          setDashboardPage("dashboard");

          window.history.pushState(
            { page: "dashboard" },
            "",
            "#dashboard"
          );
        }

        if (event === "SIGNED_OUT") {
          setShowDashboard(false);
          setDashboardPage("dashboard");

          window.history.replaceState(
            null,
            "",
            window.location.pathname + "#home"
          );
        }
      }
    );

    const handlePopState = () => {
      const page = getDashboardPageFromHash();

      if (
        window.location.hash === "#dashboard" ||
        window.location.hash === "#workout" ||
        window.location.hash === "#progress"
      ) {
        setDashboardPage(page);
        setShowDashboard(true);
      } else {
        setShowDashboard(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openAuth = () => {
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
  };

  const navigateDashboard = (page) => {
    const validPages = ["dashboard", "workout", "progress"];

    if (!validPages.includes(page)) {
      return;
    }

    setDashboardPage(page);
    setShowDashboard(true);

    const nextHash = `#${page}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(
        { page },
        "",
        nextHash
      );
    }

    window.scrollTo(0, 0);
  };

  const navigateHome = () => {
    setShowDashboard(false);
    setDashboardPage("dashboard");

    window.history.pushState(
      null,
      "",
      window.location.pathname + "#home"
    );

    window.scrollTo(0, 0);
  };

  const handleWorkoutSaved = () => {
    setDataVersion((previous) => previous + 1);
  };

  if (authLoading) {
    return null;
  }

  if (session && showDashboard) {
    if (dashboardPage === "workout") {
      return (
        <Workout
          user={session.user}
          theme={theme}
          onNavigate={navigateDashboard}
          onNavigateHome={navigateHome}
          onWorkoutSaved={handleWorkoutSaved}
        />
      );
    }

    if (dashboardPage === "progress") {
      return (
        <Progress
          user={session.user}
          theme={theme}
          onNavigate={navigateDashboard}
          onNavigateHome={navigateHome}
          dataVersion={dataVersion}
        />
      );
    }

    return (
      <Dashboard
        user={session.user}
        theme={theme}
        onNavigate={navigateDashboard}
        onNavigateHome={navigateHome}
        dataVersion={dataVersion}
      />
    );
  }

  return (
    <div className={`app ${theme}-theme`}>

      {/* NAVBAR */}
      <nav className="navbar">

        <div
          className="logo"
          onClick={() => {
            window.location.hash = "#home";
            window.scrollTo(0, 0);
          }}
        >
          FORMA
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#learn-more">Learn More</a>
        </div>

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

        <button
          className="nav-button"
          onClick={openAuth}
        >
          Get Started
        </button>

      </nav>



      <main
        className="hero"
        id="home"
      >
        <div className="badge">
          Built for a Stronger You
        </div>

        <h1>
          Train Hard.
          <br />
          Become Stronger.
        </h1>

        <p>
          Track your workouts, stay consistent,
          and reach your fitness goals with a
          simple gym experience built for you.
        </p>

        <div className="hero-buttons">

          <button
            className="primary-button"
            onClick={openAuth}
          >
            Start Free Trial
          </button>

          <button
            className="secondary-button"
            onClick={() => {
              document
                .getElementById("learn-more")
                ?.scrollIntoView({
                  behavior: "smooth"
                });
            }}
          >
            Learn More
          </button>

        </div>
      </main>


      
      <div id="features">
        <Features />
      </div>


    
      <About />



      <section
        className="learn-more-section"
        id="learn-more"
      >

        <div className="learn-more-heading">

          <span className="learn-more-label">
            WHY FORMA
          </span>

          <h2>
            Built around
            <br />
            your training.
          </h2>

          <p>
            FORMA keeps your fitness journey simple.
            Track what you do, understand your progress,
            and stay focused on showing up consistently.
          </p>

        </div>


        <div className="learn-more-grid">

          <div className="learn-more-point">

            <span className="learn-more-number">
              01
            </span>

            <div>
              <h3>
                Keep your workouts organized
              </h3>

              <p>
                Have your exercises, sets, reps and
                weights in one place instead of relying
                on memory or scattered notes.
              </p>
            </div>

          </div>


          <div className="learn-more-point">

            <span className="learn-more-number">
              02
            </span>

            <div>
              <h3>
                Build a consistent routine
              </h3>

              <p>
                Follow your weekly training schedule
                and keep track of the sessions you
                actually complete.
              </p>
            </div>

          </div>


          <div className="learn-more-point">

            <span className="learn-more-number">
              03
            </span>

            <div>
              <h3>
                Understand your progress
              </h3>

              <p>
                Your progress page turns your workout
                history into a simple picture of how
                consistently you have been training.
              </p>
            </div>

          </div>


          <div className="learn-more-point">

            <span className="learn-more-number">
              04
            </span>

            <div>
              <h3>
                Focus on getting stronger
              </h3>

              <p>
                FORMA gives you the structure to train
                with purpose without overwhelming you
                with unnecessary features.
              </p>
            </div>

          </div>

        </div>


        
        <div className="learn-more-bottom">

          <div>

            <span className="learn-more-label">
              START TRAINING
            </span>

            <h3>
              Make your next
              <br />
              workout count.
            </h3>

          </div>

          <button
            className="primary-button"
            onClick={openAuth}
          >
            Get Started
          </button>

        </div>

      </section>


  
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