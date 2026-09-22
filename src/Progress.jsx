import React, { useMemo } from "react";
import "./Progress.css";

function Progress({ user, theme, onNavigate, onNavigateHome }) {
  const userId = user?.id || "guest";
  const historyKey = `forma-workout-history-${userId}`;

  const workoutHistory = useMemo(() => {
    const savedHistory = localStorage.getItem(historyKey);

    if (!savedHistory) {
      return [];
    }

    try {
      const parsedHistory = JSON.parse(savedHistory);

      if (!Array.isArray(parsedHistory)) {
        return [];
      }

      return [...parsedHistory].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } catch {
      return [];
    }
  }, [historyKey]);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const monthName = now.toLocaleDateString("en-US", {
    month: "long",
  });

  const monthlyWorkouts = workoutHistory.filter((workout) => {
    const workoutDate = new Date(workout.date);

    return (
      workoutDate.getFullYear() === currentYear &&
      workoutDate.getMonth() === currentMonth
    );
  });

  const totalWorkouts = monthlyWorkouts.length;

  const totalSeconds = monthlyWorkouts.reduce((total, workout) => {
    return total + Number(workout.duration || 0);
  }, 0);

  const totalMinutes = Math.round(totalSeconds / 60);

  const totalHours = (totalSeconds / 3600).toFixed(1);

  const monthlyGoal = 20;

  const goalPercentage =
    monthlyGoal === 0
      ? 0
      : Math.min(
          100,
          Math.round((totalWorkouts / monthlyGoal) * 100)
        );


  const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const workoutDates = useMemo(() => {
    const dates = workoutHistory.map((workout) => {
      return getDateKey(new Date(workout.date));
    });

    return [...new Set(dates)];
  }, [workoutHistory]);


  const currentStreak = useMemo(() => {
    if (workoutDates.length === 0) {
      return 0;
    }

    const dateSet = new Set(workoutDates);

    const today = new Date();
    const todayKey = getDateKey(today);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayKey = getDateKey(yesterday);

    let currentDate;

    if (dateSet.has(todayKey)) {
      currentDate = new Date(today);
    } else if (dateSet.has(yesterdayKey)) {
      currentDate = new Date(yesterday);
    } else {
      return 0;
    }

    let streak = 0;

    while (dateSet.has(getDateKey(currentDate))) {
      streak++;

      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  }, [workoutDates]);



  const bestStreak = useMemo(() => {
    if (workoutDates.length === 0) {
      return 0;
    }

    const sortedDates = [...workoutDates].sort();

    let best = 1;
    let current = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const previousDate = new Date(sortedDates[i - 1]);
      const currentDate = new Date(sortedDates[i]);

      const difference =
        (currentDate - previousDate) /
        (1000 * 60 * 60 * 24);

      if (difference === 1) {
        current++;
        best = Math.max(best, current);
      } else {
        current = 1;
      }
    }

    return best;
  }, [workoutDates]);

  const consistency = goalPercentage;

  const recentWorkouts = workoutHistory.slice(0, 8);

  const hasWorkouts = workoutHistory.length > 0;

  

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  const getWorkoutMinutes = (workout) => {
    if (workout.durationMinutes) {
      return workout.durationMinutes;
    }

    const seconds = Number(workout.duration || 0);

    return Math.max(1, Math.round(seconds / 60));
  };



  return (
    <div className={`progress-page ${theme}-theme`}>
      <nav className="progress-navbar">
        <div
          className="progress-logo"
          onClick={onNavigateHome}
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

          <button
            className="progress-nav-button nav-active"
            onClick={() => onNavigate("progress")}
          >
            Progress
          </button>
        </div>

        <div className="progress-nav-right">
          <div className="progress-profile-circle">
            {user?.user_metadata?.full_name
              ?.split(" ")[0]
              ?.charAt(0)
              .toUpperCase() || "U"}
          </div>
        </div>
      </nav>

      <main className="progress-content">


        <header className="progress-header">
          <div>
            <div className="progress-status">
              <span></span>
              PERFORMANCE OVERVIEW
            </div>

            <h1>
              Track your progress<span>.</span>
            </h1>

            <p>
              See how consistently you train, how much time
              you have invested, and how close you are to
              your goals.
            </p>
          </div>

          <div className="progress-period">
            <span>CURRENT PERIOD</span>

            <strong>
              {monthName.toUpperCase()} {currentYear}
            </strong>
          </div>
        </header>


        <section className="progress-stats">
          <div className="progress-stat-card">
            <span>WORKOUTS THIS MONTH</span>

            <strong>{totalWorkouts}</strong>

            <p>of {monthlyGoal} monthly goal</p>
          </div>

          <div className="progress-stat-card">
            <span>CURRENT STREAK</span>

            <strong>{currentStreak}</strong>

            <p>
              {currentStreak === 1
                ? "day"
                : "consecutive days"}
            </p>
          </div>

          <div className="progress-stat-card">
            <span>TIME TRAINED</span>

            <strong>{totalHours}h</strong>

            <p>{totalMinutes} minutes this month</p>
          </div>

          <div className="progress-stat-card">
            <span>CONSISTENCY</span>

            <strong>{consistency}%</strong>

            <p>monthly goal progress</p>
          </div>
        </section>

        <section className="progress-goal-section">
          <div className="goal-panel">
            <div className="progress-panel-heading">
              <div>
                <span>MONTHLY TARGET</span>

                <h2>{monthlyGoal} Workouts</h2>
              </div>

              <strong>
                {totalWorkouts} / {monthlyGoal}
              </strong>
            </div>

            <div
              className="goal-circle"
              style={{
                background: `conic-gradient(
                  #7095b8 0 ${goalPercentage}%,
                  #202a33 ${goalPercentage}% 100%
                )`,
              }}
            >
              <div>
                <strong>{goalPercentage}%</strong>

                <span>COMPLETE</span>
              </div>
            </div>

            <p>
              {totalWorkouts >= monthlyGoal
                ? "Monthly workout goal completed. Keep pushing."
                : `${monthlyGoal - totalWorkouts} workout${
                    monthlyGoal - totalWorkouts === 1
                      ? ""
                      : "s"
                  } remaining to reach your monthly goal.`}
            </p>

            <div className="goal-bar">
              <div
                style={{
                  width: `${goalPercentage}%`,
                }}
              ></div>
            </div>
          </div>
        </section>

