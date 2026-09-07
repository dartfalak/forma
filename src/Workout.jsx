import React, { useState } from "react";
import "./Dashboard.css";
import "./Workout.css";

function Workout({ theme, onNavigate }) {

  const [started, setStarted] = useState(false);

  const exercises = [
    {
      name: "Bench Press",
      sets: "3 sets · 10 reps"
    },
    {
      name: "Shoulder Press",
      sets: "3 sets · 10 reps"
    },
    {
      name: "Dumbbell Row",
      sets: "3 sets · 12 reps"
    },
    {
      name: "Biceps Curl",
      sets: "3 sets · 12 reps"
    }
  ];

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
            className="dashboard-nav-button nav-active"
            onClick={() =>
              onNavigate("workout")
            }
          >
            Workout
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
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

      <main className="dashboard-content workout-page">

        <div className="workout-page-header">

          <div className="dashboard-status">
            <span className="status-dot"></span>
            TODAY'S WORKOUT
          </div>

          <h1>
            Upper Body
          </h1>

          <p>
            A simple strength session focused on
            chest, shoulders, and arms.
          </p>

        </div>

        <section className="workout-card">

          <div className="workout-card-top">

            <div>
              <span>
                STRENGTH
              </span>

              <h2>
                45 min
              </h2>
            </div>

            <span className="workout-count">
              {exercises.length} exercises
            </span>

          </div>

          <div className="exercise-list">

            {exercises.map((exercise, index) => (

              <div
                className="exercise-row"
                key={exercise.name}
              >

                <span className="exercise-number">
                  0{index + 1}
                </span>

                <div className="exercise-info">

                  <strong>
                    {exercise.name}
                  </strong>

                  <span>
                    {exercise.sets}
                  </span>

                </div>

              </div>

            ))}

          </div>

          <button
            className="workout-start-button"
            onClick={() =>
              setStarted(true)
            }
          >
            {started
              ? "Workout Started"
              : "Start Workout"}

            <span>
              {started ? "✓" : "→"}
            </span>
          </button>

        </section>

      </main>

    </div>
  );
}

export default Workout;