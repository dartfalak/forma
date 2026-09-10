import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { supabase } from "./supabaseClient";

function Dashboard({ user, theme, onNavigate }) {
  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !sessionStorage.getItem("forma-dashboard-visited");
  });

  useEffect(() => {
    sessionStorage.setItem("forma-dashboard-visited", "true");
  }, []);

  const fullName = user?.user_metadata?.full_name || "User";
  const firstName = fullName.split(" ")[0];

  /* =========================================
     TASKS
  ========================================= */

  const defaultTasks = [
    {
      id: 1,
      text: "Complete today's workout",
      completed: false,
    },
    {
      id: 2,
      text: "Drink enough water",
      completed: false,
    },
    {
      id: 3,
      text: "Stretch for 10 minutes",
      completed: false,
    },
    {
      id: 4,
      text: "Get enough sleep",
      completed: false,
    },
  ];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("forma-tasks");

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch {
        return defaultTasks;
      }
    }

    return defaultTasks;
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("forma-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, task]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  const handleTaskKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const totalTasks = tasks.length;

  const dailyProgress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  /* =========================================
     SIGN OUT
  ========================================= */

  const [signOutError, setSignOutError] = useState("");

  const handleSignOut = async () => {
    setSignOutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);

      setSignOutError(
        "Unable to sign out. Please try again."
      );
    }
  };

  /* =========================================
     DATE
  ========================================= */

  const today = new Date();

  const dayName = today
    .toLocaleDateString("en-US", {
      weekday: "short",
    })
    .toUpperCase();

  const dayNumber = today.getDate();

  const monthName = today
    .toLocaleDateString("en-US", {
      month: "short",
    })
    .toUpperCase();

  const year = today.getFullYear();

  /* =========================================
     DAILY PROGRESS RING
  ========================================= */

  const progressRadius = 70;

  const circumference =
    2 * Math.PI * progressRadius;

  const progressOffset =
    circumference -
    (dailyProgress / 100) * circumference;

  return (
    <div className={`dashboard ${theme}-theme`}>

      {/* =====================================
          NAVBAR
      ===================================== */}

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          FORMA
        </div>

        <div className="dashboard-nav-center">

          <button
            type="button"
            className="dashboard-nav-button nav-active"
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() => onNavigate("workout")}
          >
            Workout
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() => onNavigate("progress")}
          >
            Progress
          </button>

        </div>

        <div className="dashboard-nav-right">

          <div className="profile-circle">
            {firstName
              .charAt(0)
              .toUpperCase()}
          </div>

          <button
            className="logout-button"
            onClick={handleSignOut}
          >
            Sign Out
          </button>

        </div>

      </nav>

      {signOutError && (
        <div className="signout-error">
          {signOutError}
        </div>
      )}

      <main className="dashboard-content">

        {/* =====================================
            HERO
        ===================================== */}

        <section className="dashboard-hero">

          <div className="hero-text">

            <div className="dashboard-status">
              <span className="status-dot"></span>
              TODAY
            </div>

            <h1>
              {isFirstVisit
                ? "Welcome,"
                : "Welcome back,"}
              <br />
              <span>{firstName}.</span>
            </h1>

            <p>
              Here's what you're working on today.
              <br />
              Keep going and stay consistent.
            </p>

          </div>

          <div className="hero-date">

            <span className="date-label">
              TODAY
            </span>

            <strong>
              {dayName}
            </strong>

            <span className="date-number">
              {dayNumber}
            </span>

            <span className="date-month">
              {monthName} {year}
            </span>

          </div>

        </section>

        {/* =====================================
            STATS
        ===================================== */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <span>
                WEEKLY PROGRESS
              </span>

              <span className="stat-icon">
                ↗
              </span>
            </div>

            <div className="stat-value">
              78%
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>

            <p>
              4 of 5 workouts completed
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">
              <span>
                WORKOUT STREAK
              </span>

              <span className="stat-icon">
                ✦
              </span>
            </div>

            <div className="stat-value">
              12 <small>days</small>
            </div>

            <p>
              Best streak this month
            </p>

          </div>

          <div className="stat-card">

            <div className="stat-top">
              <span>
                THIS MONTH
              </span>

              <span className="stat-icon">
                ◷
              </span>
            </div>

            <div className="stat-value">
              16
            </div>

            <p>
              workouts completed
            </p>

          </div>

        </section>

        {/* =====================================
            TODAY'S WORKOUT + CONSISTENCY
        ===================================== */}

        <section className="dashboard-main-grid">

          <div className="featured-workout">

            <div className="featured-overlay"></div>

            <div className="featured-content">

              <div className="featured-top">

                <span className="featured-label">
                  TODAY'S WORKOUT
                </span>

                <span className="featured-time">
                  45 MIN
                </span>

              </div>

              <div>

                <h2>
                  Upper Body
                </h2>

                <p>
                  Strength · Chest · Shoulders · Arms
                </p>

                <button
                  className="start-workout-button"
                  onClick={() =>
                    onNavigate("workout")
                  }
                >
                  Start Workout
                  <span>→</span>
                </button>

              </div>

            </div>

          </div>

          <div className="activity-panel consistency-panel">

            <div className="panel-heading">

              <div>

                <span>
                  CONSISTENCY
                </span>

                <h3>
                  This week
                </h3>

              </div>

              <span className="panel-value">
                4 / 5
              </span>

            </div>

            <div className="week-days">

              <div className="day completed">
                <span>M</span>
                <div>✓</div>
              </div>

              <div className="day completed">
                <span>T</span>
                <div>✓</div>
              </div>

              <div className="day completed">
                <span>W</span>
                <div>✓</div>
              </div>

              <div className="day completed">
                <span>T</span>
                <div>✓</div>
              </div>

              <div className="day today">
                <span>F</span>
                <div>•</div>
              </div>

              <div className="day">
                <span>S</span>
                <div></div>
              </div>

              <div className="day">
                <span>S</span>
                <div></div>
              </div>

            </div>

            <div className="consistency-message">
              <span>✦</span>
              One more workout to reach your weekly goal.
            </div>

          </div>

        </section>

        {/* =====================================
            NEW WORKOUT + PROGRESS FEATURES
        ===================================== */}

        <section className="dashboard-feature-grid">

          {/* WORKOUT OVERVIEW */}

          <div className="workout-overview-panel">

            <div className="feature-heading">

              <div>
                <span>
                  WORKOUT OVERVIEW
                </span>

                <h3>
                  Up next
                </h3>
              </div>

              <button
                className="view-link"
                onClick={() =>
                  onNavigate("workout")
                }
              >
                View Workout →
              </button>

            </div>

            <div className="workout-overview-content">

              <div className="workout-icon-box">
                ↗
              </div>

              <div className="workout-overview-info">

                <h4>
                  Lower Body
                </h4>

                <p>
                  Strength · Legs · Glutes
                </p>

                <div className="workout-meta">

                  <span>
                    ◷ 50 MIN
                  </span>

                  <span>
                    ◉ 6 EXERCISES
                  </span>

                  <span>
                    ◆ MODERATE
                  </span>

                </div>

              </div>

            </div>

            <div className="exercise-preview">

              <div>
                <span>01</span>
                <strong>Barbell Squat</strong>
              </div>

              <div>
                <span>02</span>
                <strong>Romanian Deadlift</strong>
              </div>

              <div>
                <span>03</span>
                <strong>Leg Press</strong>
              </div>

              <div>
                <span>04</span>
                <strong>Walking Lunges</strong>
              </div>

            </div>

            <button
              className="full-width-action"
              onClick={() =>
                onNavigate("workout")
              }
            >
              View Full Workout
              <span>→</span>
            </button>

          </div>

          {/* PROGRESS INSIGHTS */}

          <div className="progress-insights-panel">

            <div className="feature-heading">

              <div>
                <span>
                  PROGRESS INSIGHTS
                </span>

                <h3>
                  Your progress
                </h3>
              </div>

              <button
                className="view-link"
                onClick={() =>
                  onNavigate("progress")
                }
              >
                View Progress →
              </button>

            </div>

            <div className="progress-main-stat">

              <div>
                <span>
                  WEEKLY COMPLETION
                </span>

                <strong>
                  82%
                </strong>
              </div>

              <span className="progress-positive">
                +8%
              </span>

            </div>

            <div className="insight-bars">

              <div className="insight-row">
                <span>Mon</span>
                <div className="insight-bar">
                  <div
                    className="insight-fill"
                    style={{ width: "90%" }}
                  ></div>
                </div>
                <small>90%</small>
              </div>

              <div className="insight-row">
                <span>Tue</span>
                <div className="insight-bar">
                  <div
                    className="insight-fill"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <small>75%</small>
              </div>

              <div className="insight-row">
                <span>Wed</span>
                <div className="insight-bar">
                  <div
                    className="insight-fill"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <small>100%</small>
              </div>

              <div className="insight-row">
                <span>Thu</span>
                <div className="insight-bar">
                  <div
                    className="insight-fill"
                    style={{ width: "82%" }}
                  ></div>
                </div>
                <small>82%</small>
              </div>

              <div className="insight-row">
                <span>Fri</span>
                <div className="insight-bar">
                  <div
                    className="insight-fill today-fill"
                    style={{ width: "58%" }}
                  ></div>
                </div>
                <small>58%</small>
              </div>

            </div>

            <div className="progress-goal">

              <div className="goal-heading">
                <span>WEEKLY GOAL</span>
                <strong>4 / 5 workouts</strong>
              </div>

              <div className="goal-bar">
                <div className="goal-fill"></div>
              </div>

              <p>
                You're one workout away from your goal.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================
            RECENT ACTIVITY + QUICK ACTIONS
        ===================================== */}

        <section className="dashboard-activity-grid">

          <div className="recent-activity-panel">

            <div className="feature-heading">

              <div>
                <span>
                  RECENT ACTIVITY
                </span>

                <h3>
                  Latest workouts
                </h3>
              </div>

              <button
                className="view-link"
                onClick={() =>
                  onNavigate("progress")
                }
              >
                See All →
              </button>

            </div>

            <div className="recent-workout-list">

              <div className="recent-workout">

                <div className="recent-workout-number">
                  01
                </div>

                <div className="recent-workout-info">
                  <strong>
                    Upper Body
                  </strong>
                  <span>
                    Chest · Shoulders · Arms
                  </span>
                </div>

                <div className="recent-workout-time">
                  <strong>48 min</strong>
                  <span>Yesterday</span>
                </div>

              </div>

              <div className="recent-workout">

                <div className="recent-workout-number">
                  02
                </div>

                <div className="recent-workout-info">
                  <strong>
                    Lower Body
                  </strong>
                  <span>
                    Legs · Glutes · Core
                  </span>
                </div>

                <div className="recent-workout-time">
                  <strong>52 min</strong>
                  <span>Aug 30</span>
                </div>

              </div>

              <div className="recent-workout">

                <div className="recent-workout-number">
                  03
                </div>

                <div className="recent-workout-info">
                  <strong>
                    Full Body
                  </strong>
                  <span>
                    Strength · Conditioning
                  </span>
                </div>

                <div className="recent-workout-time">
                  <strong>44 min</strong>
                  <span>Aug 28</span>
                </div>

              </div>

            </div>

          </div>

          <div className="quick-actions-panel">

            <div className="feature-heading">

              <div>
                <span>
                  QUICK ACTIONS
                </span>

                <h3>
                  Keep moving
                </h3>
              </div>

            </div>

            <button
              className="quick-action"
              onClick={() =>
                onNavigate("workout")
              }
            >
              <div className="quick-action-icon">
                ↗
              </div>

              <div>
                <strong>
                  Start Workout
                </strong>

                <span>
                  Begin today's training
                </span>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

            <button
              className="quick-action"
              onClick={() =>
                onNavigate("progress")
              }
            >
              <div className="quick-action-icon">
                ↗
              </div>

              <div>
                <strong>
                  View Progress
                </strong>

                <span>
                  Check your performance
                </span>
              </div>

              <span className="quick-arrow">
                →
              </span>
            </button>

          </div>

        </section>

        {/* =====================================
            TODO + DAILY PROGRESS
        ===================================== */}

        <section className="dashboard-bottom">

          <div className="todo-panel">

            <div className="todo-heading">

              <div>

                <span>
                  TODAY
                </span>

                <h3>
                  To-Do List
                </h3>

              </div>

              <button
                className="clear-icon-button"
                onClick={clearAllTasks}
                title="Clear all tasks"
              >
                🗑
              </button>

            </div>

            <div className="todo-list">

              {tasks.length === 0 ? (

                <div className="empty-tasks">
                  No tasks for today.
                </div>

              ) : (

                tasks.map((task) => (

                  <div
                    className={`todo-item ${
                      task.completed
                        ? "task-completed"
                        : ""
                    }`}
                    key={task.id}
                  >

                    <button
                      className="task-check"
                      onClick={() =>
                        toggleTask(task.id)
                      }
                      aria-label="Complete task"
                    >
                      {task.completed
                        ? "✓"
                        : ""}
                    </button>

                    <span className="task-text">
                      {task.text}
                    </span>

                    <button
                      className="delete-task"
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      title="Delete task"
                    >
                      ×
                    </button>

                  </div>

                ))

              )}

            </div>

            <div className="add-task">

              <input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) =>
                  setNewTask(e.target.value)
                }
                onKeyDown={handleTaskKeyDown}
              />

              <button
                onClick={addTask}
                className="add-task-button"
              >
                Add New Task
              </button>

            </div>

            {tasks.length > 0 && (
              <button
                className="clear-all-button"
                onClick={clearAllTasks}
              >
                Clear All Tasks
              </button>
            )}

          </div>

          <div className="daily-progress-panel">

            <div className="daily-progress-heading">

              <span>
                TODAY'S PROGRESS
              </span>

              <h3>
                Daily Progress
              </h3>

            </div>

            <div className="progress-circle">

              <svg
                className="progress-ring"
                viewBox="0 0 160 160"
                aria-label={`Daily progress ${dailyProgress}%`}
              >

                <circle
                  className="progress-ring-track"
                  cx="80"
                  cy="80"
                  r={progressRadius}
                />

                <circle
                  className="progress-ring-value"
                  cx="80"
                  cy="80"
                  r={progressRadius}
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: progressOffset,
                  }}
                />

              </svg>

              <div className="progress-circle-inner">

                <strong>
                  {dailyProgress}%
                </strong>

                <span>
                  complete
                </span>

              </div>

            </div>

            <p className="progress-summary">
              {completedTasks} of {totalTasks} tasks completed
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;