
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
    const dates = workoutHistory
      .map((workout) => {
        const date = new Date(workout.date);

        if (Number.isNaN(date.getTime())) {
          return null;
        }

        return getDateKey(date);
      })
      .filter(Boolean);

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

  const recentWorkouts = workoutHistory.slice(0, 6);

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
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onNavigateHome();
            }
          }}
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
          <div>
            <div className="progress-status">
              <span></span>
              PERFORMANCE OVERVIEW
            </div>

            <h1>
              Track your <span>progress.</span>
            </h1>

            <p>
              Monitor your training consistency, time invested,
              and progress toward your monthly goal.
            </p>
          </div>

          <div className="progress-period">
            <span>CURRENT PERIOD</span>

            <strong>
              {monthName.toUpperCase()} {currentYear}
            </strong>
          </div>
        </header>

        {/* KEY METRICS */}
        <section className="progress-stats">
          <div className="progress-stat-card">
            <span>WORKOUTS</span>
            <strong>{totalWorkouts}</strong>
            <p>of {monthlyGoal} monthly goal</p>
          </div>

          <div className="progress-stat-card">
            <span>STREAK</span>
            <strong>{currentStreak}</strong>
            <p>
              {currentStreak === 1
                ? "consecutive day"
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
            <strong>{goalPercentage}%</strong>
            <p>monthly goal progress</p>
          </div>
        </section>

        {/* MAIN PROGRESS AREA */}
        <section className="progress-main-section">

          {/* MONTHLY GOAL */}
          <div className="goal-panel">
            <div className="section-label">
              MONTHLY TARGET
            </div>

            <div className="goal-heading">
              <div>
                <h2>{monthlyGoal} Workouts</h2>

                <p>
                  {totalWorkouts} of {monthlyGoal} completed
                </p>
              </div>

              <strong>{goalPercentage}%</strong>
            </div>

            <div className="goal-progress-track">
              <div
                className="goal-progress-fill"
                style={{
                  width: `${goalPercentage}%`,
                }}
              ></div>
            </div>

            <div className="goal-footer">
              <span>0</span>

              <span>{monthlyGoal} workouts</span>
            </div>

            <div className="goal-status">
              {totalWorkouts >= monthlyGoal
                ? "Monthly target completed."
                : `${monthlyGoal - totalWorkouts} workout${
                    monthlyGoal - totalWorkouts === 1
                      ? ""
                      : "s"
                  } remaining`}
            </div>
          </div>

          {/* RECENT WORKOUTS */}
          <div className="history-panel">
            <div className="history-header">
              <div>
                <div className="section-label">
                  TRAINING HISTORY
                </div>

                <h2>Recent workouts</h2>
              </div>

              <span>
                {workoutHistory.length} TOTAL
              </span>
            </div>

            {!hasWorkouts ? (
              <div className="progress-empty-state">
                <div className="progress-empty-icon">
                  —
                </div>

                <h3>No workouts recorded</h3>

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
              <div className="history-list">
                {recentWorkouts.map((workout, index) => {
                  const completedExercises =
                    Number(
                      workout.completedExercises || 0
                    );

                  const totalExercises =
                    Number(
                      workout.totalExercises ||
                        workout.exercises?.length ||
                        0
                    );

                  const completionPercentage =
                    Number(
                      workout.completionPercentage || 0
                    );

                  return (
                    <div
                      className="history-item"
                      key={
                        workout.id ||
                        `${workout.date}-${index}`
                      }
                    >
                      <div
                        className={`history-icon ${
                          completionPercentage >= 100
                            ? "completed"
                            : ""
                        }`}
                      >
                        {completionPercentage >= 100
                          ? "✓"
                          : "•"}
                      </div>

                      <div className="history-info">
                        <h3>
                          {workout.name || "Workout"}
                        </h3>

                        <span>
                          {formatDate(workout.date)}
                          {" · "}
                          {workout.type || "Training"}
                          {" · "}
                          {completedExercises}/
                          {totalExercises} exercises
                        </span>
                      </div>

                      <strong>
                        {getWorkoutMinutes(workout)} min
                      </strong>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}

export default Progress;

