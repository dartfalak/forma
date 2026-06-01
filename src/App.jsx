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

const message = schoolClosed ? "stay home" : "go to school";

console.log(message);


let isLoggedIn = true;
let isAdmin = true;

console.log (isLoggedIn && isAdmin);

const userRole = "admin";

const isAdmin = userRole === "admin";

console.log(isAdmin);


const people = ["alice", "bob", "charlie"];

function isPersonInList(name) {
  return (
    <ul>
      {people.map((person) => (
        <li>{person}</li>
      ))}
    </ul>
  );
}


const people = [
{id: 1, name: "alice"},
{id: 2, name: "bob"},
{id: 3, name: "charlie"},
];

function isPersonInList(name) {
  return (
    <ul>
      {people.map((person) => (
        <li key={person.id}>{person.name}</li>
      ))}
    </ul>
  );
}
  
//parent component
function App() {
  return <Profile username="falak"/>;
}

//child comp
function Profile(props) {
  return <p>@{props.username}</p>
}

import { useState } from "react";

function Post() {
  const[likes,setLikes] = useState(12);


  return (
    <>
    <p>{likes} likes</p>
    <button onClick={() => setLikes(likes + 1)}>
      Like 
    </button>
  </>

}

