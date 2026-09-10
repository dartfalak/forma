import React, { useState, useEffect } from "react";
import "./Workout.css";

function Workout({ user, theme, onNavigate }) {
  const exercises = [
    {
      id: 1,
      name: "Barbell Bench Press",
      target: "Chest",
      sets: 4,
      reps: 10,
      weight: "60 kg",
    },
    {
      id: 2,
      name: "Shoulder Press",
      target: "Shoulders",
      sets: 3,
      reps: 12,
      weight: "35 kg",
    },
    {
      id: 3,
      name: "Incline Dumbbell Press",
      target: "Upper Chest",
      sets: 3,
      reps: 10,
      weight: "22 kg",
    },
    {
      id: 4,
      name: "Bicep Curls",
      target: "Biceps",
      sets: 3,
      reps: 12,
      weight: "14 kg",
    },
    {
      id: 5,
      name: "Tricep Pushdown",
      target: "Triceps",
      sets: 3,
      reps: 12,
      weight: "25 kg",
    },
  ];

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem("forma-workout-completed");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [seconds, setSeconds] = useState(0);
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false);
  const [restSeconds, setRestSeconds] = useState(60);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "forma-workout-completed",
      JSON.stringify(completed)
    );
  }, [completed]);

  useEffect(() => {
    let timer;

    if (isWorkoutRunning) {
      timer = setInterval(() => {
        setSeconds((current) => current + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isWorkoutRunning]);

  useEffect(() => {
    let timer;

    if (isResting && restSeconds > 0) {
      timer = setInterval(() => {
        setRestSeconds((current) => current - 1);
      }, 1000);
    }

    if (restSeconds === 0) {
      setIsResting(false);
      setRestSeconds(60);
    }

    return () => clearInterval(timer);
  }, [isResting, restSeconds]);

  const toggleExercise = (id) => {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current.filter((exerciseId) => exerciseId !== id);
      }

      return [...current, id];
    });
  };

  const startWorkout = () => {
    setIsWorkoutRunning(true);
  };

  const pauseWorkout = () => {
    setIsWorkoutRunning(false);
  };

  const finishWorkout = () => {
    setIsWorkoutRunning(false);
  };

  const startRest = () => {
    setRestSeconds(60);
    setIsResting(true);
  };

  const resetWorkout = () => {
    setIsWorkoutRunning(false);
    setSeconds(0);
    setCompleted([]);
    setRestSeconds(60);
    setIsResting(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const completedCount = completed.length;

  const workoutProgress =
    exercises.length === 0
      ? 0
      : Math.round((completedCount / exercises.length) * 100);

  return (
    <div className={`workout-page ${theme}-theme`}>
      <nav className="workout-navbar">
        <div
          className="workout-logo"
          onClick={() => onNavigate("dashboard")}
        >
          FORMA
        </div>

        <div className="workout-nav-center">
          <button
            className="workout-nav-button"
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>

          <button className="workout-nav-button nav-active">
            Workout
          </button>

          <button
            className="workout-nav-button"
            onClick={() => onNavigate("progress")}
          >
            Progress
          </button>
        </div>

        <div className="workout-nav-right">
          <div className="workout-profile-circle">
            {user?.user_metadata?.full_name
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>
        </div>
      </nav>

      <main className="workout-content">
        <section className="workout-header">
          <div>
            <div className="workout-status">
              <span className="workout-status-dot"></span>
              TRAINING SESSION
            </div>

            <h1>
              Upper <span>Body.</span>
            </h1>

            <p>
              Build strength, improve your form and
              <br />
              stay consistent with today's session.
            </p>
          </div>

          <div className="workout-timer-card">
            <span>WORKOUT TIME</span>

            <strong>{formatTime(seconds)}</strong>

            <div className="timer-controls">
              {!isWorkoutRunning ? (
                <button onClick={startWorkout}>
                  Start
                </button>
              ) : (
                <button onClick={pauseWorkout}>
                  Pause
                </button>
              )}

              <button
                className="timer-reset"
                onClick={resetWorkout}
              >
                Reset
              </button>
            </div>
          </div>
        </section>

        <section className="workout-overview">
          <div className="overview-card">
            <span>WORKOUT TYPE</span>
            <strong>Strength</strong>
            <p>Upper body focus</p>
          </div>

          <div className="overview-card">
            <span>DURATION</span>
            <strong>45 min</strong>
            <p>Estimated session</p>
          </div>

          <div className="overview-card">
            <span>EXERCISES</span>
            <strong>{exercises.length}</strong>
            <p>{completedCount} completed</p>
          </div>

          <div className="overview-card">
            <span>PROGRESS</span>
            <strong>{workoutProgress}%</strong>
            <p>Session completion</p>
          </div>
        </section>

        <section className="workout-layout">
          <div className="exercise-panel">
            <div className="section-heading">
              <div>
                <span>TODAY'S PLAN</span>
                <h2>Exercises</h2>
              </div>

              <span className="exercise-count">
                {completedCount}/{exercises.length}
              </span>
            </div>

            <div className="exercise-list">
              {exercises.map((exercise, index) => {
                const isCompleted = completed.includes(exercise.id);

                return (
                  <div
                    className={`exercise-card ${
                      isCompleted ? "exercise-completed" : ""
                    }`}
                    key={exercise.id}
                  >
                    <div className="exercise-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="exercise-info">
                      <h3>{exercise.name}</h3>

                      <span>{exercise.target}</span>
                    </div>

                    <div className="exercise-details">
                      <div>
                        <small>SETS</small>
                        <strong>{exercise.sets}</strong>
                      </div>

                      <div>
                        <small>REPS</small>
                        <strong>{exercise.reps}</strong>
                      </div>

                      <div>
                        <small>WEIGHT</small>
                        <strong>{exercise.weight}</strong>
                      </div>
                    </div>

                    <button
                      className="exercise-check"
                      onClick={() =>
                        toggleExercise(exercise.id)
                      }
                    >
                      {isCompleted ? "✓" : "○"}
                    </button>
                  </div>
                );
              })}
            </div>

            <button
              className="finish-workout-button"
              onClick={finishWorkout}
            >
              Finish Workout
              <span>→</span>
            </button>
          </div>

          <aside className="workout-sidebar">
            <div className="rest-panel">
              <span className="sidebar-label">RECOVERY</span>

              <h2>Rest Timer</h2>

              <div className="rest-timer">
                {String(Math.floor(restSeconds / 60)).padStart(
                  2,
                  "0"
                )}
                :
                {String(restSeconds % 60).padStart(2, "0")}
              </div>

              <p>
                Take your time between sets.
                <br />
                Quality over speed.
              </p>

              <button
                className="rest-button"
                onClick={startRest}
              >
                {isResting ? "Resting..." : "Start 60s Rest"}
              </button>
            </div>

            <div className="tip-panel">
              <span className="sidebar-label">FORMA TIP</span>

              <h3>Focus on your form.</h3>

              <p>
                Controlled movements and proper technique
                are more important than lifting heavier.
              </p>
            </div>

            <div className="workout-summary">
              <span className="sidebar-label">
                SESSION SUMMARY
              </span>

              <div className="summary-row">
                <span>Completed</span>
                <strong>
                  {completedCount}/{exercises.length}
                </strong>
              </div>

              <div className="summary-row">
                <span>Time</span>
                <strong>{formatTime(seconds)}</strong>
              </div>

              <div className="summary-progress">
                <div
                  style={{
                    width: `${workoutProgress}%`,
                  }}
                ></div>
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

export default Workout;