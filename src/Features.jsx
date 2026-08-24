// import React from "react";
// import "./Features.css";

// function Features() {
//   return (
//     <>
  

//       <section className="features-section">

//         <div className="features-image">
//           <img
//             src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=85"
//             alt="Person working out"
//           />
//         </div>

//         <div className="features-content">

//           <span className="features-label">
//             PERSONALIZED FITNESS
//           </span>

//           <h2>
//             Train with
//             <br />
//             purpose.
//           </h2>

//           <p>
//             FORMA gives you a simple and focused way to
//             track your workouts, build consistency, and
//             become stronger over time.
//           </p>

//           <button className="primary-button">
//             Get Started
//           </button>

//         </div>

//       </section>



//       <section className="features-grid-section">

//         <div className="features-heading">

//           <span className="features-label">
//             BUILT AROUND YOU
//           </span>

//           <h2>
//             Everything you need
//             <br />
//             to keep moving.
//           </h2>

//         </div>


//         <div className="features-grid">

//           <div className="feature-card">

//             <span className="feature-number">
//               01
//             </span>

//             <h3>
//               Track
//             </h3>

//             <p>
//               Keep your workouts organized and
//               know exactly what you are doing.
//             </p>

//           </div>


//           <div className="feature-card">

//             <span className="feature-number">
//               02
//             </span>

//             <h3>
//               Progress
//             </h3>

//             <p>
//               Monitor your progress and stay
//               motivated as you become stronger.
//             </p>

//           </div>


//           <div className="feature-card">

//             <span className="feature-number">
//               03
//             </span>

//             <h3>
//               Consistency
//             </h3>

//             <p>
//               Build better habits and make
//               training a regular part of your life.
//             </p>

//           </div>

//         </div>

//       </section>


      

//       <section className="features-final">

//         <div className="features-final-image">

//           <img
//             src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=85"
//             alt="Gym training"
//           />

//         </div>


//         <div className="features-final-content">

//           <span className="features-label">
//             YOUR FITNESS. YOUR WAY.
//           </span>

//           <h2>
//             Make every
//             <br />
//             workout count.
//           </h2>

//           <p>
//             Stay focused, stay consistent, and
//             keep working toward the stronger
//             version of yourself.
//           </p>

//           <button className="primary-button">
//             Start Free Trial
//           </button>

//         </div>

//       </section>
//     </>
//   );
// }

// export default Features;

import React from "react";
import "./Features.css";

function Features() {
  return (
    <>
      {/* TRAIN WITH PURPOSE */}
<section className="features-section" id="features">
        <div className="features-image">
      <img
  src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=800&q=75"
  alt="Man training in a gym"
/>
        </div>

        <div className="features-content">

          <span className="features-label">
            PERSONALIZED FITNESS
          </span>

          <h2>
            Train with
            <br />
            purpose.
          </h2>

          <p>
            FORMA gives you a simple and focused way to
            track your workouts, build consistency, and
            become stronger over time.
          </p>

          <button className="primary-button">
            Get Started
          </button>

        </div>

      </section>


      {/* FEATURES GRID */}
      <section className="features-grid-section">

        <div className="features-heading">

          <span className="features-label">
            BUILT AROUND YOU
          </span>

          <h2>
            Everything you need
            <br />
            to keep moving.
          </h2>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <span className="feature-number">
              01
            </span>

            <h3>
              Track
            </h3>

            <p>
              Keep your workouts organized and
              know exactly what you are doing.
            </p>

          </div>


          <div className="feature-card">

            <span className="feature-number">
              02
            </span>

            <h3>
              Progress
            </h3>

            <p>
              Monitor your progress and stay
              motivated as you become stronger.
            </p>

          </div>


          <div className="feature-card">

            <span className="feature-number">
              03
            </span>

            <h3>
              Consistency
            </h3>

            <p>
              Build better habits and make
              training a regular part of your life.
            </p>

          </div>

        </div>

      </section>


      {/* MAKE EVERY WORKOUT COUNT */}
      <section className="features-final">

        <div className="features-final-image">

          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=70"
            alt="Gym training"
          />

        </div>


        <div className="features-final-content">

          <span className="features-label">
            YOUR FITNESS. YOUR WAY.
          </span>

          <h2>
            Make every
            <br />
            workout count.
          </h2>

          <p>
            Stay focused, stay consistent, and
            keep working toward the stronger
            version of yourself.
          </p>

          <button className="primary-button">
            Start Free Trial
          </button>

        </div>

      </section>

    </>
  );
}

export default Features;