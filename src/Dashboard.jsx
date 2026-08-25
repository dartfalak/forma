
import React from "react";
import { supabase } from "./supabaseClient";

function Dashboard() {

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div>
      <h1>Welcome to FORMA</h1>

      <p>You are successfully logged in.</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;