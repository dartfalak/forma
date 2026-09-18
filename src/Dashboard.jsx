import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { supabase } from "./supabaseClient";

function Dashboard({
  user,
  theme = "dark",
  onNavigate,
  onNavigateHome,
  dataVersion
}) {

  /* =========================
     WELCOME MESSAGE
  ========================= */

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !sessionStorage.getItem("forma-dashboard-visited");
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


  /* =========================
     TASKS
  ========================= */

  const defaultTasks = [
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

  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("forma-tasks");

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
    localStorage.setItem(
      "forma-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);


  const addTask = () => {
    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      task
    ]);

    setNewTask("");
  };


  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
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
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
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


  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const totalTasks = tasks.length;

  const dailyProgress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );


  /* =========================
     SIGN OUT
  ========================= */

  const [signOutError, setSignOutError] =
    useState("");

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


  /* =========================
     DATE
  ========================= */

  const today = new Date();

  const dayName =
    today.toLocaleDateString("en-US", {
      weekday: "short"
    }).toUpperCase();

  const dayNumber =
    today.getDate();

  const monthName =
    today.toLocaleDateString("en-US", {
      month: "short"
    }).toUpperCase();

  const year =
    today.getFullYear();


  /* =========================
     WORKOUT HISTORY
  ========================= */

  const [workoutHistory, setWorkoutHistory] =
    useState([]);


  useEffect(() => {

    const userId =
      user?.id || "guest";

    const storageKey =
      `forma-workout-history-${userId}`;

    const savedHistory =
      localStorage.getItem(storageKey);

    if (!savedHistory) {
      setWorkoutHistory([]);
      return;
    }

    try {
      const parsedHistory =
        JSON.parse(savedHistory);

      if (Array.isArray(parsedHistory)) {
        setWorkoutHistory(parsedHistory);
      } else {
        setWorkoutHistory([]);
      }

    } catch (error) {

      console.error(
        "Unable to read workout history:",
        error
      );

      setWorkoutHistory([]);
    }

  }, [user, dataVersion]);


  /* =========================
     DATE HELPERS
  ========================= */

  const getDateKey = (date) => {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");

    const day =
      String(
        date.getDate()
      ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };


  const getWorkoutDate = (workout) => {

    if (!workout?.date) {
      return null;
    }

    const date =
      new Date(workout.date);

    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return date;
  };


  /* =========================
     WORKOUT DATE SET
  ========================= */

  const workoutDateKeys =
    new Set(
      workoutHistory
        .map(getWorkoutDate)
        .filter(Boolean)
        .map(getDateKey)
    );


  /* =========================
     CURRENT WEEK
     MONDAY - SATURDAY
  ========================= */

  const getMonday = (date) => {

    const result =
      new Date(date);

    result.setHours(
      0,
      0,
      0,
      0
    );

    const day =
      result.getDay();

    const difference =
      day === 0
        ? -6
        : 1 - day;

    result.setDate(
      result.getDate() + difference
    );

    return result;
  };


  const monday =
    getMonday(today);


  const weekDays =
    Array.from(
      { length: 6 },
      (_, index) => {

        const date =
          new Date(monday);

        date.setDate(
          monday.getDate() + index
        );

        return date;
      }
    );


  /* =========================
     WEEKLY WORKOUT COUNT
  ========================= */

  const weekStart =
    new Date(monday);

  const weekEnd =
    new Date(monday);

  weekEnd.setDate(
    weekEnd.getDate() + 7
  );


  const weeklyWorkouts =
    workoutHistory.filter(
      (workout) => {

        const workoutDate =
          getWorkoutDate(workout);

        if (!workoutDate) {
          return false;
        }

        return (
          workoutDate >= weekStart &&
          workoutDate < weekEnd
        );
      }
    );


  /*
    FORMA'S WEEKLY GOAL = 5 WORKOUTS
  */

  const weeklyGoal = 5;

  const weeklyWorkoutCount =
    Math.min(
      weeklyWorkouts.length,
      weeklyGoal
    );


  const weeklyProgress =
    Math.min(
      100,
      Math.round(
        (weeklyWorkoutCount /
          weeklyGoal) *
          100
      )
    );


  /* =========================
     MONTHLY WORKOUT COUNT
  ========================= */

  const monthlyWorkoutCount =
    workoutHistory.filter(
      (workout) => {

        const workoutDate =
          getWorkoutDate(workout);

        if (!workoutDate) {
          return false;
        }

        return (
          workoutDate.getFullYear() ===
            today.getFullYear() &&
          workoutDate.getMonth() ===
            today.getMonth()
        );
      }
    ).length;


  /* =========================
     DAY STATUS
  ========================= */

  const isToday =
    (date) =>
      getDateKey(date) ===
      getDateKey(today);


  const isWorkoutCompleted =
    (date) =>
      workoutDateKeys.has(
        getDateKey(date)
      );


  /* =========================
     DAILY PROGRESS CIRCLE
  ========================= */

  const progressRadius = 70;

  const circumference =
    2 *
    Math.PI *
    progressRadius;

  const progressOffset =
    circumference -
    (dailyProgress / 100) *
      circumference;


  /* =========================
     RENDER
  ========================= */

  return (
    <div
      className={`dashboard ${theme}-theme`}
    >

      {/* =========================
          NAVBAR
      ========================= */}

      <nav className="dashboard-navbar">

        <div
          className="dashboard-logo"
          onClick={onNavigateHome}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {

            if (
              e.key === "Enter" ||
              e.key === " "
            ) {
              onNavigateHome();
            }

          }}
        >
          FORMA
        </div>


        <div className="dashboard-nav-center">

          <button
            type="button"
            className="dashboard-nav-button nav-active"
            onClick={() =>
              onNavigate("dashboard")
            }
          >
            Dashboard
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("workout")
            }
          >
            Workout
          </button>

          <button
            type="button"
            className="dashboard-nav-button"
            onClick={() =>
              onNavigate("progress")
            }
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


      {/* =========================
          MAIN
      ========================= */}

      <main className="dashboard-content">

        {/* HERO */}

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


        {/* =========================
            STATS
        ========================= */}

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
              {weeklyProgress}%
            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${weeklyProgress}%`
                }}
              ></div>

            </div>

            <p>
              {weeklyWorkoutCount} of{" "}
              {weeklyGoal} workouts completed
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
              {monthlyWorkoutCount}
            </div>

            <p>
              workouts completed
            </p>

          </div>

        </section>


        {/* =========================
            MAIN GRID
        ========================= */}

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


          {/* =========================
              CONSISTENCY
          ========================= */}

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
                {weeklyWorkoutCount} / {weeklyGoal}
              </span>

            </div>


            <div className="week-days">

              {weekDays.map(
                (date) => {

                  const completed =
                    isWorkoutCompleted(
                      date
                    );

                  const current =
                    isToday(date);

                  const weekday =
                    date
                      .toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short"
                        }
                      )
                      .charAt(0);

                  return (

                    <div
                      className={`day ${
                        completed
                          ? "completed"
                          : ""
                      } ${
                        current
                          ? "today"
                          : ""
                      }`}
                      key={getDateKey(date)}
                    >

                      <span>
                        {weekday}
                      </span>

                      <div>
                        {completed
                          ? "✓"
                          : current
                            ? "•"
                            : ""}
                      </div>

                    </div>

                  );

                }
              )}

            </div>

          </div>

        </section>


        {/* =========================
            BOTTOM
        ========================= */}

        <section className="dashboard-bottom">

          {/* TODO */}

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
