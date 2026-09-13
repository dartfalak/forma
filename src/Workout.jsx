import React, { useState, useEffect } from "react";
import "./Workout.css";

function Workout({
  user,
  theme,
  onNavigate,
  onNavigateHome,
  onWorkoutSaved
}) {
  const exercises = [
    {
      id: 1,
      name: "Barbell Bench Press",
      muscle: "Chest",
      sets: 4,
      reps: 10,
      weight: 60
    },
    {
      id: 2,
      name: "Shoulder Press",
      muscle: "Shoulders",
      sets: 3,
      reps: 12,
      weight: 35
    },
    {
      id: 3,
      name: "Incline Dumbbell Press",
      muscle: "Upper Chest",
      sets: 3,
      reps: 10,
      weight: 22
    },
    {
      id: 4,
      name: "Bicep Curls",
      muscle: "Biceps",
      sets: 3,
      reps: 12,
      weight: 14
    },
    {
      id: 5,
      name: "Tricep Pushdown",
      muscle: "Triceps",
      sets: 3,
      reps: 12,
      weight: 25
    }
  ];

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const [completedSets, setCompletedSets] = useState(() => {
    const saved = localStorage.getItem("forma-active-workout-sets");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }

    return {};
  });

  const [workoutSeconds, setWorkoutSeconds] = useState(() => {
    const saved = localStorage.getItem("forma-active-workout-time");
    return saved ? Number(saved) : 0;
  });

  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false);

  const [restSeconds, setRestSeconds] = useState(60);
  const [isResting, setIsResting] = useState(false);

  const [workoutFinished, setWorkoutFinished] = useState(false);

  const [finishMessage, setFinishMessage] = useState("");

  const currentExercise = exercises[currentExerciseIndex];

  const completedExerciseCount = exercises.filter((exercise) => {
    const sets = completedSets[exercise.id] || [];
    return sets.filter(Boolean).length === exercise.sets;
  }).length;

  const totalSets = exercises.reduce(
    (total, exercise) => total + exercise.sets,
    0
  );

  const completedSetCount = Object.values(completedSets).reduce(
    (total, sets) => {
      return total + sets.filter(Boolean).length;
    },
    0
  );

  const workoutProgress =
    totalSets === 0
      ? 0
      : Math.round((completedSetCount / totalSets) * 100);

  const currentExerciseSets =
    completedSets[currentExercise.id] || [];

  const currentExerciseCompleted =
    currentExerciseSets.filter(Boolean).length;

  useEffect(() => {
    localStorage.setItem(
      "forma-active-workout-sets",
      JSON.stringify(completedSets)
    );
  }, [completedSets]);

  useEffect(() => {
    localStorage.setItem(
      "forma-active-workout-time",
      workoutSeconds.toString()
    );
  }, [workoutSeconds]);

  useEffect(() => {
    if (!isWorkoutRunning) {
      return;
    }

    const timer = setInterval(() => {
      setWorkoutSeconds((previous) => previous + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isWorkoutRunning]);

  useEffect(() => {
    if (!isResting) {
      return;
    }

    if (restSeconds <= 0) {
      setIsResting(false);
      setRestSeconds(60);
      return;
    }

    const timer = setInterval(() => {
      setRestSeconds((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restSeconds]);

  const toggleSet = (setIndex) => {
    setCompletedSets((previous) => {
      const existingSets = previous[currentExercise.id] || [];

      const updatedSets = [...existingSets];

      updatedSets[setIndex] = !updatedSets[setIndex];

      return {
        ...previous,
        [currentExercise.id]: updatedSets
      };
    });
  };

  const nextExercise = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((previous) => previous + 1);
    }
  };

  const previousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((previous) => previous - 1);
    }
  };

  const startRest = () => {
    setRestSeconds(60);
    setIsResting(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric"
      }
    );
  };

  const finishWorkout = () => {
    if (completedSetCount === 0) {
      setFinishMessage(
        "Complete at least one set before finishing your workout."
      );
      return;
    }

    setIsWorkoutRunning(false);

    const userId = user?.id || "guest";

    const historyKey = `forma-workout-history-${userId}`;

    const savedHistory = localStorage.getItem(historyKey);

    let history = [];

    if (savedHistory) {
      try {
        history = JSON.parse(savedHistory);
      } catch {
        history = [];
      }
    }

    const workout = {
      id: Date.now(),
      userId,
      name: "Upper Body",
      type: "Strength",
      date: new Date().toISOString(),
      duration: workoutSeconds,
      durationMinutes: Math.max(
        1,
        Math.round(workoutSeconds / 60)
      ),
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        muscle: exercise.muscle,
        plannedSets: exercise.sets,
        completedSets: (
          completedSets[exercise.id] || []
        ).filter(Boolean).length,
        reps: exercise.reps,
        weight: exercise.weight
      })),
      totalSets,
      completedSets: completedSetCount,
      completionPercentage: workoutProgress
    };

    history.unshift(workout);

    localStorage.setItem(
      historyKey,
      JSON.stringify(history)
    );

    setWorkoutFinished(true);

    setFinishMessage(
      `Workout completed — ${completedSetCount} of ${totalSets} sets recorded.`
    );

    if (onWorkoutSaved) {
      onWorkoutSaved();
    }
  };

  const resetWorkout = () => {
    const confirmed = window.confirm(
      "Reset this workout? Your current progress will be lost."
    );

    if (!confirmed) {
      return;
    }

    setCompletedSets({});
    setWorkoutSeconds(0);
    setCurrentExerciseIndex(0);
    setIsWorkoutRunning(false);
    setWorkoutFinished(false);
    setFinishMessage("");

    localStorage.removeItem(
      "forma-active-workout-sets"
    );

    localStorage.removeItem(
      "forma-active-workout-time"
    );
  };

  return (
    <div className={`workout-page ${theme}-theme`}>

      <nav className="workout-navbar">

        <div
          className="workout-logo"
          onClick={onNavigateHome}
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

          <button
            className="workout-nav-button nav-active"
            onClick={() => onNavigate("workout")}
          >
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
              ?.split(" ")[0]
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>
        </div>

      </nav>

      <main className="workout-content">

        <header className="workout-header">

          <div>

            <div className="workout-status">
              <span></span>
              TRAINING SESSION
            </div>

            <h1>
              Upper Body<span>.</span>
            </h1>

            <p>
              Build strength through focused chest,
              shoulder, and arm training.
            </p>

          </div>

        </header>

        <section className="workout-timer-card">

          <div>
            <span>SESSION TIME</span>

            <strong>
              {formatTime(workoutSeconds)}
            </strong>
          </div>

          <div className="workout-timer-actions">

            <button
              onClick={() =>
                setIsWorkoutRunning(
                  (previous) => !previous
                )
              }
            >
              {isWorkoutRunning ? "Pause" : "Start"}
            </button>

            <button onClick={resetWorkout}>
              Reset
            </button>

          </div>

        </section>

        <section className="workout-overview">

          <div className="workout-overview-card">
            <span>TYPE</span>
            <strong>Strength</strong>
          </div>

          <div className="workout-overview-card">
            <span>TARGET</span>
            <strong>45 min</strong>
          </div>

          <div className="workout-overview-card">
            <span>EXERCISES</span>
            <strong>{exercises.length}</strong>
          </div>

          <div className="workout-overview-card">
            <span>PROGRESS</span>
            <strong>{workoutProgress}%</strong>
          </div>

        </section>

        <div className="workout-layout">

          <section className="exercise-tracker">

            <div className="exercise-heading">

              <div>
                <span>
                  EXERCISE {currentExerciseIndex + 1} /{" "}
                  {exercises.length}
                </span>

                <h2>
                  {currentExercise.name}
                </h2>

                <p>
                  {currentExercise.muscle}
                </p>
              </div>

              <strong>
                {currentExerciseCompleted}/
                {currentExercise.sets}
              </strong>

            </div>

            <div className="exercise-details">

              <div>
                <span>SETS</span>
                <strong>
                  {currentExercise.sets}
                </strong>
              </div>

              <div>
                <span>REPS</span>
                <strong>
                  {currentExercise.reps}
                </strong>
              </div>

              <div>
                <span>WEIGHT</span>
                <strong>
                  {currentExercise.weight} kg
                </strong>
              </div>

            </div>

            <div className="set-tracker">

              {Array.from({
                length: currentExercise.sets
              }).map((_, index) => (

                <button
                  key={index}
                  className={
                    currentExerciseSets[index]
                      ? "set-complete"
                      : ""
                  }
                  onClick={() =>
                    toggleSet(index)
                  }
                >
                  <span>SET {index + 1}</span>

                  <strong>
                    {currentExerciseSets[index]
                      ? "✓"
                      : currentExercise.reps}
                  </strong>
                </button>

              ))}

            </div>

            <div className="exercise-progress">

              <div>
                <span>
                  CURRENT EXERCISE
                </span>

                <strong>
                  {Math.round(
                    (currentExerciseCompleted /
                      currentExercise.sets) *
                      100
                  )}
                  %
                </strong>
              </div>

              <div className="progress-track">
                <div
                  style={{
                    width: `${
                      (currentExerciseCompleted /
                        currentExercise.sets) *
                      100
                    }%`
                  }}
                ></div>
              </div>

            </div>

            <div className="exercise-navigation">

              <button
                onClick={previousExercise}
                disabled={currentExerciseIndex === 0}
              >
                ← Previous
              </button>

              <button
                onClick={nextExercise}
                disabled={
                  currentExerciseIndex ===
                  exercises.length - 1
                }
              >
                Next →
              </button>

            </div>

            <button
              className="finish-workout-button"
              onClick={finishWorkout}
              disabled={workoutFinished}
            >
              {workoutFinished
                ? "Workout Completed ✓"
                : "Finish Workout"}
            </button>

            {finishMessage && (
              <p className="workout-finish-message">
                {finishMessage}
              </p>
            )}

          </section>

          <aside className="workout-sidebar">

            <div className="rest-panel">

              <span>REST TIMER</span>

              <strong>
                {formatTime(restSeconds)}
              </strong>

              <button
                onClick={() =>
                  isResting
                    ? setIsResting(false)
                    : startRest()
                }
              >
                {isResting
                  ? "Stop Rest"
                  : "Start Rest"}
              </button>

            </div>

            <div className="tip-panel">

              <span>FORMA TIP</span>

              <p>
                Focus on controlled movement and
                consistent form. Quality reps always
                come before heavier weight.
              </p>

            </div>

            <div className="summary-panel">

              <span>SESSION SUMMARY</span>

              <div>
                <span>Exercises</span>
                <strong>
                  {completedExerciseCount}/
                  {exercises.length}
                </strong>
              </div>

              <div>
                <span>Sets</span>
                <strong>
                  {completedSetCount}/{totalSets}
                </strong>
              </div>

              <div>
                <span>Completion</span>
                <strong>
                  {workoutProgress}%
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {formatTime(workoutSeconds)}
                </strong>
              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
}

export default Workout;