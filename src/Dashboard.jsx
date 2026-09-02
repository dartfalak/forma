import React from "react";
import "./Dashboard.css";


function Dashboard({ session }) {

  const fullName = session?.user?.user_metadata?.full_name || "User";
const firstName = fullName.split(" ")[0];

  return (
    <div className="dashboard">

      

      <nav className="dashboard-navbar">

        <div className="dashboard-logo">
          FORMA
        </div>

        <div className="dashboard-nav-center">
          <span className="nav-active">Dashboard</span>
          <span>Workout</span>
          <span>Progress</span>
        </div>

        <div className="dashboard-nav-right">
          
<div className="profile-circle">
  {firstName.charAt(0).toUpperCase()}
</div>
          <button className="logout-button">
            Sign Out
          </button>

        </div>

      </nav>


    

      <main className="dashboard-content">


    

        <section className="dashboard-hero">

          <div className="hero-text">

            <div className="dashboard-status">
              <span className="status-dot"></span>
              YOUR FITNESS JOURNEY
            </div>

            <h1>
              Welcome back,
              <br />
              <span>{firstName}.</span>
            </h1>

            <p>
              Train with purpose. Stay consistent.
              <br />
              Keep becoming stronger.
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
              01
            </span>

            <span className="date-month">
              SEP 2026
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
              12 <small>days</small>
            </div>

            <p>
              Personal best this month
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">
              <span>THIS MONTH</span>
              <span className="stat-icon">◷</span>
            </div>

            <div className="stat-value">
              16
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


          

          <div className="quick-actions">

            <div className="section-heading">

              <div>
                <span>QUICK ACCESS</span>
                <h3>
                  Keep moving.
                </h3>
              </div>

            </div>


            <div className="action-list">

              <button className="action-card">

                <div className="action-icon">
                  ↗
                </div>

                <div className="action-text">
                  <strong>
                    Workout
                  </strong>

                  <span>
                    Start your next session
                  </span>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>


              <button className="action-card">

                <div className="action-icon">
                  ◒
                </div>

                <div className="action-text">
                  <strong>
                    Progress
                  </strong>

                  <span>
                    See your performance
                  </span>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>


              <button className="action-card">

                <div className="action-icon">
                  ◇
                </div>

                <div className="action-text">
                  <strong>
                    Profile
                  </strong>

                  <span>
                    Manage your goals
                  </span>
                </div>

                <span className="action-arrow">
                  →
                </span>

              </button>

            </div>

          </div>

        </section>


  

        <section className="dashboard-bottom">


          

          <div className="activity-panel">

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


        

          <div className="activity-panel">

            <div className="panel-heading">

              <div>
                <span>
                  RECENT ACTIVITY
                </span>

                <h3>
                  Your latest sessions
                </h3>
              </div>

              <button className="view-all">
                View all →
              </button>

            </div>


            <div className="recent-item">

              <div className="recent-icon">
                ✓
              </div>

              <div className="recent-info">

                <strong>
                  Upper Body
                </strong>

                <span>
                  Yesterday · 48 min
                </span>

              </div>

              <span className="recent-status">
                Completed
              </span>

            </div>


            <div className="recent-item">

              <div className="recent-icon">
                ✓
              </div>

              <div className="recent-info">

                <strong>
                  Lower Body
                </strong>

                <span>
                  Aug 30 · 52 min
                </span>

              </div>

              <span className="recent-status">
                Completed
              </span>

            </div>

          </div>

        </section>


      </main>

    </div>
  );
}

export default Dashboard;