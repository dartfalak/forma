import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { supabase } from "./supabaseClient";

function Dashboard({ user,theme,setTheme}) {


  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !sessionStorage.getItem("forma-dashboard-visited");
  });

  useEffect(() => {
    sessionStorage.setItem("forma-dashboard-visited", "true");
  }, []);




  const fullName = user?.user_metadata?.full_name || "User";
  const firstName = fullName.split(" ")[0];


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

    const savedTasks = localStorage.getItem("forma-tasks");

    if (savedTasks) {
      return JSON.parse(savedTasks);
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
      completed: false
    };

    setTasks([...tasks, task]);

    setNewTask("");
  };


  const toggleTask = (id) => {

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };


  const deleteTask = (id) => {

    setTasks(
      tasks.filter((task) => task.id !== id)
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


  const [signOutError, setSignOutError] = useState("");


  const handleSignOut = async () => {

    setSignOutError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error);
      setSignOutError("Unable to sign out. Please try again.");
      return;
    }

    
    window.location.href = "/";
  };


  return (
  <div className={`dashboard ${theme}-theme`}>



      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          FORMA
        </div>
<button
  className="theme-toggle"
  onClick={() =>
    setTheme(theme === "dark" ? "light" : "dark")
  }
  aria-label="Toggle light and dark mode"
>
  <span className="theme-icon">
    {theme === "dark" ? "☀" : "☾"}
  </span>
</button>

        <div className="dashboard-nav-center">

          <span className="nav-active">
            Dashboard
          </span>

          <span>
            Workout
          </span>

          <span>
            Progress
          </span>

        </div>


        <div className="dashboard-nav-right">

          <div className="profile-circle">
            {firstName.charAt(0).toUpperCase()}
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


        

        <section className="dashboard-hero">

          <div className="hero-text">

            <div className="dashboard-status">
              <span className="status-dot"></span>
              TODAY
            </div>


            <h1>
              {isFirstVisit ? "Welcome," : "Welcome back,"}
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
              MON
            </strong>

            <span className="date-number">
              <span className="digit-zero">0</span>
              <span className="digit-one">1</span>
            </span>

            <span className="date-month">
              SEP 2<span className="digit-zero">0</span>2<span className="digit-six">6</span>
            </span>

          </div>

        </section>



  

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">
              <span>WEEKLY PROGRESS</span>
              <span className="stat-icon">↗</span>
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
              <span>WORKOUT STREAK</span>
              <span className="stat-icon">✦</span>
            </div>

            <div className="stat-value">
              <span className="digit-one">1</span>2 <small>days</small>
            </div>

            <p>
              Best streak this month
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>THIS MONTH</span>
              <span className="stat-icon">◷</span>
            </div>

            <div className="stat-value">
              <span className="digit-one">1</span>6
            </div>

            <p>
              workouts completed
            </p>

          </div>

        </section>



        

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

                <button className="start-workout-button">
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

          </div>

        </section>



        

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
                      task.completed ? "task-completed" : ""
                    }`}
                    key={task.id}
                  >

                    <button
                      className="task-check"
                      onClick={() => toggleTask(task.id)}
                      aria-label="Complete task"
                    >
                      {task.completed ? "✓" : ""}
                    </button>


                    <span className="task-text">
                      {task.text}
                    </span>


                    <button
                      className="delete-task"
                      onClick={() => deleteTask(task.id)}
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
                onChange={(e) => setNewTask(e.target.value)}
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


            <div
              className="progress-circle"
              style={{
                "--progress": `${dailyProgress * 3.6}deg`
              }}
            >

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