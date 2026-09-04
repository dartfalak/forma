// // import React, { useState, useEffect } from "react";
// // import { supabase } from "./supabaseClient";
// // import "./App.css";

// // import Features from "./Features";
// // import About from "./About";
// // import Connect from "./Connect";
// // import AuthModal from "./AuthModal";
// // import SignUp from "./SignUp";
// // import Dashboard from "./Dashboard";

// // function App() {



// //   const [showAuth, setShowAuth] = useState(false);

// //   const [session, setSession] = useState(null);

  
// //   const [theme, setTheme] = useState(() => {
// //     return localStorage.getItem("forma-theme") || "dark";
// //   });


  
// //   useEffect(() => {
// //     localStorage.setItem("forma-theme", theme);
// //   }, [theme]);

// //   useEffect(() => {

  
// //   supabase.auth.getSession().then(({ data }) => {
// //     setSession(data.session);
// //   });


// //   const { data: listener } = supabase.auth.onAuthStateChange(
// //     (_event, session) => {
// //       setSession(session);
// //     }
// //   );

// //   return () => {
// //     listener.subscription.unsubscribe();
// //   };

// // }, []);


  
// //   const openAuth = () => {
// //     setShowAuth(true);
// //   };


  
// //   const closeAuth = () => {
// //     setShowAuth(false);
// //   };

// //   if (session) {
// //   return <SignUp.jsx />;
// // }

// //   return (
// //     <div className={`app ${theme}-theme`}>

// //       <nav className="navbar">

// //         <div className="logo">
// //           FORMA
// //         </div>

// // <div className="nav-links">

// //   <a href="#features">
// //     Features
// //   </a>

// //   <a href="#about">
// //     About
// //   </a>

// //   <a href="#connect">
// //     Connect
// //   </a>

// // </div>

    
// //     <button
// //   className="theme-toggle"
// //   onClick={() =>
// //     setTheme(theme === "dark" ? "light" : "dark")
// //   }
// //   aria-label="Toggle light and dark mode"
// // >
// //   <span className="theme-icon">
// //     {theme === "dark" ? "☀" : "☾"}
// //   </span>
// // </button>

        
// //         <button
// //           className="nav-button"
// //           onClick={openAuth}
// //         >
// //           Get Started
// //         </button>

// //       </nav>


// //       <main className="hero">

// //         <div className="badge">
// //           Built for a Stronger You
// //         </div>


// //         <h1>
// //           Train Hard.
// //           <br />
// //           Become Stronger.
// //         </h1>


// //         <p>
// //           Track your workouts, stay consistent, and reach your fitness
// //           goals with a simple gym experience built for you.
// //         </p>


// //         <div className="hero-buttons">

// //           <button
// //             className="primary-button"
// //             onClick={openAuth}
// //           >
// //             Start Free Trial
// //           </button>


// //           <button className="secondary-button">
// //             Learn More
// //           </button>

// //         </div>

// //       </main>


    

// //       <div id="features">
// //         <Features />
// //       </div>



// // <About />




// // <Connect onGetStarted={openAuth} />



// // {showAuth && (
// // <AuthModal
// //   onClose={closeAuth}
// //   theme={theme}
// // />
// // )}
// //     </div>
// //   );
// // }


// // export default App;

// import React, { useState, useEffect } from "react";
// import { supabase } from "./supabaseClient";
// import "./App.css";

// import Features from "./Features";
// import About from "./About";
// import Connect from "./Connect";
// import AuthModal from "./AuthModal";
// import SignUp from "./SignUp";
// import Dashboard from "./Dashboard";

// function App() {

//   const [showAuth, setShowAuth] = useState(false);

//   const [session, setSession] = useState(null);
//   console.log("SESSION:", session);

//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem("forma-theme") || "dark";
//   });

//   useEffect(() => {
//     localStorage.setItem("forma-theme", theme);
//   }, [theme]);

//   useEffect(() => {

//     supabase.auth.getSession().then(({ data }) => {
//       setSession(data.session);
//     });

// const { data: listener } = supabase.auth.onAuthStateChange(
//   (event, session) => {
//     console.log("AUTH EVENT:", event);
//     console.log("AUTH SESSION:", session);

//     setSession(session);
//   }
// );
//     return () => {
//       listener.subscription.unsubscribe();
//     };

//   }, []);

//   const openAuth = () => {
//     setShowAuth(true);
//   };

//   const closeAuth = () => {
//     setShowAuth(false);
//   };

// if (session) {
//   return <Dashboard session={session} />;
// }
//   return (
//     <div className={`app ${theme}-theme`}>

//       <nav className="navbar">

//         <div className="logo">
//           FORMA
//         </div>

//         <div className="nav-links">

//           <a href="#features">
//             Features
//           </a>

//           <a href="#about">
//             About
//           </a>

//           <a href="#connect">
//             Connect
//           </a>

//         </div>

//         <button
//           className="theme-toggle"
//           onClick={() =>
//             setTheme(theme === "dark" ? "light" : "dark")
//           }
//           aria-label="Toggle light and dark mode"
//         >
//           <span className="theme-icon">
//             {theme === "dark" ? "☀" : "☾"}
//           </span>
//         </button>

//         <button
//           className="nav-button"
//           onClick={openAuth}
//         >
//           Get Started
//         </button>

//       </nav>

//       <main className="hero">

//         <div className="badge">
//           Built for a Stronger You
//         </div>

//         <h1>
//           Train Hard.
//           <br />
//           Become Stronger.
//         </h1>

//         <p>
//           Track your workouts, stay consistent, and reach your fitness
//           goals with a simple gym experience built for you.
//         </p>

//         <div className="hero-buttons">

//           <button
//             className="primary-button"
//             onClick={openAuth}
//           >
//             Start Free Trial
//           </button>

//           <button className="secondary-button">
//             Learn More
//           </button>

//         </div>

//       </main>

//       <div id="features">
//         <Features />
//       </div>

//       <About />

//       <Connect onGetStarted={openAuth} />

//       {showAuth && (
//         <AuthModal
//           onClose={closeAuth}
//           theme={theme}
//         />
//       )}

//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

import Features from "./Features";
import About from "./About";
import Connect from "./Connect";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";

function App() {

  const [showAuth, setShowAuth] = useState(false);

  const [session, setSession] = useState(null);

  const [showDashboard, setShowDashboard] = useState(false);

  const [authLoading, setAuthLoading] = useState(true);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("forma-theme") || "dark";
  });

  useEffect(() => {

    localStorage.setItem("forma-theme", theme);

  }, [theme]);


  
  useEffect(() => {
supabase.auth.getSession().then(({ data }) => {

  setSession(data.session);

  if (window.location.hash === "#dashboard" && data.session) {

    setShowDashboard(true);

  }

  setAuthLoading(false);

});

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (event, session) => {

          setSession(session);


          if (event === "SIGNED_IN") {

            setShowDashboard(true);

            window.history.pushState(
              { page: "dashboard" },
              "",
              "#dashboard"
            );

          }


          if (event === "SIGNED_OUT") {

            setShowDashboard(false);

            window.history.replaceState(
              null,
              "",
              window.location.pathname
            );

          }

        }
      );




    const handlePopState = () => {

      if (window.location.hash === "#dashboard") {

        setShowDashboard(true);

      } else {

        setShowDashboard(false);

      }

    };


    window.addEventListener(
      "popstate",
      handlePopState
    );


    return () => {

      listener.subscription.unsubscribe();

      window.removeEventListener(
        "popstate",
        handlePopState
      );

    };

  }, []);



  const openAuth = () => {
    setShowAuth(true);
  };


  const closeAuth = () => {
    setShowAuth(false);
  };



  if (authLoading) {
  return null;
}

  if (session && showDashboard) {

    return (
    <Dashboard
  user={session.user}
  theme={theme}
  setTheme={setTheme}
/>
    );

  }



  return (

    <div className={`app ${theme}-theme`}>

      <nav className="navbar">

        <div className="logo">
          FORMA
        </div>


        <div className="nav-links">

          
          <a href="#home">
            Home
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#about">
            About
          </a>

          <a href="#connect">
            Connect
          </a>

        </div>


        <button
          className="theme-toggle"
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          aria-label="Toggle light and dark mode"
        >

          <span className="theme-icon">

            {theme === "dark"
              ? "☀"
              : "☾"}

          </span>

        </button>


        <button
          className="nav-button"
          onClick={openAuth}
        >
          Get Started
        </button>

      </nav>


      <main className="hero" id="home">

        <div className="badge">
          Built for a Stronger You
        </div>


        <h1>
          Train Hard.
          <br />
          Become Stronger.
        </h1>


        <p>
          Track your workouts, stay consistent,
          and reach your fitness goals with a
          simple gym experience built for you.
        </p>


        <div className="hero-buttons">

          <button
            className="primary-button"
            onClick={openAuth}
          >
            Start Free Trial
          </button>


          <button className="secondary-button">
            Learn More
          </button>

        </div>

      </main>


      <div id="features">
        <Features />
      </div>


      <About />


      <Connect
        onGetStarted={openAuth}
      />


      {showAuth && (

        <AuthModal
          onClose={closeAuth}
          theme={theme}
        />

      )}

    </div>

  );

}

export default App;