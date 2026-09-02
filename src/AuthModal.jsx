import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import "./AuthModal.css";
import {
  Eye,
  EyeOff,
} from "lucide-react";

function AuthModal({ onClose, theme }) {

  const [isSignUp, setIsSignUp] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");

    if (loading) {
      return;
    }


    /* =========================
       SIGN UP
    ========================= */

    if (isSignUp) {

      const cleanName = name.trim();
      const cleanEmail = email.trim();


      if (!cleanName) {
        setMessage("Please enter your name.");
        return;
      }


      if (!cleanEmail) {
        setMessage("Please enter your email.");
        return;
      }


      if (password.length < 6) {
        setMessage("Password must be at least 6 characters.");
        return;
      }


      if (!confirmPassword) {
        setMessage("Please confirm your password.");
        return;
      }


      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }


      setLoading(true);


      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password: password,

        options: {
          data: {
            full_name: cleanName,
          },
        },
      });


      setLoading(false);


      if (error) {
        setMessage(error.message);
        return;
      }


      setMessage(
        "Account created. Check your email to confirm your account."
      );


      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    }


    /* =========================
       SIGN IN
    ========================= */

    else {

      const cleanEmail = email.trim();


      if (!cleanEmail) {
        setMessage("Please enter your email.");
        return;
      }


      if (!password) {
        setMessage("Please enter your password.");
        return;
      }


      setLoading(true);


      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });


      console.log("SIGN IN DATA:", data);
      console.log("SIGN IN ERROR:", error);


      setLoading(false);


      if (error) {
        setMessage(error.message);
        return;
      }


      setMessage("Signed in successfully!");


      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };


  /* =========================
     GOOGLE LOGIN
  ========================= */

  const handleGoogleLogin = async () => {

    if (loading) {
      return;
    }

    setLoading(true);
    setMessage("");


    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });


    if (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };


  return (
    <div className={`auth-overlay ${theme}-theme`}>

      <div className="auth-modal">


        {/* CLOSE BUTTON */}

        <button
          className="auth-close"
          onClick={onClose}
        >
          ×
        </button>


        {/* HEADER */}

        <div className="auth-header">

          <span className="auth-label">
            FORMA
          </span>

          <h2>
            {isSignUp
              ? "Start your journey."
              : "Welcome back."}
          </h2>

          <p>
            {isSignUp
              ? "Create your account and start training with purpose."
              : "Sign in to continue your fitness journey."}
          </p>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>


          {/* NAME */}

          {isSignUp && (

            <div className="auth-field">

              <label>
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />

            </div>

          )}


          {/* EMAIL */}

          <div className="auth-field">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="auth-field">

            <label>
              Password
            </label>

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword
                  ? <Eye className="eye-icon" />
                  : <EyeOff className="eye-icon" />
                }

              </button>

            </div>

          </div>


          {/* CONFIRM PASSWORD */}

          {isSignUp && (

            <div className="auth-field">

              <label>
                Confirm Password
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >

                  {showConfirmPassword
                    ? <Eye className="eye-icon" />
                    : <EyeOff className="eye-icon" />
                  }

                </button>

              </div>

            </div>

          )}


          {/* MESSAGE */}

          {message && (

            <div className="auth-message">
              {message}
            </div>

          )}


          {/* SUBMIT */}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading
              ? "Please wait..."
              : isSignUp
              ? "Create Account"
              : "Sign In"}

          </button>

        </form>


        {/* DIVIDER */}

        <div className="auth-divider">
          <span>or</span>
        </div>


        {/* GOOGLE */}

        <button
          type="button"
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >

          <span className="google-icon">
            G
          </span>

          Continue with Google

        </button>


        {/* SWITCH SIGN UP / SIGN IN */}

        <div className="auth-switch">

          {isSignUp ? (

            <>

              Already have an account?

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setMessage("");
                }}
              >
                Sign in
              </button>

            </>

          ) : (

            <>

              Don't have an account?

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setMessage("");
                }}
              >
                Sign up
              </button>

            </>

          )}

        </div>


      </div>

    </div>
  );
}

export default AuthModal;