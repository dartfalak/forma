import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function showMessage() {
    alert("Button Clicked!");
  }

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "blue" }}>Hello React</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <br />
      <br />

        <button onClick={showMessage}>
        Click Me
      </button>
    </div>
  );
}

