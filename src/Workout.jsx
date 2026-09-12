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

  const [currentExerciseIndex, setCurrentExerciseIndex] =
    useState(0);

  const [completedSets, setCompletedSets] = useState(() => {
    const saved = localStorage.getItem(
      "forma-workout-sets"
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }

    return {};
  });

  const [seconds, setSeconds] = useState(0);
  const [isWorkoutRunning, setIsWorkoutRunning] =
    useState(false);

  const [restSeconds, setRestSeconds] = useState(60);
  const [isResting, setIsResting] = useState(false);

  const currentExercise =
    exercises[currentExerciseIndex];

  const currentCompletedSets =
    completedSets[currentExercise.id] || [];

  const completedExerciseCount = exercises.filter(
    (exercise) => {
      const exerciseSets =
        completedSets[exercise.id] || [];

      return exerciseSets.length === exercise.sets;
    }
  ).length;

  const workoutProgress =
    exercises.length === 0
      ? 0
      : Math.round(
          (completedExerciseCount /
            exercises.length) *
            100
        );

  useEffect(() => {
    localStorage.setItem(
      "forma-workout-sets",
      JSON.stringify(completedSets)
    );
  }, [completedSets]);

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

  const toggleSet = (setNumber) => {
    setCompletedSets((current) => {
      const exerciseSets =
        current[currentExercise.id] || [];

      const updatedSets = exerciseSets.includes(
        setNumber
      )
        ? exerciseSets.filter(
            (set) => set !== setNumber
          )
        : [...exerciseSets, setNumber];

      return {
        ...current,
        [currentExercise.id]: updatedSets,
      };
    });
  };

  const nextExercise = () => {
    if (
      currentExerciseIndex <
      exercises.length - 1
    ) {
      setCurrentExerciseIndex(
        (current) => current + 1
      );
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(
        (current) => current - 1
      );
    }
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

    setCompletedSets({});
    setCurrentExerciseIndex(0);

    setRestSeconds(60);
    setIsResting(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(
      totalSeconds / 60
    );

    const remainingSeconds =
      totalSeconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(
      2,
      "0"
    )}`;
  };

  const currentExerciseProgress =
    Math.round(
      (currentCompletedSets.length /
        currentExercise.sets) *
        100
    );

  return (
    <div
      className={`workout-page ${theme}-theme`}
    >
      <nav className="workout-navbar">
        <div
          className="workout-logo"
          onClick={() =>
            onNavigate("dashboard")
          }
        >
          FORMA
        </div>

        <div className="workout-nav-center">
          <button
            className="workout-nav-button"
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Dashboard
          </button>

          <button className="workout-nav-button nav-active">
            Workout
          </button>

          <button
            className="workout-nav-button"
            onClick={() =>
              onNavigate("progress")
            }
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

            <strong>
              {formatTime(seconds)}
            </strong>

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
            <p>
              {completedExerciseCount} completed
            </p>
          </div>

          <div className="overview-card">
            <span>PROGRESS</span>
            <strong>{workoutProgress}%</strong>
            <p>Session completion</p>
          </div>
        </section>

        <section className="workout-layout">
          {/* SESSION TRACKER */}

          <div className="exercise-panel session-tracker">
            <div className="section-heading">
              <div>
                <span>SESSION TRACKER</span>
                <h2>Current Exercise</h2>
              </div>

              <span className="exercise-count">
                {String(
                  currentExerciseIndex + 1
                ).padStart(2, "0")}
                /
                {String(exercises.length).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>

            <div className="current-exercise-card">
              <span className="current-label">
                NOW TRAINING
              </span>

              <h3>
                {currentExercise.name}
              </h3>

              <p>
                {currentExercise.target}
              </p>
            </div>

            <div className="tracker-stats">
              <div className="tracker-stat">
                <span>SETS</span>

                <div className="set-buttons">
                  {Array.from(
                    {
                      length:
                        currentExercise.sets,
                    },
                    (_, index) => {
                      const setNumber =
                        index + 1;

                      const isCompleted =
                        currentCompletedSets.includes(
                          setNumber
                        );

                      return (
                        <button
                          key={setNumber}
                          className={`set-button ${
                            isCompleted
                              ? "set-completed"
                              : ""
                          }`}
                          onClick={() =>
                            toggleSet(setNumber)
                          }
                        >
                          {isCompleted
                            ? "✓"
                            : setNumber}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="tracker-info">
                <div>
                  <span>REPS</span>

                  <strong>
                    {currentExercise.reps}
                  </strong>
                </div>

                <div>
                  <span>WEIGHT</span>

                  <strong>
                    {currentExercise.weight}
                  </strong>
                </div>
              </div>
            </div>

            <div className="tracker-progress">
              <div className="tracker-progress-top">
                <span>
                  {currentCompletedSets.length} of{" "}
                  {currentExercise.sets} sets
                  completed
                </span>

                <strong>
                  {currentExerciseProgress}%
                </strong>
              </div>

              <div className="tracker-progress-bar">
                <div
                  style={{
                    width: `${currentExerciseProgress}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="exercise-navigation">
              <button
                className="previous-exercise"
                onClick={previousExercise}
                disabled={
                  currentExerciseIndex === 0
                }
              >
                ← Previous
              </button>

              <button
                className="next-exercise"
                onClick={nextExercise}
                disabled={
                  currentExerciseIndex ===
                  exercises.length - 1
                }
              >
                Next Exercise →
              </button>
            </div>

            <button
              className="finish-workout-button"
              onClick={finishWorkout}
            >
              Finish Workout
              <span>→</span>
            </button>
          </div>

          {/* SIDEBAR */}

          <aside className="workout-sidebar">
            <div className="rest-panel">
              <span className="sidebar-label">
                RECOVERY
              </span>

              <h2>Rest Timer</h2>

              <div className="rest-timer">
                {String(
                  Math.floor(restSeconds / 60)
                ).padStart(2, "0")}
                :
                {String(
                  restSeconds % 60
                ).padStart(2, "0")}
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
                {isResting
                  ? "Resting..."
                  : "Start 60s Rest"}
              </button>
            </div>

            <div className="tip-panel">
              <span className="sidebar-label">
                FORMA TIP
              </span>

              <h3>
                Focus on your form.
              </h3>

              <p>
                Controlled movements and proper
                technique are more important than
                lifting heavier.
              </p>
            </div>

            <div className="workout-summary">
              <span className="sidebar-label">
                SESSION SUMMARY
              </span>

              <div className="summary-row">
                <span>Completed</span>

                <strong>
                  {completedExerciseCount}/
                  {exercises.length}
                </strong>
              </div>

              <div className="summary-row">
                <span>Time</span>

                <strong>
                  {formatTime(seconds)}
                </strong>
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