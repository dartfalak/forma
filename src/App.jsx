import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

import Features from "./Features";
import About from "./About";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";
import Workout from "./Workout";
import Progress from "./Progress";

function getDashboardPageFromHash() {
  if (window.location.hash === "#workout") {
    return "workout";
  }

  if (window.location.hash === "#progress") {
    return "progress";
  }

  return "dashboard";
}

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [session, setSession] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [dashboardPage, setDashboardPage] = useState(
    getDashboardPageFromHash()
  );

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("forma-theme") || "dark";
  });

  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    localStorage.setItem("forma-theme", theme);
  }, [theme]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);

      const currentHash = window.location.hash;

      if (
        data.session &&
        (currentHash === "#dashboard" ||
          currentHash === "#workout" ||
          currentHash === "#progress")
      ) {
        setShowDashboard(true);
        setDashboardPage(getDashboardPageFromHash());
      }

      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);

        if (event === "SIGNED_IN") {
          setShowDashboard(true);
          setDashboardPage("dashboard");

          window.history.pushState(
            { page: "dashboard" },
            "",
            "#dashboard"
          );
        }

        if (event === "SIGNED_OUT") {
          setShowDashboard(false);
          setDashboardPage("dashboard");

          window.history.replaceState(
            null,
            "",
            window.location.pathname + "#home"
          );
        }
      }
    );

    const handlePopState = () => {
      const page = getDashboardPageFromHash();

      if (
        window.location.hash === "#dashboard" ||
        window.location.hash === "#workout" ||
        window.location.hash === "#progress"
      ) {
        setDashboardPage(page);
        setShowDashboard(true);
      } else {
        setShowDashboard(false);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      listener.subscription.unsubscribe();
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const openAuth = () => {
    setShowAuth(true);
  };

  const closeAuth = () => {
    setShowAuth(false);
  };

  const navigateDashboard = (page) => {
    const validPages = ["dashboard", "workout", "progress"];

    if (!validPages.includes(page)) {
      return;
    }

    setDashboardPage(page);
    setShowDashboard(true);

   