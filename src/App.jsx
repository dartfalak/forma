import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

import Features from "./Features";
import About from "./About";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";
import Workout from "./Workout";
import Progress from "./Progress";

import formaRunner from "./assets/forma-runner.jpg";

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

        <div className="learn-more-header">

          <span className="section-label">
            THE FORMA EXPERIENCE
          </span>

          <h2>
            More than just
            <br />
            tracking workouts.
          </h2>

          <p>
            FORMA is designed to make training easier to
            understand, easier to track, and easier to stay
            consistent with.
          </p>

        </div>


        <div className="learn-more-content">

          
          <div className="learn-more-image">

            <img
              src={formaRunner}
              alt="Man training in a gym"
            />

          </div>


          
          <div className="learn-more-details">

            <div className="learn-item">

              <span className="learn-number">
                01
              </span>

              <div>
                <h3>
                  Track every workout
                </h3>

                <p>
                  Keep your exercises, sets, reps and
                  weights organized in one place so you
                  always know what you trained.
                </p>
              </div>

            </div>


            <div className="learn-item">

              <span className="learn-number">
                02
              </span>

              <div>
                <h3>
                  Build consistency
                </h3>

                <p>
                  Follow your weekly routine and build
                  momentum by showing up and completing
                  your planned sessions.
                </p>
              </div>

            </div>


            <div className="learn-item">

              <span className="learn-number">
                03
              </span>

              <div>
                <h3>
                  See your progress
                </h3>

                <p>
                  Your training history gives you a clear
                  picture of how much work you are putting
                  in over time.
                </p>
              </div>

            </div>


            <div className="learn-item">

              <span className="learn-number">
                04
              </span>

              <div>
                <h3>
                  Train with purpose
                </h3>

                <p>
                  Stop guessing what to do next. FORMA
                  gives your training a simple structure
                  without getting in the way.
                </p>
              </div>

            </div>

          </div>

        </div>



        <div className="learn-more-cta">

          <div>
            <span className="section-label">
              READY TO START?
            </span>

            <h3>
              Your next workout
              <br />
              starts here.
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