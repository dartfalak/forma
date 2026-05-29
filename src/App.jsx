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

export default App;

function App() {

  const isLoggedin = true;

return (
  <div>
    {isLoggedin && <h1>hello</h1>}
  </div>

);


}

function App() {

  const hasItems = true;

return (
  <div>
  {hasItems && <p>items in cart</p>}
  </div>
  );

}

function App() {
  const isAdmin = true;

  return (
    <div>
  <h1>dashboard</h1>

  {isAdmin && <button>del user</button>}

    </div>
  );
}

let result;

if (age >= 18) {
  result = "adult";
} else {
  result = "minor";
}


const schoolClosed = true;

const message = schoolClosed ? "stay home & relax" : "go to school";

console.log(message);

let isAdmin = true;

isAdmin && console.log("admin panel");