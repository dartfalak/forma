
import React, { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  function showMessage() {
    alert("Button Clicked!");
  }

  return (
    <div>
      <h1>Hello React</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={showMessage}>
        Click Me
      </button>
    </div>
  );
}




function App() {
  const isLoggedin = true;

  return (
    <div>
      {isLoggedin && <h1>Hello</h1>}
    </div>
  );
}


function App() {
  const hasItems = true;

  return (
    <div>
      {hasItems && <p>Items in Cart</p>}
    </div>
  );
}


function App() {
  const isAdmin = true;

  return (
    <div>
      <h1>Dashboard</h1>

      {isAdmin && (
        <button>Delete User</button>
      )}
    </div>
  );
}
*/

/*
========================================
EXAMPLE 5 - If Else
========================================

const age = 20;

let result;

if (age >= 18) {
  result = "adult";
} else {
  result = "minor";
}

console.log(result);
*/

/*
========================================
EXAMPLE 6 - Ternary Operator
========================================

const schoolClosed = true;

const message =
  schoolClosed
    ? "stay home"
    : "go to school";

console.log(message);
*/

/*
========================================
EXAMPLE 7 - Logical AND
========================================

let isLoggedIn = true;
let isAdmin = true;

console.log(isLoggedIn && isAdmin);
*/

/*
========================================
EXAMPLE 8 - Role Check
========================================

const userRole = "admin";

const isAdmin =
  userRole === "admin";

console.log(isAdmin);
*/

/*
========================================
EXAMPLE 9 - Array Mapping
========================================

const people = [
  "alice",
  "bob",
  "charlie"
];

function PersonList() {
  return (
    <ul>
      {people.map((person) => (
        <li key={person}>
          {person}
        </li>
      ))}
    </ul>
  );
}
*/

/*
========================================
EXAMPLE 10 - Objects Array
========================================

const people = [
  { id: 1, name: "alice" },
  { id: 2, name: "bob" },
  { id: 3, name: "charlie" }
];

function PersonList() {
  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>
          {person.name}
        </li>
      ))}
    </ul>
  );
}
*/

/*
========================================
EXAMPLE 11 - Props Example
========================================

function App() {
  return (
    <Profile username="falak" />
  );
}

function Profile(props) {
  return (
    <p>@{props.username}</p>
  );
}
*/

function Profile(props) {
  return (
    <p>@{props.username}</p>
  );
}

function Post() {
  const [likes, setLikes] =
    useState(12);

  return (
    <>
      <p>{likes} Likes</p>

      <button
        onClick={() =>
          setLikes(likes + 1)
        }
      >
        Like
      </button>
    </>
  );
}

function Student({ name }) {
  const [marks, setMarks] =
    useState(70);

  return (
    <>
      <h2>{name}</h2>

      <p>Marks: {marks}</p>

      <button
        onClick={() =>
          setMarks(marks + 5)
        }
      >
        Extra Marks
      </button>
    </>
  );
}

function App() {
  const [count, setCount] =
    useState(0);

  const isLoggedin = true;
  const hasItems = true;
  const isAdmin = true;

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
      <h1 style={{ color: "blue" }}>
        Hello React
      </h1>

      <h2>Count: {count}</h2>

      <button
        onClick={() =>
          setCount(count + 1)
        }
      >
        Increment
      </button>

      <br />
      <br />

      <button onClick={showMessage}>
        Click Me
      </button>

      <hr />

      {isLoggedin && <h2>Hello</h2>}

      {hasItems && (
        <p>Items in Cart</p>
      )}

      {isAdmin && (
        <button>
          Delete User
        </button>
      )}

      <hr />

      <Profile username="falak" />

      <hr />

      <Post />

      <hr />

      <Student name="Falak" />
    </div>
  );
}

export default App;
```
