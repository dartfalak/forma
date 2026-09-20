import React, { useEffect, useMemo, useState } from "react";
import "./Workout.css";

function Workout({ user, theme, onNavigate, onNavigateHome }) {
  const userId = user?.id || "guest";

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const dayPlans = {
    Monday: {
      name: "Push",
      type: "Strength",
      targetMinutes: 45,
      muscles: ["Chest", "Shoulders", "Triceps"],
      description:
        "Build upper-body pressing strength with controlled, focused movements.",
      exercises: [
        {
          name: "Barbell Bench Press",
          muscle: "Chest",
          sets: 4,
          reps: 8,
          weight: 60,
          description: "Controlled presses with a stable chest position.",
        },
        {
          name: "Incline Dumbbell Press",
          muscle: "Chest",
          sets: 3,
          reps: 10,
          weight: 22,
          description: "Focus on the upper chest through a full range of motion.",
        },
        {
          name: "Shoulder Press",
          muscle: "Shoulders",
          sets: 3,
          reps: 10,
          weight: 18,
          description: "Press smoothly without using momentum.",
        },
        {
          name: "Lateral Raises",
          muscle: "Shoulders",
          sets: 3,
          reps: 12,
          weight: 8,
          description: "Keep the movement controlled and avoid swinging.",
        },
        {
          name: "Tricep Pushdown",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 20,
          description: "Keep your elbows close to your body.",
        },
        {
          name: "Overhead Tricep Extension",
          muscle: "Triceps",
          sets: 3,
          reps: 10,
          weight: 14,
          description: "Use a controlled stretch and contraction.",
        },
      ],
    },

    Tuesday: {
      name: "Pull",
      type: "Strength",
      targetMinutes: 45,
      muscles: ["Back", "Biceps"],
      description:
        "Train your pulling muscles with a balanced back and biceps session.",
      exercises: [
        {
          name: "Lat Pulldown",
          muscle: "Back",
          sets: 4,
          reps: 10,
          weight: 45,
          description: "Pull toward your upper chest while keeping your torso stable.",
        },
        {
          name: "Seated Cable Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 40,
          description: "Squeeze your shoulder blades together at the end.",
        },
        {
          name: "Single Arm Dumbbell Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 22,
          description: "Keep your back neutral throughout the movement.",
        },
        {
          name: "Face Pull",
          muscle: "Back",
          sets: 3,
          reps: 12,
          weight: 15,
          description: "Pull toward your face with controlled movement.",
        },
        {
          name: "Dumbbell Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 12,
          weight: 10,
          description: "Avoid swinging and keep tension on the biceps.",
        },
        {
          name: "Hammer Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 10,
          description: "Keep your palms facing inward throughout the movement.",
        },
      ],
    },

    Wednesday: {
      name: "Legs",
      type: "Strength",
      targetMinutes: 50,
      muscles: ["Quads", "Hamstrings", "Glutes", "Calves"],
      description:
        "Build lower-body strength with a complete leg-focused session.",
      exercises: [
        {
          name: "Barbell Squat",
          muscle: "Quads",
          sets: 4,
          reps: 8,
          weight: 80,
          description: "Keep your core tight and drive through your feet.",
        },
        {
          name: "Romanian Deadlift",
          muscle: "Hamstrings",
          sets: 3,
          reps: 10,
          weight: 60,
          description: "Push your hips back while keeping your back neutral.",
        },
        {
          name: "Leg Press",
          muscle: "Quads",
          sets: 3,
          reps: 10,
          weight: 100,
          description: "Use a controlled range of motion.",
        },
        {
          name: "Walking Lunges",
          muscle: "Glutes",
          sets: 3,
          reps: 12,
          weight: 14,
          description: "Take steady steps and keep your torso upright.",
        },
        {
          name: "Leg Curl",
          muscle: "Hamstrings",
          sets: 3,
          reps: 12,
          weight: 35,
          description: "Control both the lifting and lowering phases.",
        },
        {
          name: "Standing Calf Raise",
          muscle: "Calves",
          sets: 3,
          reps: 15,
          weight: 30,
          description: "Pause briefly at the top of each repetition.",
        },
      ],
    },

    Thursday: {
      name: "Push",
      type: "Strength",
      targetMinutes: 45,
      muscles: ["Chest", "Shoulders", "Triceps"],
      description:
        "A second push session focused on controlled strength and volume.",
      exercises: [
        {
          name: "Incline Barbell Press",
          muscle: "Chest",
          sets: 4,
          reps: 8,
          weight: 55,
          description: "Keep your shoulder blades stable against the bench.",
        },
        {
          name: "Machine Chest Press",
          muscle: "Chest",
          sets: 3,
          reps: 10,
          weight: 45,
          description: "Press smoothly without locking out aggressively.",
        },
        {
          name: "Arnold Press",
          muscle: "Shoulders",
          sets: 3,
          reps: 10,
          weight: 14,
          description: "Rotate smoothly while maintaining control.",
        },
        {
          name: "Cable Lateral Raise",
          muscle: "Shoulders",
          sets: 3,
          reps: 12,
          weight: 7,
          description: "Keep tension throughout the movement.",
        },
        {
          name: "Rope Tricep Pushdown",
          muscle: "Triceps",
          sets: 3,
          reps: 12,
          weight: 18,
          description: "Finish each repetition with a controlled extension.",
        },
        {
          name: "Bench Dips",
          muscle: "Triceps",
          sets: 3,
          reps: 10,
          weight: 0,
          description: "Keep your shoulders controlled and comfortable.",
        },
      ],
    },

    Friday: {
      name: "Pull",
      type: "Strength",
      targetMinutes: 45,
      muscles: ["Back", "Biceps"],
      description:
        "Strengthen your back and arms with a second pulling session.",
      exercises: [
        {
          name: "Assisted Pull-Up",
          muscle: "Back",
          sets: 4,
          reps: 8,
          weight: 30,
          description: "Pull your chest upward while keeping your core engaged.",
        },
        {
          name: "Chest Supported Row",
          muscle: "Back",
          sets: 3,
          reps: 10,
          weight: 25,
          description: "Drive your elbows back without using momentum.",
        },
        {
          name: "Straight Arm Pulldown",
          muscle: "Back",
          sets: 3,
          reps: 12,
          weight: 20,
          description: "Keep your arms mostly straight throughout.",
        },
        {
          name: "Reverse Fly",
          muscle: "Back",
          sets: 3,
          reps: 12,
          weight: 7,
          description: "Use a light weight and controlled movement.",
        },
        {
          name: "EZ Bar Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 20,
          description: "Keep your elbows close to your sides.",
        },
        {
          name: "Incline Dumbbell Curl",
          muscle: "Biceps",
          sets: 3,
          reps: 10,
          weight: 9,
          description: "Allow the biceps to stretch at the bottom.",
        },
      ],
    },

    Saturday: {
      name: "Legs",
      type: "Strength",
      targetMinutes: 50,
      muscles: ["Quads", "Hamstrings", "Glutes", "Calves"],
      description:
        "A second lower-body session focused on strength and stability.",
      exercises: [
        {
          name: "Front Squat",
          muscle: "Quads",
          sets: 4,
          reps: 8,
          weight: 55,
          description: "Keep your torso upright and your core braced.",
        },
        {
          name: "Hip Thrust",
          muscle: "Glutes",
          sets: 4,
          reps: 10,
          weight: 60,
          description: "Pause at the top and fully contract your glutes.",
        },
        {
          name: "Bulgarian Split Squat",
          muscle: "Quads",
          sets: 3,
          reps: 10,
          weight: 12,
          description: "Maintain balance and controlled depth.",
        },
        {
          name: "Seated Leg Curl",
          muscle: "Hamstrings",
          sets: 3,
          reps: 12,
          weight: 35,
          description: "Keep tension throughout the full movement.",
        },
        {
          name: "Glute Kickback",
          muscle: "Glutes",
          sets: 3,
          reps: 12,
          weight: 12,
          description: "Avoid rotating your hips during the movement.",
        },
        {
          name: "Seated Calf Raise",
          muscle: "Calves",
          sets: 3,
          reps: 15,
          weight: 25,
          description: "Use a slow and controlled tempo.",
        },
      ],
    },

    Sunday: {
      name: "Recovery & Mobility",
      type: "Recovery",
      targetMinutes: 30,
      muscles: ["Mobility", "Stretching", "Recovery"],
      description:
        "Recover, move and reset with light activity and focused mobility work.",
      exercises: [
        {
          name: "Light Walk",
          muscle: "Full Body",
          sets: 1,
          reps: "20 min",
          weight: 0,
          description: "Walk at an easy pace and keep your breathing relaxed.",
        },
        {
          name: "Hip Mobility",
          muscle: "Hips",
          sets: 1,
          reps: "5 min",
          weight: 0,
          description: "Use slow, controlled movements through your comfortable range.",
        },
        {
          name: "Shoulder Mobility",
          muscle: "Shoulders",
          sets: 1,
          reps: "5 min",
          weight: 0,
          description: "Move gently without forcing your range of motion.",
        },
        {
          name: "Full Body Stretch",
          muscle: "Full Body",
          sets: 1,
          reps: "10 min",
          weight: 0,
          description: "Finish with relaxed stretches and steady breathing.",
        },
      ],
    },
  };

  const getTodayName = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const todayName = getTodayName();

  const [selectedDay, setSelectedDay] = useState(
    weekDays.includes(todayName) ? todayName : "Monday"
  );

  const currentPlan = dayPlans[selectedDay];

  const completedKey = `forma-workout-completed-${userId}-${selectedDay}`;
  const activeTimeKey = `forma-active-workout-time-${userId}-${selectedDay}`;
  const finishedKey = `forma-workout-finished-${userId}-${selectedDay}`;

  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem(completedKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem(activeTimeKey);
    return saved ? Number(saved) : 0;
  });

  const [isRunning, setIsRunning] = useState(false);

  const [restSeconds, setRestSeconds] = useState(60);
  const [restRunning, setRestRunning] = useState(false);

  const [workoutFinished, setWorkoutFinished] = useState(() => {
    return localStorage.getItem(finishedKey) === "true";
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(completedKey);
      setCompleted(saved ? JSON.parse(saved) : []);
    } catch {
      setCompleted([]);
    }

    const savedTime = localStorage.getItem(activeTimeKey);
    setSeconds(savedTime ? Number(savedTime) : 0);

    setIsRunning(false);
    setRestRunning(false);
    setRestSeconds(60);

    setWorkoutFinished(localStorage.getItem(finishedKey) === "true");
  }, [selectedDay, completedKey, activeTimeKey, finishedKey]);

  useEffect(() => {
    localStorage.setItem(completedKey, JSON.stringify(completed));
  }, [completed, completedKey]);

  useEffect(() => {
    localStorage.setItem(activeTimeKey, String(seconds));
  }, [seconds, activeTimeKey]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (!restRunning) return;

    const interval = setInterval(() => {
      setRestSeconds((prev) => {
        if (prev <= 1) {
          setRestRunning(false);
          return 60;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [restRunning]);

  const workoutProgress = useMemo(() => {
    if (!currentPlan.exercises.length) return 0;

    return Math.round(
      (completed.length / currentPlan.exercises.length) * 100
    );
  }, [completed, currentPlan]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");

    const remainingSeconds = (totalSeconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  };

  const toggleExercise = (index) => {
    if (workoutFinished) return;

    setCompleted((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }

      return [...prev, index];
    });
  };

  const resetWorkout = () => {
    setCompleted([]);
    setSeconds(0);
    setIsRunning(false);
    setWorkoutFinished(false);

    localStorage.removeItem(completedKey);
    localStorage.removeItem(activeTimeKey);
    localStorage.removeItem(finishedKey);
  };

  const finishWorkout = () => {
    if (completed.length === 0) return;

    const historyKey = `forma-workout-history-${userId}`;

    let history = [];

    try {
      const savedHistory = localStorage.getItem(historyKey);
      history = savedHistory ? JSON.parse(savedHistory) : [];
    } catch {
      history = [];
    }

    const completedExercises = completed.length;
    const totalExercises = currentPlan.exercises.length;
    const completionPercentage = Math.round(
      (completedExercises / totalExercises) * 100
    );

    const workoutRecord = {
      id: `${selectedDay}-${Date.now()}`,
      day: selectedDay,
      name: currentPlan.name,
      type: currentPlan.type,
      date: new Date().toISOString(),
      duration: seconds,
      durationMinutes: Math.max(1, Math.round(seconds / 60)),
      targetMinutes: currentPlan.targetMinutes,
      exercises: currentPlan.exercises,
      completedExercises,
      totalExercises,
      completionPercentage,
    };

    history.unshift(workoutRecord);

    localStorage.setItem(historyKey, JSON.stringify(history));
    localStorage.setItem(finishedKey, "true");

    setWorkoutFinished(true);
    setIsRunning(false);
  };

  const startRest = () => {
    setRestSeconds(60);
    setRestRunning(true);
  };

  const toggleRest = () => {
    setRestRunning((prev) => !prev);
  };

  const displayWeight = (weight) => {
    if (!weight) return "—";
    return `${weight} kg`;
  };

  return (
    <div className={`workout-page ${theme === "light" ? "light-theme" : ""}`}>
      <nav className="workout-navbar">
        <div className="workout-logo" onClick={onNavigateHome}>
          FORMA
        </div>

        <div className="workout-nav-center">
          <button onClick={() => onNavigate("dashboard")}>
            Dashboard
          </button>

          <button className="active" onClick={() => onNavigate("workout")}>
            Workout
          </button>

          <button onClick={() => onNavigate("progress")}>
            Progress
          </button>
        </div>

        <div className="workout-profile-circle">
          {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
        </div>
      </nav>

      <main className="workout-content">
        <header className="workout-header">
          <div>
            <span className="section-label">TRAINING PLAN</span>
            <h1>Workout</h1>
            <p>
              Train with purpose. Stay consistent. Build your strength.
            </p>
          </div>

          <div className="header-date">
            <span>Today</span>
            <strong>{todayName}</strong>
          </div>
        </header>

        <section className="weekly-split">
          <div className="weekly-split-top">
            <div>
              <span className="section-label">WEEKLY SPLIT</span>
              <h2>Your training week</h2>
            </div>

            <div className="today-badge">
              <span className="day-dot"></span>
              Today: {todayName}
            </div>
          </div>

          <div className="week-days">
            {weekDays.map((day) => {
              const isToday = day === todayName;
              const isSelected = day === selectedDay;

              return (
                <button
                  key={day}
                  className={`week-day ${
                    isSelected ? "selected" : ""
                  } ${isToday ? "today" : ""}`}
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="day-short">{day.slice(0, 3)}</span>
                  <span className="day-name">
                    {dayPlans[day].name}
                  </span>

                  {isToday && <span className="day-dot"></span>}
                </button>
              );
            })}
          </div>
        </section>

        <section className="focus-card">
          <div className="focus-card-main">
            <div className="focus-heading">
              <div>
                <span className="section-label">
                  {selectedDay === todayName
                    ? "TODAY'S FOCUS"
                    : "WORKOUT PREVIEW"}
                </span>

                <h2>
                  {selectedDay}: {currentPlan.name}
                </h2>
              </div>

              <div className="focus-duration">
                <strong>{currentPlan.targetMinutes}</strong>
                <span>MIN</span>
              </div>
            </div>

            <div className="muscle-tags">
              {currentPlan.muscles.map((muscle) => (
                <span key={muscle}>{muscle}</span>
              ))}
            </div>

            <p className="focus-description">
              {currentPlan.description}
            </p>
          </div>

          <div className="daily-progress">
            <div className="daily-progress-header">
              <span>SESSION PROGRESS</span>
              <strong>
                {completed.length}/{currentPlan.exercises.length}
              </strong>
            </div>

            <div className="daily-progress-track">
              <span style={{ width: `${workoutProgress}%` }}></span>
            </div>

            <small>{workoutProgress}% complete</small>
          </div>
        </section>

        <section className="workout-timer-card">
          <div>
            <span className="section-label">SESSION TIMER</span>
            <div className="workout-timer">{formatTime(seconds)}</div>
          </div>

          <div className="workout-timer-actions">
            <button
              className="primary-timer-button"
              onClick={() => setIsRunning((prev) => !prev)}
              disabled={workoutFinished}
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              className="secondary-timer-button"
              onClick={resetWorkout}
            >
              Reset
            </button>
          </div>
        </section>

        <section className="workout-overview">
          <div className="workout-overview-card">
            <span>FOCUS</span>
            <strong>{currentPlan.name}</strong>
            <small>{currentPlan.type}</small>
          </div>

          <div className="workout-overview-card">
            <span>EXERCISES</span>
            <strong>{currentPlan.exercises.length}</strong>
            <small>Movements</small>
          </div>

          <div className="workout-overview-card">
            <span>TARGET</span>
            <strong>{currentPlan.targetMinutes}</strong>
            <small>Minutes</small>
          </div>

