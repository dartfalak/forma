import React, { useEffect, useState } from "react";
import "./Workout.css";

function Workout({
  user,
  theme,
  onNavigate,
  onNavigateHome,
  onWorkoutSaved
}) {
  const weekDays = [
    { short: "MON", name: "Monday" },
    { short: "TUE", name: "Tuesday" },
    { short: "WED", name: "Wednesday" },
    { short: "THU", name: "Thursday" },
    { short: "FRI", name: "Friday" },
    { short: "SAT", name: "Saturday" }
  ];

  const dayPlans = {
    Monday: {
      title: "Upper Body",
      description:
        "Build strength through focused chest, shoulder, and arm training.",
      muscles: ["Chest", "Shoulders", "Arms"],
      exercises: [
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
      ]
    },

    Tuesday: {
      title: "Lower Body",
      description:
        "Build strength and stability through focused lower-body training.",
      muscles: ["Quads", "Hamstrings", "Glutes"],
      exercises: [
        {
          id: 1,
          name: "Barbell Squat",
          muscle: "Quadriceps",
          sets: 4,
          reps: 8,
          weight: 80
        },
        {
          id: 2,
          name: "Romanian Deadlift",
          muscle: "Hamstrings",
          sets: 3,
          reps: 10,
          weight: 60
        },
        {
          id: 3,
          name: "Walking Lunges",
          muscle: "Glutes",
          sets: 3,
          reps: 12,
          weight: 18
        },
        {
          id: 4,
          name: "Leg Press",
          muscle: "Quadriceps",
          sets: 3,
          reps: 12,
          weight: 100
        },
        {
          id: 5,
          name: "Standing Calf Raises",
          muscle: "Calves",
          sets: 3,
          reps: 15,
          weight: 30
        }
      ]
    },

    Wednesday: {
      title: "Legs",
      description:
        "Build strength with focused training for the lower body and posterior chain.",
      muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"],
      exercises: [
        {
          id: 1,
          name: "Barbell Squat",
          muscle: "Quadriceps",
          sets: 4,
          reps: 8,
          weight: 80
        },
        {
          id: 2,
          name: "Romanian Deadlift",
          muscle: "Hamstrings",
          sets: 3,
          reps: 10,
          weight: 60
        },
        {
          id: 3,
          name: "Bulgarian Split Squat",
          muscle: "Glutes",
          sets: 3,
          reps: 10,
          weight: 18
        },
        {
          id: 4,
          name: "Leg Press",
          muscle: "Quadriceps",
          sets: 3,
          reps: 12,
          weight: 100
        },
        {
          id: 5,
          name: "Leg Curl",
          muscle: "Hamstrings",
          sets: 3,
          reps: 12,
          weight: 35
        },
        {
          id: 6,
          name: "Standing Calf Raises",
          muscle: "Calves",
          sets: 3,
          reps: 15,
          weight: 30
        }
      ]
    },

    Thursday: {
      title: "Push",
      description:
        "Train pressing strength with controlled chest, shoulder, and triceps work.",
      muscles: ["Chest", "Shoulders", "Triceps"],
      exercises: [
        {
          id: 1,
          name: "Bench Press",
          muscle: "Chest",
          sets: 4,
          reps: 8,
          weight: 60
        },
        {
          id: 2,
          name: "Incline Dumbbell Press",
          muscle: "Upper Chest",
          sets: 3,
          reps: 10,
          weight: 22
        },
        {
          id: 3,
          name: "Shoulder Press",
          muscle: "Shoulders",
          sets: 3,
          reps: 10,
          weight: 35
        },
        {
          id: 4,
          name: "Lateral Raises",
          muscle: "Shoulders",
          sets: 3,
          reps: 15,
          weight: 10
        },
        {
          id: 5,
          name: "Tricep Pushdown",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 25
        }
      ]
    },

    Friday: {
      title: "Pull",
      description:
        "Develop a stronger back and arms through controlled pulling movements.",
      muscles: ["Back", "Biceps", "Rear Delts"],
      exercises: [
        {
          id: 1,
          name: "Lat Pulldown",
          muscle: "Back",
          sets: 4,
          reps: 10,
          weight: 55
        },
        {
          id: 2,
          name: "Seated Cable Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 50
        },
        {
          id: 3,
          name: "Face Pulls",
          muscle: "Rear Delts",
          sets: 3,
          reps: 15,
          weight: 20
        },
        {
          id: 4,
          name: "Barbell Curls",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 25
        },
        {
          id: 5,
          name: "Hammer Curls",
          muscle: "Biceps",
          sets: 3,
          reps: 12,
          weight: 14
        }
      ]
    },

    Saturday: {
      title: "Full Body",
      description:
        "Finish the week with balanced full-body strength and controlled movement.",
      muscles: ["Full Body", "Core", "Conditioning"],
      exercises: [
        {
          id: 1,
          name: "Deadlift",
          muscle: "Full Body",
          sets: 4,
          reps: 6,
          weight: 100
        },
        {
          id: 2,
          name: "Goblet Squat",
          muscle: "Legs",
          sets: 3,
          reps: 12,
          weight: 24
        },
        {
          id: 3,
          name: "Dumbbell Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 22
        },
        {
          id: 4,
          name: "Push Ups",
          muscle: "Chest",
          sets: 3,
          reps: 15,
          weight: 0
        },
        {
          id: 5,
          name: "Plank",
          muscle: "Core",
          sets: 3,
          reps: 45,
          weight: 0
        }
      ]
    }
  };

  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long"
  });

  const initialDay = weekDays.some((day) => day.name === todayName)
    ? todayName
    : "Wednesday";

  const [selectedDay, setSelectedDay] = useState(initialDay);

  const currentPlan = dayPlans[selectedDay];
  const exercises = currentPlan.exercises;

  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem(
      `forma-workout-completed-${initialDay}`
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return [];
  });

  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("forma-active-workout-time");
    return saved ? Number(saved) : 0;
  });

  const [isWorkoutRunning, setIsWorkoutRunning] =
    useState(false);

  const [restSeconds, setRestSeconds] = useState(60);
  const [isResting, setIsResting] = useState(false);

  const [workoutFinished, setWorkoutFinished] =
    useState(false);

  const [finishMessage, setFinishMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(
      `forma-workout-completed-${selectedDay}`
    );

    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        setCompleted([]);
      }
    } else {
      setCompleted([]);
    }

    setWorkoutFinished(false);
    setFinishMessage("");
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(
      `forma-workout-completed-${selectedDay}`,
      JSON.stringify(completed)
    );
  }, [completed, selectedDay]);

  useEffect(() => {
    localStorage.setItem(
      "forma-active-workout-time",
      seconds.toString()
    );
  }, [seconds]);

  useEffect(() => {
    if (!isWorkoutRunning) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((current) => current + 1);
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
      setRestSeconds((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isResting, restSeconds]);

  const toggleExercise = (id) => {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current.filter(
          (exerciseId) => exerciseId !== id
        );
      }

      return [...current, id];
    });
  };

  const startWorkout = () => {
    setIsWorkoutRunning(true);
    setWorkoutFinished(false);
  };

  const pauseWorkout = () => {
    setIsWorkoutRunning(false);
  };

  const finishWorkout = () => {
    if (completed.length === 0) {
      setFinishMessage(
        "Complete at least one exercise before finishing your workout."
      );
      return;
    }

    setIsWorkoutRunning(false);

    const userId = user?.id || "guest";
    const historyKey = `forma-workout-history-${userId}`;

    const savedHistory =
      localStorage.getItem(historyKey);

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
      name: currentPlan.title,
      type: "Strength",
      day: selectedDay,
      date: new Date().toISOString(),
      duration: seconds,
      durationMinutes: Math.max(
        1,
        Math.round(seconds / 60)
      ),
      exercises: exercises.map((exercise) => ({
        name: exercise.name,
        muscle: exercise.muscle,
        plannedSets: exercise.sets,
        completed: completed.includes(exercise.id),
        reps: exercise.reps,
        weight: exercise.weight
      })),
      totalExercises: exercises.length,
      completedExercises: completed.length,
      completionPercentage: workoutProgress
    };

    history.unshift(workout);

    localStorage.setItem(
      historyKey,
      JSON.stringify(history)
    );

    setWorkoutFinished(true);

    setFinishMessage(
      `Workout completed — ${completed.length} of ${exercises.length} exercises recorded.`
    );

    if (onWorkoutSaved) {
      onWorkoutSaved();
    }
  };

  const startRest = () => {
    setRestSeconds(60);
    setIsResting(true);
  };

  const resetWorkout = () => {
    const confirmed = window.confirm(
      "Reset this workout? Your current progress will be lost."
    );

    if (!confirmed) {
      return;
    }

    setIsWorkoutRunning(false);
    setSeconds(0);
    setCompleted([]);
    setRestSeconds(60);
    setIsResting(false);
    setWorkoutFinished(false);
    setFinishMessage("");

    localStorage.removeItem(
      `forma-workout-completed-${selectedDay}`
    );

    localStorage.removeItem(
      "forma-active-workout-time"
    );
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const completedCount = completed.length;

  const workoutProgress =
    exercises.length === 0
      ? 0
      : Math.round(
          (completedCount / exercises.length) * 100
        );

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
            <h1>
              Your <span>Workout.</span>
            </h1>

            <p>
              Train with purpose. Move with control.
              <br />
              Stay consistent and keep getting stronger.
            </p>
          </div>
        </header>

        

        <section className="weekly-split">
          <div className="weekly-split-top">
            <div>
              <span className="section-label">
                WEEKLY SPLIT
              </span>

              <h2>Choose a day</h2>
            </div>

            <div className="today-badge">
              <span></span>
              TODAY: {todayName.toUpperCase()}
            </div>
          </div>

          <div className="week-days">
            {weekDays.map((day) => (
              <button
                key={day.name}
                className={`week-day ${
                  selectedDay === day.name
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  setSelectedDay(day.name)
                }
              >
                <span className="day-short">
                  {day.short}
                </span>

                <span className="day-name">
                  {day.name}
                </span>

                {selectedDay === day.name && (
                  <span className="day-dot"></span>
                )}
              </button>
            ))}
          </div>
        </section>

        

        <section className="focus-card">
          <div className="focus-heading">
            <div>
              <span className="section-label">
                TODAY'S FOCUS
              </span>

              <h2>{currentPlan.title}</h2>

              <div className="muscle-tags">
                {currentPlan.muscles.map(
                  (muscle) => (
                    <span key={muscle}>
                      {muscle}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="daily-progress">
              <div className="daily-progress-top">
                <span>DAILY PROGRESS</span>

                <strong>
                  {completedCount}/{exercises.length}
                </strong>
              </div>

              <div className="daily-progress-track">
                <div
                  style={{
                    width: `${workoutProgress}%`
                  }}
                ></div>
              </div>

              <small>
                {workoutProgress}% complete
              </small>
            </div>
          </div>

          <p className="focus-description">
            {currentPlan.description}
          </p>
        </section>


        <section className="workout-timer-card">
          <div>
            <span>SESSION TIME</span>

            <strong>
              {formatTime(seconds)}
            </strong>
          </div>

          <div className="workout-timer-actions">
            {!isWorkoutRunning ? (
              <button onClick={startWorkout}>
                Start
              </button>
            ) : (
              <button onClick={pauseWorkout}>
                Pause
              </button>
            )}

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

        

        <section className="workout-layout">

          <div className="exercise-panel">

            <div className="exercise-section-heading">
              <div>
                <span>WORKOUT PLAN</span>
                <h2>Exercises</h2>
              </div>

              <strong>
                {completedCount}/{exercises.length}
              </strong>
            </div>

            <div className="exercise-list">
              {exercises.map(
                (exercise, index) => {
                  const isCompleted =
                    completed.includes(
                      exercise.id
                    );

                  return (
                    <div
                      className={`exercise-card ${
                        isCompleted
                          ? "exercise-completed"
                          : ""
                      }`}
                      key={exercise.id}
                    >
                      <div className="exercise-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      <div className="exercise-info">
                        <h3>
                          {exercise.name}
                        </h3>

                        <span>
                          {exercise.muscle}
                        </span>
                      </div>

                      <div className="exercise-details">
                        <div>
                          <small>SETS</small>
                          <strong>
                            {exercise.sets}
                          </strong>
                        </div>

                        <div>
                          <small>REPS</small>
                          <strong>
                            {exercise.reps}
                          </strong>
                        </div>

                        <div>
                          <small>WEIGHT</small>
                          <strong>
                            {exercise.weight
                              ? `${exercise.weight} kg`
                              : "—"}
                          </strong>
                        </div>
                      </div>

                      <button
                        className="exercise-check"
                        onClick={() =>
                          toggleExercise(
                            exercise.id
                          )
                        }
                        aria-label={`Mark ${exercise.name} complete`}
                      >
                        {isCompleted ? "✓" : "○"}
                      </button>
                    </div>
                  );
                }
              )}
            </div>

            <button
              className="finish-workout-button"
              onClick={finishWorkout}
              disabled={workoutFinished}
            >
              {workoutFinished
                ? "Workout Completed ✓"
                : "Finish Workout"}

              {!workoutFinished && (
                <span>→</span>
              )}
            </button>

            {finishMessage && (
              <p className="workout-finish-message">
                {finishMessage}
              </p>
            )}
          </div>

          
          <aside className="workout-sidebar">

            <div className="rest-panel">
              <span className="sidebar-label">
                RECOVERY
              </span>

              <h2>Rest Timer</h2>

              <div className="rest-timer">
                {formatTime(restSeconds)}
              </div>

              <p>
                Take your time between exercises.
                <br />
                Quality over speed.
              </p>

              <button
                className="rest-button"
                onClick={() =>
                  isResting
                    ? setIsResting(false)
                    : startRest()
                }
              >
                {isResting
                  ? "Stop Rest"
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
                simply lifting heavier.
              </p>
            </div>

            <div className="workout-summary">
              <span className="sidebar-label">
                SESSION SUMMARY
              </span>

              <div className="summary-row">
                <span>Completed</span>

                <strong>
                  {completedCount}/
                  {exercises.length}
                </strong>
              </div>

              <div className="summary-row">
                <span>Time</span>

                <strong>
                  {formatTime(seconds)}
                </strong>
              </div>

              <div className="summary-row">
                <span>Progress</span>

                <strong>
                  {workoutProgress}%
                </strong>
              </div>

              <div className="summary-progress">
                <div
                  style={{
                    width: `${workoutProgress}%`
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