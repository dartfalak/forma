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
  src="https://images.pexels.com/videos/34901407/pictures/preview-0.jpg?auto=compress&cs=tinysrgb&w=800"
  alt="Man lifting weights in a gym"
/>
      </div>

    </section>
  );
}

export default About;