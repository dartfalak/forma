import React from "react";
import "./Connect.css";

function Connect({ onGetStarted }) {
  return (
    <section className="connect-section" id="connect">

      <div className="connect-inner">

        <span className="connect-label">
          LET'S CONNECT
        </span>

        <h2>
          Let's build something
          <br />
          <span>stronger.</span>
        </h2>

        <p>
          Have a question, feedback, or simply want to
          learn more about FORMA? We'd love to hear from you.
        </p>

        <div className="connect-buttons">

          <button
            className="primary-button"
            onClick={onGetStarted}
          >
            Get Started
          </button>

          <a
            href="mailto:hello@forma.com"
            className="connect-email-button"
          >
            Email Us
          </a>

        </div>

        <div className="connect-links">

          <a href="mailto:hello@forma.com">
            Email
          </a>

          <span>•</span>

          <a href="#about">
            About FORMA
          </a>

          <span>•</span>

          <a href="#features">
            Features
          </a>

        </div>

      </div>

    </section>
  );
}

export default Connect;