import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">

      <div className="about-content">

        <span className="about-label">
          ABOUT FORMA
        </span>

        <h2>
          Built for the
          <br />
          stronger you.
        </h2>

        <p>
          FORMA is designed to make fitness simple, focused,
          and consistent. No unnecessary complexity. Just the
          tools you need to train better and keep progressing.
        </p>

        <p>
          Whether you're just starting your fitness journey or
          working toward your next goal, FORMA helps you stay
          focused on what matters.
        </p>

        <button className="primary-button">
          Get Started
        </button>

      </div>


      <div className="about-image">

        <img
         src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=75"
         alt="Man performing a deadlift"
/>
      </div>

    </section>
  );
}

export default About;