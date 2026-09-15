import React, { useState, useEffect, useMemo } from "react";
import "./Workout.css";

/* =====================================================
   REUSABLE EXERCISE CARD
===================================================== */

function ExerciseCard({
  exercise,
  completed,
  onToggle
}) {
  return (
    <div
      className={`day-exercise-card ${
        completed ? "exercise-completed" : ""
      }`}
    >
      <div className="day-exercise-main">

        <div className="day-exercise-number">
          {completed ? "✓" : exercise.number}
        </div>

        <div className="day-exercise-info">

          <div className="day-exercise-top">

            <div>
              <h3>{exercise.name}</h3>

              <span>
                {exercise.muscle}
              </span>
            </div>

          </div>

          {exercise.description && (
            <p>
              {exercise.description}
            </p>
          )}

          <div className="day-exercise-details">

            <div>
              <span>SETS</span>
              <strong>{exercise.sets}</strong>
            </div>

            <div>
              <span>REPS</span>
              <strong>{exercise.reps}</strong>
            </div>

            {exercise.weight && (
              <div>
                <span>WEIGHT</span>
                <strong>{exercise.weight} kg</strong>
              </div>
            )}

          </div>

        </div>

        <button
          className={`exercise-complete-button ${
            completed ? "completed" : ""
          }`}
          onClick={() => onToggle(exercise.id)}
        >
          {completed ? "Completed ✓" : "Complete"}
        </button>

      </div>
    </div>
  );
}


/* =====================================================
   MAIN WORKOUT COMPONENT
===================================================== */

function Workout({
  user,
  theme,
  onNavigate,
  onNavigateHome,
  onWorkoutSaved
}) {

  /* =====================================================
     WEEKLY WORKOUT DATA
  ===================================================== */

  const weeklyWorkouts = {
    Monday: {
      type: "Push",
      focus: ["Chest", "Shoulders", "Triceps"],
      exercises: [
        {
          id: "mon-1",
          name: "Barbell Bench Press",
          muscle: "Chest",
          sets: 4,
          reps: 8,
          weight: 60,
          description:
            "Controlled pressing movement with focus on chest strength."
        },
        {
          id: "mon-2",
          name: "Incline Dumbbell Press",
          muscle: "Chest",
          sets: 3,
          reps: 10,
          weight: 22,
          description:
            "Targets the upper chest through a controlled incline press."
        },
        {
          id: "mon-3",
          name: "Shoulder Press",
          muscle: "Shoulders",
          sets: 3,
          reps: 10,
          weight: 35,
          description:
            "Press overhead while keeping your core stable."
        },
        {
          id: "mon-4",
          name: "Lateral Raises",
          muscle: "Shoulders",
          sets: 3,
          reps: 12,
          weight: 10,
          description:
            "Raise the dumbbells smoothly without using momentum."
        },
        {
          id: "mon-5",
          name: "Tricep Pushdown",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 25,
          description:
            "Keep your elbows close to your body throughout the movement."
        },
        {
          id: "mon-6",
          name: "Overhead Tricep Extension",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 15,
          description:
            "Lower the weight slowly and fully extend at the top."
        }
      ]
    },

    Tuesday: {
      type: "Pull",
      focus: ["Back", "Biceps"],
      exercises: [
        {
          id: "tue-1",
          name: "Lat Pulldown",
          muscle: "Back",
          sets: 4,
          reps: 10,
          weight: 50,
          description:
            "Pull toward your upper chest while keeping your torso stable."
        },
        {
          id: "tue-2",
          name: "Barbell Row",
          muscle: "Back",
          sets: 4,
          reps: 8,
          weight: 50,
          description:
            "Drive your elbows back and keep your spine neutral."
        },
        {
          id: "tue-3",
          name: "Seated Cable Row",
          muscle: "Back",
          sets: 3,
          reps: 12,
          weight: 45,
          description:
            "Squeeze your shoulder blades together at the end of each rep."
        },
        {
          id: "tue-4",
          name: "Face Pull",
          muscle: "Back",
          sets: 3,
          reps: 15,
          weight: 20,
          description:
            "Pull the rope toward your face while keeping your elbows high."
        },
        {
          id: "tue-5",
          name: "Barbell Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 25,
          description:
            "Curl without swinging your body or moving your elbows."
        },
        {
          id: "tue-6",
          name: "Hammer Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 12,
          weight: 14,
          description:
            "Maintain a neutral grip throughout the entire movement."
        }
      ]
    },

    Wednesday: {
      type: "Legs",
      focus: ["Quads", "Hamstrings", "Glutes", "Calves"],
      exercises: [
        {
          id: "wed-1",
          name: "Barbell Squat",
          muscle: "Quads",
          sets: 4,
          reps: 8,
          weight: 70,
          description:
            "Keep your chest up and descend under control."
        },
        {
          id: "wed-2",
          name: "Leg Press",
          muscle: "Quads",
          sets: 3,
          reps: 10,
          weight: 100,
          description:
            "Drive through your feet while maintaining controlled movement."
        },
        {
          id: "wed-3",
          name: "Romanian Deadlift",
          muscle: "Hamstrings",
          sets: 3,
          reps: 10,
          weight: 60,
          description:
            "Hinge at the hips and keep the weight close to your legs."
        },
        {
          id: "wed-4",
          name: "Walking Lunges",
          muscle: "Glutes",
          sets: 3,
          reps: 12,
          weight: 16,
          description:
            "Take controlled steps and keep your front knee stable."
        },
        {
          id: "wed-5",
          name: "Leg Curl",
          muscle: "Hamstrings",
          sets: 3,
          reps: 12,
          weight: 35,
          description:
            "Curl the weight smoothly without lifting your hips."
        },
        {
          id: "wed-6",
          name: "Standing Calf Raise",
          muscle: "Calves",
          sets: 4,
          reps: 15,
          weight: 40,
          description:
            "Pause briefly at the top before lowering your heels."
        }
      ]
    },

    Thursday: {
      type: "Push",
      focus: ["Chest", "Shoulders", "Triceps"],
      exercises: [
        {
          id: "thu-1",
          name: "Incline Barbell Press",
          muscle: "Chest",
          sets: 4,
          reps: 8,
          weight: 55,
          description:
            "Focus on controlled reps through the upper chest."
        },
        {
          id: "thu-2",
          name: "Dumbbell Chest Press",
          muscle: "Chest",
          sets: 3,
          reps: 10,
          weight: 24,
          description:
            "Keep both dumbbells balanced throughout the movement."
        },
        {
          id: "thu-3",
          name: "Arnold Press",
          muscle: "Shoulders",
          sets: 3,
          reps: 10,
          weight: 18,
          description:
            "Rotate smoothly while pressing overhead."
        },
        {
          id: "thu-4",
          name: "Lateral Raises",
          muscle: "Shoulders",
          sets: 3,
          reps: 15,
          weight: 8,
          description:
            "Use a controlled range of motion and avoid swinging."
        },
        {
          id: "thu-5",
          name: "Rope Tricep Pushdown",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 22,
          description:
            "Separate the rope at the bottom of each repetition."
        },
        {
          id: "thu-6",
          name: "Tricep Dips",
          muscle: "Triceps",
          sets: 3,
          reps: 10,
          weight: 0,
          description:
            "Lower under control and press back up without locking aggressively."
        }
      ]
    },

    Friday: {
      type: "Pull",
      focus: ["Back", "Biceps"],
      exercises: [
        {
          id: "fri-1",
          name: "Pull Ups",
          muscle: "Back",
          sets: 4,
          reps: 8,
          weight: 0,
          description:
            "Pull your chest toward the bar while keeping your body controlled."
        },
        {
          id: "fri-2",
          name: "Chest Supported Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 40,
          description:
            "Keep your chest supported and pull toward your lower ribs."
        },
        {
          id: "fri-3",
          name: "Single Arm Dumbbell Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 24,
          description:
            "Pull the dumbbell toward your hip while keeping your back stable."
        },
        {
          id: "fri-4",
          name: "Straight Arm Pulldown",
          muscle: "Back",
          sets: 3,
          reps: 12,
          weight: 25,
          description:
            "Keep your arms mostly straight and pull toward your thighs."
        },
        {
          id: "fri-5",
          name: "Incline Dumbbell Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 12,
          description:
            "Allow your arms to extend fully before curling."
        },
        {
          id: "fri-6",
          name: "Hammer Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 12,
          weight: 14,
          description:
            "Use a neutral grip and maintain controlled repetitions."
        }
      ]
    },

    Saturday: {
      type: "Legs",
      focus: ["Quads", "Hamstrings", "Glutes", "Calves"],
      exercises: [
        {
          id: "sat-1",
          name: "Front Squat",
          muscle: "Quads",
          sets: 4,
          reps: 8,
          weight: 55,
          description:
            "Keep your torso upright and drive through your feet."
        },
        {
          id: "sat-2",
          name: "Bulgarian Split Squat",
          muscle: "Quads",
          sets: 3,
          reps: 10,
          weight: 16,
          description:
            "Lower slowly while keeping your front foot planted."
        },
        {
          id: "sat-3",
          name: "Hip Thrust",
          muscle: "Glutes",
          sets: 4,
          reps: 10,
          weight: 70,
          description:
            "Drive through your heels and squeeze your glutes at the top."
        },
        {
          id: "sat-4",
          name: "Romanian Deadlift",
          muscle: "Hamstrings",
          sets: 3,
          reps: 10,
          weight: 60,
          description:
            "Keep your back neutral and hinge from the hips."
        },
        {
          id: "sat-5",
          name: "Leg Curl",
          muscle: "Hamstrings",
          sets: 3,
          reps: 12,
          weight: 35,
          description:
            "Use slow, controlled repetitions."
        },
        {
          id: "sat-6",
          name: "Seated Calf Raise",
          muscle: "Calves",
          sets: 4,
          reps: 15,
          weight: 35,
          description:
            "Use a full range of motion with a brief pause at the top."
        }
      ]
    },

    Sunday: {
      type: "Recovery & Mobility",
      focus: ["Mobility", "Stretching", "Walking"],
      exercises: [
        {
          id: "sun-1",
          name: "Full Body Stretch",
          muscle: "Mobility",
          sets: 1,
          reps: "5–10 min",
          weight: 0,
          description:
            "Use gentle stretches for the major muscle groups."
        },
        {
          id: "sun-2",
          name: "Hip Mobility",
          muscle: "Hips",
          sets: 2,
          reps: "8–10 / side",
          weight: 0,
          description:
            "Move slowly through comfortable hip ranges of motion."
        },
        {
          id: "sun-3",
          name: "Shoulder Mobility",
          muscle: "Shoulders",
          sets: 2,
          reps: "10–12",
          weight: 0,
          description:
            "Use controlled circles and movements to loosen the shoulders."
        },
        {
          id: "sun-4",
          name: "Light Walking",
          muscle: "Full Body",
          sets: 1,
          reps: "20–30 min",
          weight: 0,
          description:
            "Keep the pace comfortable and use the walk to stay active."
        }
      ]
    }
  };


  /* =====================================================
     CURRENT DAY
  ===================================================== */

  const days = Object.keys(weeklyWorkouts);

  const getCurrentDay = () => {
    const dayIndex = new Date().getDay();

    return days[dayIndex];
  };

  const today = getCurrentDay();

  const [selectedDay, setSelectedDay] = useState(today);


  /* =====================================================
     DAY-SPECIFIC WORKOUT
  ===================================================== */

  const selectedWorkout =
    weeklyWorkouts[selectedDay];


  /* =====================================================
     USER-SPECIFIC STORAGE
  ===================================================== */

  const userId = user?.id || "guest";

  const completionKey =
    `forma-day-workout-completion-${userId}`;

  const [completedExercises, setCompletedExercises] =
    useState(() => {

      const saved =
        localStorage.getItem(completionKey);

      if (!saved) {
        return {};
      }

      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    });


  useEffect(() => {

    localStorage.setItem(
      completionKey,
      JSON.stringify(completedExercises)
    );

  }, [
    completedExercises,
    completionKey
  ]);


  /* =====================================================
     EXERCISE COMPLETION
  ===================================================== */

  const toggleExercise = (exerciseId) => {

    setCompletedExercises((previous) => {

      const dayExercises =
        previous[selectedDay] || {};

      return {
        ...previous,

        [selectedDay]: {
          ...dayExercises,

          [exerciseId]:
            !dayExercises[exerciseId]
        }
      };

    });

  };


  const selectedDayCompleted =
    completedExercises[selectedDay] || {};


  const completedExerciseCount =
    selectedWorkout.exercises.filter(
      (exercise) =>
        selectedDayCompleted[exercise.id]
    ).length;


  const totalExercises =
    selectedWorkout.exercises.length;


  const workoutProgress =
    totalExercises === 0
      ? 0
      : Math.round(
          (completedExerciseCount /
            totalExercises) *
            100
        );


  const isToday =
    selectedDay === today;


  /* =====================================================
     TIMER
  ===================================================== */

  const [workoutSeconds, setWorkoutSeconds] =
    useState(() => {

      const saved =
        localStorage.getItem(
          "forma-active-workout-time"
        );

      return saved
        ? Number(saved)
        : 0;
    });


  const [isWorkoutRunning, setIsWorkoutRunning] =
    useState(false);


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

      setWorkoutSeconds(
        (previous) => previous + 1
      );

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [isWorkoutRunning]);


  /* =====================================================
     REST TIMER
  ===================================================== */

  const [restSeconds, setRestSeconds] =
    useState(60);

  const [isResting, setIsResting] =
    useState(false);


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

      setRestSeconds(
        (previous) => previous - 1
      );

    }, 1000);

    return () =>
      clearInterval(timer);

  }, [
    isResting,
    restSeconds
  ]);


  /* =====================================================
     FINISH STATE
  ===================================================== */

  const [workoutFinished, setWorkoutFinished] =
    useState(false);

  const [finishMessage, setFinishMessage] =
    useState("");


  /* =====================================================
     TIME FORMAT
  ===================================================== */

  const formatTime = (seconds) => {

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;

    return `${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(
      2,
      "0"
    )}`;
  };


  /* =====================================================
     FINISH WORKOUT
  ===================================================== */

  const finishWorkout = () => {

    if (!isToday) {

      setFinishMessage(
        "Preview mode — switch back to today to record this workout."
      );

      return;
    }

    if (completedExerciseCount === 0) {

      setFinishMessage(
        "Complete at least one exercise before finishing your workout."
      );

      return;
    }


    setIsWorkoutRunning(false);


    const historyKey =
      `forma-workout-history-${userId}`;


    const savedHistory =
      localStorage.getItem(historyKey);


    let history = [];


    if (savedHistory) {

      try {
        history =
          JSON.parse(savedHistory);
      } catch {
        history = [];
      }

    }


    const completedSets =
      selectedWorkout.exercises.reduce(
        (total, exercise) => {

          if (
            selectedDayCompleted[
              exercise.id
            ]
          ) {
            return total + exercise.sets;
          }

          return total;

        },
        0
      );


    const totalSets =
      selectedWorkout.exercises.reduce(
        (total, exercise) =>
          total + exercise.sets,
        0
      );


    const workout = {

      id: Date.now(),

      userId,

      name: selectedWorkout.type,

      type:
        selectedDay === "Sunday"
          ? "Recovery"
          : selectedWorkout.type,

      date:
        new Date().toISOString(),

      duration:
        workoutSeconds,

      durationMinutes:
        Math.max(
          1,
          Math.round(
            workoutSeconds / 60
          )
        ),

      exercises:
        selectedWorkout.exercises.map(
          (exercise) => ({

            name: exercise.name,

            muscle: exercise.muscle,

            plannedSets:
              exercise.sets,

            completedSets:
              selectedDayCompleted[
                exercise.id
              ]
                ? exercise.sets
                : 0,

            reps: exercise.reps,

            weight: exercise.weight

          })
        ),

      totalSets,

      completedSets,

      completionPercentage:
        workoutProgress

    };


    history.unshift(workout);


    localStorage.setItem(
      historyKey,
      JSON.stringify(history)
    );


    setWorkoutFinished(true);


    setFinishMessage(
      `${selectedDay}'s workout completed — ${completedExerciseCount} of ${totalExercises} exercises recorded.`
    );


    if (onWorkoutSaved) {
      onWorkoutSaved();
    }

  };


  /* =====================================================
     RESET WORKOUT
  ===================================================== */

  const resetWorkout = () => {

    const confirmed =
      window.confirm(
        "Reset today's workout? Your current progress will be lost."
      );


    if (!confirmed) {
      return;
    }


    setCompletedExercises(
      (previous) => ({
        ...previous,
        [selectedDay]: {}
      })
    );


    setWorkoutSeconds(0);

    setIsWorkoutRunning(false);

    setWorkoutFinished(false);

    setFinishMessage("");


    localStorage.removeItem(
      "forma-active-workout-time"
    );

  };


  /* =====================================================
     DAY LABEL
  ===================================================== */

  const focusText =
    selectedWorkout.focus.join(
      " • "
    );


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <div
      className={`workout-page ${theme}-theme`}
    >

      {/* =========================================
          NAVBAR
      ========================================= */}

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
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Dashboard
          </button>


          <button
            className="workout-nav-button nav-active"
            onClick={() =>
              onNavigate("workout")
            }
          >
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
              ?.split(" ")[0]
              ?.charAt(0)
              .toUpperCase() || "U"}

          </div>

        </div>

      </nav>


      <main className="workout-content">

        {/* =========================================
            HEADER
        ========================================= */}

        <header className="workout-header">

          <div>

            <div className="workout-status">

              <span></span>

              TODAY'S TRAINING

            </div>


            <h1>
              {selectedDay}
              <span>.</span>
            </h1>


            <p>

              {isToday
                ? `Today's focus is ${focusText.toLowerCase()}. Follow the session at your own pace and focus on quality movement.`
                : `Preview the ${selectedDay} workout. Today's session is ${today}.`}

            </p>

          </div>

        </header>


        {/* =========================================
            DAY SELECTOR
        ========================================= */}

        <section className="day-selector-section">

          <div className="day-selector-heading">

            <div>

              <span>
                WEEKLY SPLIT
              </span>

              <h2>
                Choose a day
              </h2>

            </div>


            <div className="today-indicator">

              <span></span>

              TODAY: {today.toUpperCase()}

            </div>

          </div>


          <div className="day-selector">

            {days.map((day) => (

              <button
                key={day}
                className={`day-button ${
                  selectedDay === day
                    ? "selected"
                    : ""
                } ${
                  day === today
                    ? "today"
                    : ""
                }`}
                onClick={() =>
                  setSelectedDay(day)
                }
              >

                <span>
                  {day.slice(0, 3).toUpperCase()}
                </span>

                <strong>
                  {day === today
                    ? "Today"
                    : day}
                </strong>

                {day === today && (
                  <small>
                    CURRENT
                  </small>
                )}

              </button>

            ))}

          </div>

        </section>


        {/* =========================================
            DAY FOCUS
        ========================================= */}

        <section className="day-focus-panel">

          <div className="day-focus-main">

            <div className="day-focus-label">

              <span>
                {isToday
                  ? "TODAY'S FOCUS"
                  : "WORKOUT PREVIEW"}
              </span>

              <div className="focus-dot"></div>

            </div>


            <h2>
              {selectedWorkout.type}
            </h2>


            <p>
              {focusText}
            </p>

          </div>


          <div className="day-focus-progress">

            <div>

              <span>
                DAILY PROGRESS
              </span>

              <strong>
                {completedExerciseCount}/
                {totalExercises}
              </strong>

            </div>


            <div className="day-progress-track">

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

        </section>


        {/* =========================================
            TIMER
        ========================================= */}

        <section className="workout-timer-card">

          <div>

            <span>
              SESSION TIME
            </span>

            <strong>
              {formatTime(
                workoutSeconds
              )}
            </strong>

          </div>


          <div className="workout-timer-actions">

            <button
              onClick={() =>
                setIsWorkoutRunning(
                  (previous) =>
                    !previous
                )
              }
            >
              {isWorkoutRunning
                ? "Pause"
                : "Start"}
            </button>


            <button
              onClick={resetWorkout}
            >
              Reset
            </button>

          </div>

        </section>


        {/* =========================================
            OVERVIEW
        ========================================= */}

        <section className="workout-overview">

          <div className="workout-overview-card">

            <span>
              TYPE
            </span>

            <strong>
              {selectedWorkout.type}
            </strong>

          </div>


          <div className="workout-overview-card">

            <span>
              MUSCLE GROUPS
            </span>

            <strong>
              {selectedWorkout.focus.length}
            </strong>

          </div>


          <div className="workout-overview-card">

            <span>
              EXERCISES
            </span>

            <strong>
              {totalExercises}
            </strong>

          </div>


          <div className="workout-overview-card">

            <span>
              PROGRESS
            </span>

            <strong>
              {workoutProgress}%
            </strong>

          </div>

        </section>


        {/* =========================================
            MAIN WORKOUT LAYOUT
        ========================================= */}

        <div className="workout-layout">


          {/* =======================================
              DAY EXERCISES
          ======================================= */}

          <section className="day-workout-panel">

            <div className="day-workout-heading">

              <div>

                <span>
                  {selectedDay.toUpperCase()} SESSION
                </span>

                <h2>
                  Today's exercises
                </h2>

                <p>
                  Complete each exercise as you
                  work through the session.
                </p>

              </div>


              <strong>
                {completedExerciseCount}/
                {totalExercises}
              </strong>

            </div>


            <div className="day-exercise-list">

              {selectedWorkout.exercises.map(
                (exercise, index) => (

                  <ExerciseCard
                    key={exercise.id}
                    exercise={{
                      ...exercise,
                      number: index + 1
                    }}
                    completed={
                      Boolean(
                        selectedDayCompleted[
                          exercise.id
                        ]
                      )
                    }
                    onToggle={
                      toggleExercise
                    }
                  />

                )
              )}

            </div>


            {/* ===================================
                FINISH WORKOUT
            =================================== */}

            <button
              className="finish-workout-button"
              onClick={finishWorkout}
              disabled={
                workoutFinished ||
                !isToday
              }
            >

              {!isToday
                ? "Preview Mode"
                : workoutFinished
                ? "Workout Completed ✓"
                : "Finish Workout"}

            </button>


            {finishMessage && (

              <p className="workout-finish-message">
                {finishMessage}
              </p>

            )}

          </section>


          {/* =======================================
              SIDEBAR
          ======================================= */}

          <aside className="workout-sidebar">


            {/* REST TIMER */}

            <div className="rest-panel">

              <span>
                REST TIMER
              </span>


              <strong>
                {formatTime(
                  restSeconds
                )}
              </strong>


              <button
                onClick={() =>
                  isResting
                    ? setIsResting(false)
                    : (
                        setRestSeconds(60),
                        setIsResting(true)
                      )
                }
              >

                {isResting
                  ? "Stop Rest"
                  : "Start Rest"}

              </button>

            </div>


            {/* TIP */}

            <div className="tip-panel">

              <span>
                FORMA TIP
              </span>


              <p>

                Focus on controlled movement
                and consistent form. Quality
                reps always come before heavier
                weight.

              </p>

            </div>


            {/* SESSION SUMMARY */}

            <div className="summary-panel">

              <span>
                SESSION SUMMARY
              </span>


              <div>

                <span>
                  Day
                </span>

                <strong>
                  {selectedDay}
                </strong>

              </div>


              <div>

                <span>
                  Focus
                </span>

                <strong>
                  {selectedWorkout.type}
                </strong>

              </div>


              <div>

                <span>
                  Exercises
                </span>

                <strong>
                  {completedExerciseCount}/
                  {totalExercises}
                </strong>

              </div>


              <div>

                <span>
                  Completion
                </span>

                <strong>
                  {workoutProgress}%
                </strong>

              </div>


              <div>

                <span>
                  Time
                </span>

                <strong>
                  {formatTime(
                    workoutSeconds
                  )}
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