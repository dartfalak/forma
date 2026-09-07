import React from "react";
import "./Dashboard.css";
import "./Progress.css";

function Progress({ theme, onNavigate }) {

  return (
    <div className={`dashboard ${theme}-theme`}>

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          FORMA
        </div>

        <div className="dashboard-nav-center">

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("workout")
            }
          >
            Workout
          </button>

          <button
            type="button"
            className="dashboard-nav-button nav-active"
            onClick={() =>
              onNavigate("progress")
            }
          >
            Progress
          </button>

        </div>

        <div className="dashboard-nav-right">

          <button
            className="logout-button"
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Back
          </button>

        </div>

      </nav>

      <main className="dashboard-content progress-page">

        <div className="progress-page-header">

          <div className="dashboard-status">
            <span className="status-dot"></span>
            YOUR PROGRESS
          </div>

          <h1>
            Keep building.
          </h1>

          <p>
            A quick look at how consistently
            you've been training.
          </p>

        </div>

        <section className="progress-overview">

          <div className="progress-overview-card">

            <span>
              WEEKLY PROGRESS
            </span>

            <strong>
              78%
            </strong>

            <p>
              4 of 5 workouts completed
            </p>

          </div>

          <div className="progress-overview-card">

            <span>
              WORKOUT STREAK
            </span>

            <strong>
              12
            </strong>

            <p>
              consecutive days
            </p>

          </div>

          <div className="progress-overview-card">

            <span>
              THIS MONTH
            </span>

            <strong>
              16
            </strong>

            <p>
              workouts completed
            </p>

          </div>

        </section>

        <section className="progress-week-card">

          <div className="progress-week-heading">

            <div>
              <span>
                CONSISTENCY
              </span>

              <h2>
                This week
              </h2>
            </div>

            <strong>
              4 / 5
            </strong>

          </div>

          <div className="progress-week-bar">

            <div className="progress-week-fill"></div>

          </div>

          <div className="progress-week-days">

            <span className="completed">
              M
            </span>

            <span className="completed">
              T
            </span>

            <span className="completed">
              W
            </span>

            <span className="completed">
              T
            </span>

            <span className="current">
              F
            </span>

            <span>
              S
            </span>

            <span>
              S
            </span>

          </div>

        </section>

        <button
          className="progress-back-button"
          onClick={() =>
            onNavigate("dashboard")
          }
        >
          Back to Dashboard
          <span>→</span>
        </button>

      </main>

    </div>
  );
}

export default Progress;