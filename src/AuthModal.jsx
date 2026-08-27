
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

    if (isSignUp) {

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      setLoading(false);

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage(
        "Account created successfully. Please check your email."
      );

    } else {

      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

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


  const handleGoogleLogin = async () => {

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setMessage(error.message);
    }
  };


  return (
    <div className={`auth-overlay ${theme}-theme`}>

  <div className="auth-modal">

        <button
          className="auth-close"
          onClick={onClose}
        >
          ×
        </button>


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


        <form onSubmit={handleSubmit}>

          {isSignUp && (
            <div className="auth-field">

              <label>
                Name
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

            </div>
          )}


          <div className="auth-field">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


       <div className="auth-field">

  <label>
    Password
  </label>

  <div className="password-wrapper">

    <input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <Eye className="eye-icon" />: <EyeOff className="eye-icon"/>}
    </button>

  </div>

</div>


          {isSignUp && (
<div className="auth-field">

  <label>
    Confirm Password
  </label>

  <div className="password-wrapper">

    <input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="••••••••"
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(e.target.value)
      }
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      aria-label={
        showConfirmPassword
          ? "Hide confirm password"
          : "Show confirm password"
      }
    >
      {showConfirmPassword ?  <Eye className="eye-icon"/>: <EyeOff className="eye-icon"/>}
    </button>

  </div>

</div>
          )}


          {message && (
            <div className="auth-message">
              {message}
            </div>
          )}


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


        <div className="auth-divider">
          <span>or</span>
        </div>


        <button
          className="google-button"
          onClick={handleGoogleLogin}
        >
          <span className="google-icon">
            G
          </span>

          Continue with Google
        </button>


        <div className="auth-switch">

          {isSignUp ? (
            <>
              Already have an account?

              <button
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

