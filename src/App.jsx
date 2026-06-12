import React from "react";

//  function App() {
//    return <h1>hello react</h1>;
//  }

//  export default App;

// function Profile(props) {
//   return <p>@{props.username}</p>;
// }

// function Post() {
//   const [likes, setLikes] = useState(12);

//   return (
//     <>
//       <p>{likes} Likes</p>
//       <button onClick={() => setLikes(likes + 1)}>
//         Like
//       </button>
//     </>
//   );
// }

// function Student({ name }) {
//   const [marks, setMarks] = useState(70);

//   return (
//     <>
//       <h2>{name}</h2>
//       <p>Marks: {marks}</p>
//       <button onClick={() => setMarks(marks + 5)}>
//         Extra Marks
//       </button>
//     </>
//   );
// }


// function App() {
//   const [count, setCount] = useState(0);

//   function showMessage() {
//     alert("Button Clicked!");
//   }

//   return (
//     <div>
//       <h1>Hello React</h1>

//       <h2>Count: {count}</h2>

//       <button onClick={() => setCount(count + 1)}>
//         Increment
//       </button>

//       <button onClick={showMessage}>
//         Click Me
//       </button>
//     </div>
//   );
// }




// function App() {
//   const isLoggedin = true;

//   return (
//     <div>
//       {isLoggedin && <h1>Hello</h1>}
//     </div>
//   );
// }


// function App() {
//   const hasItems = true;

//   return (
//     <div>
//       {hasItems && <p>Items in Cart</p>}
//     </div>
//   );
// }


// function App() {
//   const isAdmin = true;

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       {isAdmin && (
//         <button>Delete User</button>
//       )}
//     </div>
//   );
// }



// const age = 20;

// let result;

// if (age >= 18) {
//   result = "adult";
// } else {
//   result = "minor";
// }

// console.log(result);




// const schoolClosed = true;

// const message =
//   schoolClosed
//     ? "stay home"
//     : "go to school";

// console.log(message);



// let isLoggedIn = true;
// let isAdmin = true;

// console.log(isLoggedIn && isAdmin);


// const userRole = "admin";

// const isAdmin =
//   userRole === "admin";

// console.log(isAdmin);




// const people = [
//   "alice",
//   "bob",
//   "charlie"
// ];

// function PersonList() {
//   return (
//     <ul>
//       {people.map((person) => (
//         <li key={person}>
//           {person}
//         </li>
//       ))}
//     </ul>
//   );
// }



// const people = [
//   { id: 1, name: "alice" },
//   { id: 2, name: "bob" },
//   { id: 3, name: "charlie" }
// ];

// function PersonList() {
//   return (
//     <ul>
//       {people.map((person) => (
//         <li key={person.id}>
//           {person.name}
//         </li>
//       ))}
//     </ul>
//   );
// }


// function App() {
//   return (
//     <Profile username="falak" />
//   );
// }

// function Profile(props) {
//   return (
//     <p>@{props.username}</p>
//   );
// }


// function Profile(props) {
//   return (
//     <p>@{props.username}</p>
//   );
// }

// function Post() {
//   const [likes, setLikes] =
//     useState(12);

//   return (
//     <>
//       <p>{likes} Likes</p>

//       <button
//         onClick={() =>
//           setLikes(likes + 1)
//         }
//       >
//         Like
//       </button>
//     </>
//   );
// }

// function Student({ name }) {
//   const [marks, setMarks] =
//     useState(70);

//   return (
//     <>
//       <h2>{name}</h2>

//       <p>Marks: {marks}</p>

//       <button
//         onClick={() =>
//           setMarks(marks + 5)
//         }
//       >
//         Extra Marks
//       </button>
//     </>
//   );
// }

// function App() {
//   const [count, setCount] =
//     useState(0);

//   const isLoggedin = true;
//   const hasItems = true;
//   const isAdmin = true;

//   function showMessage() {
//     alert("Button Clicked!");
//   }

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "40px",
//         fontFamily: "Arial",
//       }}
//     >
//       <h1 style={{ color: "blue" }}>
//         Hello React
//       </h1>

//       <h2>Count: {count}</h2>

//       <button
//         onClick={() =>
//           setCount(count + 1)
//         }
//       >
//         Increment
//       </button>

//       <br />
//       <br />

//       <button onClick={showMessage}>
//         Click Me
//       </button>

//       <hr />

//       {isLoggedin && <h2>Hello</h2>}

//       {hasItems && (
//         <p>Items in Cart</p>
//       )}

//       {isAdmin && (
//         <button>
//           Delete User
//         </button>
//       )}

//       <hr />

//       <Profile username="falak" />

//       <hr />

//       <Post />

//       <hr />

//       <Student name="Falak" />
//     </div>
//   );
// }

// export default App;


// import {useRef} from "react";

// function App() {
//     const inputRef = useRef(null);


//     const showValue = () => {
//         alert(inputRef.current.value);


//       };
//  return (
//     <>
//     <input ref={inputRef} type="text"/>
//     <button onClick={showValue}>show content</button>
//     </>

//   );
// }

// export default App;

// import React, {useRef} from "react";

// function ClickCounter() {
//   const countRef = useRef(0);

//   const handleClick = () => {
//     countRef.current = countRef.current + 1;
//     alert ()
//   }
// }


// function App() {
//   return <Student name="adam" age={16}/>;
// }

// function Student(props) {
//   return (
//     <h2>
//     {props.name} is {props.age} years old
//     </h2>
//   );
// }

// export default App;

// import { useState } from "react";

// function App() {
//   const [isOn , setIsOn] = useState(false);

//   return (
//     <>
//     <h1>{isOn ? "ON" : "OFF"}</h1>

//     <button onClick={() => setIsOn(!isOn)}>
//       toggle
//     </button>
//     </>
//   );
// }

// export default App;

import { useState } from "react";

function App() {
  const [name, setName] = useState("adam");

  return (
    <>
    <h1>hi {name}!</h1>

    { <button onClick={() => setName("noah")}>
      change name
    </button> }

  <button onClick={() => setName("adam")}>
    reset 
  </button>
    </>
  );
}

export default App;