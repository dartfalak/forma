import React from "react";
import "./Dashboard.css";
import "./Progress.css";

function Progress({ user, theme, onNavigate }) {
  const recentWorkouts = [
    {
      name: "Upper Body",
      date: "Yesterday",
      duration: "48 min",
      type: "Strength",
    },
    {
      name: "Lower Body",
      date: "Aug 30",
      duration: "52 min",
      type: "Strength",
    },
    {
      name: "Full Body",
      date: "Aug 28",
      duration: "44 min",
      type: "Conditioning",
    },
    {
      name: "Upper Body",
      date: "Aug 26",
      duration: "46 min",
      type: "Strength",
    },
  ];

  return (
    <div className={`progress-page ${theme}-theme`}>
      <nav className="progress-navbar">

        <div
          className="progress-logo"
          onClick={() => onNavigate("dashboard")}
        >
          FORMA
        </div>

        <div className="progress-nav-center">

          <button
            className="progress-nav-button"
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>

          <button
            className="progress-nav-button"
            onClick={() => onNavigate("workout")}
          >
            Workout
          </button>

          <button className="progress-nav-button nav-active">
            Progress
          </button>

        </div>

        <div className="progress-nav-right">
          <div className="progress-profile-circle">
            {user?.user_metadata?.full_name
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>
        </div>

      </nav>

      <main className="progress-content">

        {/* PAGE HEADER */}
        <section className="progress-header">

          <div>

            <div className="progress-status">
              <span></span>
              PERFORMANCE OVERVIEW
            </div>

            <h1>
              Track your <span>progress.</span>
            </h1>

            <p>
              See how your consistency is building strength
              <br />
              and moving you closer to your goals.
            </p>

          </div>

          <div className="progress-period">
            <span>VIEWING</span>
            <strong>THIS MONTH</strong>
          </div>

        </section>


        {/* PROGRESS STATS */}
        <section className="progress-stats">

          <div className="progress-stat-card">
            <span>TOTAL WORKOUTS</span>
            <strong>16</strong>
            <p>+4 from last month</p>
          </div>

          <div className="progress-stat-card">
            <span>WORKOUT STREAK</span>
            <strong>12</strong>
            <p>Personal best</p>
          </div>

          <div className="progress-stat-card">
            <span>TIME TRAINED</span>
            <strong>13.4h</strong>
            <p>This month</p>
          </div>

          <div className="progress-stat-card">
            <span>CONSISTENCY</span>
            <strong>82%</strong>
            <p>Excellent consistency</p>
          </div>

        </section>


        {/* MONTHLY GOAL */}
        <section className="progress-goal-section">

          <div className="goal-panel">

            <div className="progress-panel-heading">

              <div>
                <span>MONTHLY GOAL</span>
                <h2>Consistency</h2>
              </div>

              <strong>80%</strong>

            </div>

            <div className="goal-circle">

              <div>
                <strong>16</strong>
                <span>of 20</span>
              </div>

            </div>

            <p>
              You're four workouts away from
              reaching your monthly target.
            </p>

            <div className="goal-bar">
              <div></div>
            </div>

          </div>

        </section>


        {/* RECENT WORKOUTS */}
        <section className="history-panel progress-history-full">

          <div className="progress-panel-heading">

            <div>
              <span>ACTIVITY LOG</span>
              <h2>Recent Workouts</h2>
            </div>

          </div>

          <div className="history-list">

            {recentWorkouts.map((workout, index) => (

              <div
                className="history-item"
                key={index}
              >

                <div className="history-icon">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="history-info">

                  <h3>{workout.name}</h3>

                  <span>
                    {workout.type} · {workout.date}
                  </span>

                </div>

                <strong>
                  {workout.duration}
                </strong>

              </div>

            ))}

          </div>

        </section>

      </main>
    </div>
  );
}

export default Progress;