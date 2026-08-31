

import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function SignUp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendConfirmation = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.functions.invoke(
      "send-confirmation-email",
      {
        body: {
          email: email,
        },
      }
    );

    setLoading(false);

    if (error) {
      console.error(error);
      setMessage("Failed to send confirmation email.");
      return;
    }

    setMessage("Confirmation email sent successfully!");
    setEmail("");
  };

  return (
    <div className="dashboard">

      <h1>Welcome to FORMA</h1>

      <p>
        Enter your email address to receive a confirmation email.
      </p>

      <form onSubmit={handleSendConfirmation}>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Confirmation"}
        </button>

      </form>

      {message && (
        <p>
          {message}
        </p>
      )}

    </div>
  );
}

export default SignUp;