import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { supabase } from "./supabaseClient";

function Dashboard({
  user,
  theme,
  onNavigate,
  onNavigateHome,
  dataVersion
}) {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !sessionStorage.getItem(
      "forma-dashboard-visited"
    );
  });

  useEffect(() => {
    sessionStorage.setItem(
      "forma-dashboard-visited",
      "true"
    );
  }, []);

  const fullName =
    user?.user_metadata?.full_name || "User";

  const firstName =
    fullName.split(" ")[0];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(
      `forma-tasks-${user?.id}`
    );

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return [];
      }
    }

    return [
      {
        id: 1,
        text: "Complete today's workout",
        completed: false
      },
      {
        id: 2,
        text: "Drink enough water",
        completed: false
      },
      {
        id: 3,
        text: "Stretch for 10 minutes",
        completed: false
      },
      {
        id: 4,
        text: "Get enough sleep",
        completed: false
      }
    ];
  });

  const [newTask, setNewTask] = useState("");

  const [workouts, setWorkouts] = useState([]);

  const [signOutError, setSignOutError] =
    useState("");

  const historyKey =
    `forma-workout-history-${user?.id || "guest"}`;

  useEffect(() => {
    localStorage.setItem(
      `forma-tasks-${user?.id}`,
      JSON.stringify(tasks)
    );
  }, [tasks, user?.id]);

  useEffect(() => {
    const savedHistory =
      localStorage.getItem(historyKey);

    if (!savedHistory) {
      setWorkouts([]);
      return;
    }

    try {
      const parsed = JSON.parse(savedHistory);

      if (Array.isArray(parsed)) {
        setWorkouts(parsed);
      }
    } catch {
      setWorkouts([]);
    }
  }, [historyKey, dataVersion]);

  const today = new Date();

  const formatDate = () => {
    return today.toLocaleDateString(
      "en-US",
      {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );
  };

  const isToday = (dateString) => {
    const date = new Date(dateString);

    return (
      date.toDateString() ===
      new Date().toDateString()
    );
  };

  const workoutsThisWeek =
    workouts.filter((workout) => {
      const workoutDate =
        new Date(workout.date);

      const currentDate = new Date();

      const firstDay = new Date(currentDate);

      firstDay.setDate(
        currentDate.getDate() -
          currentDate.getDay() +
          1
      );

      firstDay.setHours(0, 0, 0, 0);

      return workoutDate >= firstDay;
    });

  const workoutsThisMonth =
    workouts.filter((workout) => {
      const workoutDate =
        new Date(workout.date);

      const currentDate = new Date();

      return (
        workoutDate.getMonth() ===
          currentDate.getMonth() &&
        workoutDate.getFullYear() ===
          currentDate.getFullYear()
      );
    });

  const weeklyGoal = 5;

  const weeklyPercentage = Math.min(
    Math.round(
      (workoutsThisWeek.length /
        weeklyGoal) *
        100
    ),
    100
  );

  const calculateStreak = () => {
    if (workouts.length === 0) {
      return 0;
    }

    const uniqueDays = [
      ...new Set(
        workouts.map((workout) =>
          new Date(workout.date).toDateString()
        )
      )
    ];

    const dates = uniqueDays
      .map((date) => new Date(date))
      .sort((a, b) => b - a);

    const todayDate = new Date();

    todayDate.setHours(0, 0, 0, 0);

    let streak = 0;

    let expectedDate =
      new Date(todayDate);

    for (const date of dates) {
      date.setHours(0, 0, 0, 0);

      const difference =
        Math.round(
          (expectedDate - date) /
            (1000 * 60 * 60 * 24)
        );

      if (difference === 0) {
        streak++;

        expectedDate.setDate(
          expectedDate.getDate() - 1
        );
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const dailyProgress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completedTasks /
            tasks.length) *
            100
        );

  const addTask = () => {
    const trimmedTask =
      newTask.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((previous) => [
      ...previous,
      {
        id: Date.now(),
        text: trimmedTask,
        completed: false
      }
    ]);

    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) =>
      previous.filter(
        (task) => task.id !== id
      )
    );
  };

  const clearTasks = () => {
    setTasks([]);
  };

  const handleSignOut = async () => {
    setSignOutError("");

    const { error } =
      await supabase.auth.signOut();

    if (error) {
      console.error(
        "Sign out error:",
        error
      );

      setSignOutError(
        "Unable to sign out. Please try again."
      );

      return;
    }
  };

  const latestWorkout =
    workouts.length > 0
      ? workouts[0]
      : null;

  return (
    <div className={`dashboard-page ${theme}-theme`}>

      <nav className="dashboard-navbar">

        <div
          className="dashboard-logo"
          onClick={onNavigateHome}
        >
          FORMA
        </div>

        <div className="dashboard-nav-center">

          <button
            className="dashboard-nav-button nav-active"
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("workout")
            }
          >
            Workout
          </button>

          <button
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("progress")
            }
          >
            Progress
          </button>

        </div>

        <div className="dashboard-nav-right">

          <div className="dashboard-profile-circle">
            {firstName
              .charAt(0)
              .toUpperCase()}
          </div>

          <button
            className="dashboard-signout"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

        </div>

      </nav>

      <main className="dashboard-content">

        <section className="dashboard-hero">

          <div>

            <div className="dashboard-status">
              <span></span>
              TODAY
            </div>

            <h1>
              {isFirstVisit
                ? "Welcome,"
                : "Welcome back,"}
              <br />
              {firstName}.
            </h1>

            <p>
              Stay consistent. Keep getting
              stronger.
            </p>

          </div>

          <div className="dashboard-date-card">

            <span>DATE</span>

            <strong>
              {formatDate()}
            </strong>

          </div>

        </section>

        <section className="dashboard-stats">

          <div className="stat-card stat-featured">

            <span>WEEKLY GOAL</span>

            <strong>
              {weeklyPercentage}%
            </strong>

            <p>
              {workoutsThisWeek.length} of{" "}
              {weeklyGoal} workouts completed
            </p>

          </div>

          <div className="stat-card">

            <span>WORKOUT STREAK</span>

            <strong>
              {streak}
            </strong>

            <p>
              {streak === 1
                ? "day"
                : "consecutive days"}
            </p>

          </div>

          <div className="stat-card">

            <span>THIS MONTH</span>

            <strong>
              {workoutsThisMonth.length}
            </strong>

            <p>
              workouts completed
            </p>

          </div>

        </section>

        <section className="dashboard-main-grid">

          <div className="featured-workout">

            <div className="section-label">
              TODAY'S WORKOUT
            </div>

            <div className="featured-workout-content">

              <div>

                <h2>
                  Upper Body
                </h2>

                <p>
                  Strength · Chest · Shoulders · Arms
                </p>

                {latestWorkout &&
                  isToday(
                    latestWorkout.date
                  ) && (
                    <span className="workout-completed-badge">
                      COMPLETED ✓
                    </span>
                  )}

              </div>

              <div className="featured-workout-meta">

                <strong>
                  45 MIN
                </strong>

                <button
                  onClick={() =>
                    onNavigate("workout")
                  }
                >
                  {latestWorkout &&
                  isToday(
                    latestWorkout.date
                  )
                    ? "View Workout"
                    : "Start Workout"}
                </button>

              </div>

            </div>

          </div>

          <div className="consistency-panel">

            <div className="section-label">
              WEEKLY GOAL
            </div>

            <div className="consistency-number">
              {workoutsThisWeek.length}
              <span>
                / {weeklyGoal}
              </span>
            </div>

            <p>
              {weeklyPercentage}% of your
              weekly workout goal
            </p>

            <div className="consistency-days">

              {[
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"
              ].map((day, index) => {

                const completed =
                  workoutsThisWeek[
                    workoutsThisWeek.length -
                      1 -
                      index
                  ];

                return (
                  <div
                    className={
                      completed
                        ? "day completed"
                        : "day"
                    }
                    key={day}
                  >
                    <span>
                      {day}
                    </span>

                    <strong>
                      {completed
                        ? "✓"
                        : "—"}
                    </strong>
                  </div>
                );
              })}

            </div>

          </div>

        </section>

        <section className="dashboard-bottom-grid">

          <div className="todo-panel">

            <div className="todo-heading">

              <div>

                <div className="section-label">
                  DAILY TASKS
                </div>

                <h2>
                  Stay on track.
                </h2>

              </div>

              <div className="todo-progress">
                {dailyProgress}%
              </div>

            </div>

            <div className="todo-list">

              {tasks.map((task) => (

                <div
                  className={
                    task.completed
                      ? "todo-item completed"
                      : "todo-item"
                  }
                  key={task.id}
                >

                  <button
                    className="todo-check"
                    onClick={() =>
                      toggleTask(task.id)
                    }
                  >
                    {task.completed
                      ? "✓"
                      : ""}
                  </button>

                  <span>
                    {task.text}
                  </span>

                  <button
                    className="todo-delete"
                    onClick={() =>
                      deleteTask(task.id)
                    }
                    aria-label="Delete task"
                  >
                    ×
                  </button>

                </div>

              ))}

            </div>

            <div className="todo-add">

              <input
                type="text"
                value={newTask}
                onChange={(event) =>
                  setNewTask(
                    event.target.value
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addTask();
                  }
                }}
                placeholder="Add a task..."
              />

              <button
                onClick={addTask}
              >
                Add
              </button>

              {tasks.length > 0 && (
                <button
                  className="todo-clear"
                  onClick={clearTasks}
                >
                  Clear All
                </button>
              )}

            </div>

          </div>

          <div className="daily-progress-panel">

            <div className="section-label">
              DAILY PROGRESS
            </div>

            <div className="daily-progress-circle">

              <div>

                <strong>
                  {dailyProgress}%
                </strong>

                <span>
                  COMPLETE
                </span>

              </div>

            </div>

            <p>
              {completedTasks} of{" "}
              {tasks.length} daily tasks
              completed.
            </p>

          </div>

        </section>

        {signOutError && (
          <p className="dashboard-signout-error">
            {signOutError}
          </p>
        )}

      </main>

    </div>
  );
}

export default Dashboard;