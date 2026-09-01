
import React from "react";
import "./Dashboard.css"

function Dashboard() {
  return (
    <div className="dashboard">

      <nav className="dashboard-navbar">
        <div className="dashboard-logo">
          FORMA
        </div>

        <button className="logout-button">
          Sign Out
        </button>
      </nav>

      <main className="dashboard-content">

        <span className="dashboard-label">
          YOUR JOURNEY
        </span>

        <h1>
          Welcome to <span>FORMA.</span>
        </h1>

        <p>
          Train with purpose. Build consistency. Become stronger.
        </p>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <h3>Workout</h3>
            <p>
              Start your training and stay consistent.
            </p>
            <button>
              Start Workout
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Progress</h3>
            <p>
              Track your progress and see how far you've come.
            </p>
            <button>
              View Progress
            </button>
          </div>

          <div className="dashboard-card">
            <h3>Profile</h3>
            <p>
              Manage your personal information and goals.
            </p>
            <button>
              View Profile
            </button>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;