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

  /* -----------------------------
     MONTHLY DATA
  ----------------------------- */

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

  /* -----------------------------
     DATE HELPERS
  ----------------------------- */

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

  /* -----------------------------
     CURRENT STREAK
  ----------------------------- */

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

  /* -----------------------------
     THIS WEEK
  ----------------------------- */

  const weekDays = useMemo(() => {
    const today = new Date();

    // Convert JS Sunday-first index into Monday-first index.
    const mondayOffset =
      today.getDay() === 0 ? -6 : 1 - today.getDay();

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      return {
        name: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        key: getDateKey(date),
        isToday: getDateKey(date) === getDateKey(today),
      };
    });
  }, []);

  const workoutDateSet = useMemo(() => {
    return new Set(workoutDates);
  }, [workoutDates]);

  const weeklyWorkoutCount = useMemo(() => {
    return weekDays.filter((day) =>
      workoutDateSet.has(day.key)
    ).length;
  }, [weekDays, workoutDateSet]);

  /* -----------------------------
     RECENT WORKOUTS
  ----------------------------- */

  const recentWorkouts = workoutHistory.slice(0, 8);

  const hasWorkouts = workoutHistory.length > 0;

  const getWorkoutMinutes = (workout) => {
    if (workout.durationMinutes) {
      return workout.durationMinutes;
    }

    const seconds = Number(workout.duration || 0);

    return Math.max(1, Math.round(seconds / 60));
  };

  const formatRecentDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  /* -----------------------------
     NAVIGATION
  ----------------------------- */

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
        {/* HEADER */}

        <header className="progress-header">
          <div className="progress-header-main">
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

        {/* SMALL STATS ROW */}

        <section className="progress-stats-row">
          <div className="progress-inline-stat">
            <span>WORKOUTS</span>
            <strong>{totalWorkouts}</strong>
            <small>this month</small>
          </div>

          <div className="progress-inline-stat">
            <span>CURRENT STREAK</span>
            <strong>{currentStreak}</strong>
            <small>
              {currentStreak === 1
                ? "day"
                : "days"}
            </small>
          </div>

          <div className="progress-inline-stat">
            <span>TOTAL TIME</span>
            <strong>{totalHours}h</strong>
            <small>{totalMinutes} minutes</small>
          </div>
        </section>

        {/* MONTHLY GOAL */}

        <section className="monthly-goal-section">
          <div className="section-label">
            MONTHLY GOAL
          </div>

          <div className="monthly-goal-top">
            <div>
              <h2>{monthlyGoal} Workouts</h2>
            </div>

            <strong className="monthly-goal-count">
              {totalWorkouts} / {monthlyGoal}
            </strong>
          </div>

          <div className="monthly-goal-content">
            <div
              className="goal-circle"
              style={{
                background: `conic-gradient(
                  #7095b8 0 ${goalPercentage}%,
                  #202a33 ${goalPercentage}% 100%
                )`,
              }}
            >
              <div className="goal-circle-inner">
                <strong>{goalPercentage}%</strong>
                <span>COMPLETE</span>
              </div>
            </div>

            <div className="monthly-goal-details">
              <p>
                {totalWorkouts >= monthlyGoal
                  ? "Monthly workout goal completed."
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
          </div>
        </section>

        {/* ACTIVITY THIS WEEK */}

        <section className="weekly-activity">
          <div className="section-heading-row">
            <div>
              <span className="section-label">
                ACTIVITY THIS WEEK
              </span>
            </div>

            <strong className="weekly-count">
              {weeklyWorkoutCount}{" "}
              {weeklyWorkoutCount === 1
                ? "WORKOUT"
                : "WORKOUTS"}
            </strong>
          </div>

          <div className="weekly-days">
            {weekDays.map((day) => {
              const completed = workoutDateSet.has(
                day.key
              );

              return (
                <div
                  className={`weekly-day ${
                    day.isToday ? "is-today" : ""
                  } ${
                    completed ? "is-complete" : ""
                  }`}
                  key={day.key}
                >
                  <span>{day.name}</span>

                  <div className="weekly-day-marker">
                    {completed ? "✓" : ""}
                  </div>

                  {day.isToday && (
                    <small>TODAY</small>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* RECENT WORKOUTS */}

        <section className="recent-workouts-section">
          <div className="section-heading-row">
            <div>
              <span className="section-label">
                TRAINING HISTORY
              </span>

              <h2>Recent workouts</h2>
            </div>

            {workoutHistory.length > 8 && (
              <span className="view-all-label">
                VIEW ALL
              </span>
            )}
          </div>

          {!hasWorkouts ? (
            <div className="progress-empty-state">
              <div className="progress-empty-icon">
                —
              </div>

              <h3>No workouts recorded yet</h3>

              <p>
                Complete your first workout and your
                training history will appear here.
              </p>

              <button
                onClick={() => onNavigate("workout")}
              >
                Start Workout
              </button>
            </div>
          ) : (
            <div className="recent-workouts-list">
              {recentWorkouts.map((workout, index) => {
                return (
                  <div
                    className="recent-workout-row"
                    key={
                      workout.id ||
                      `${workout.date}-${index}`
                    }
                  >
                    <div className="recent-workout-info">
                      <h3>
                        {workout.name || "Workout"}
                      </h3>

                      <span>
                        {formatRecentDate(workout.date)}
                        {" · "}
                        {workout.type || "Training"}
                      </span>
                    </div>

                    <div className="recent-workout-duration">
                      {getWorkoutMinutes(workout)} min
                    </div>

                    <div className="recent-workout-arrow">
                      →
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* CONSISTENCY */}

        {hasWorkouts && (
          <section className="consistency-section">
            <div className="section-label">
              CONSISTENCY
            </div>

            <div className="consistency-values">
              <div>
                <span>CURRENT STREAK</span>
                <strong>{currentStreak} days</strong>
              </div>

              <div>
                <span>THIS WEEK</span>
                <strong>
                  {weeklyWorkoutCount}{" "}
                  {weeklyWorkoutCount === 1
                    ? "workout"
                    : "workouts"}
                </strong>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Progress;