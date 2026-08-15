import React, { use } from "react";

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

// import { useState } from "react";

// function App() {
//   const [name, setName] = useState("adam");

//   return (
//     <>
//     <h1>hi {name}!</h1>

//     { <button onClick={() => setName("noah")}>
//       change name
//     </button> }

//   <button onClick={() => setName("adam")}>
//     reset 
//   </button>
//     </>
//   );
// }

// export default App;


// import { useState } from "react";

// function App() {
//   const isLoggedIn = true;

// return (
//   <>
//   <h1>
//     {isLoggedIn ? "welcome back!" : "please log in"}
//     </h1>
//     </>
//   );
// }

// export default App;


// import { useEffect } from "react";

// function App() {

//   useEffect(() =>
//     alert("hello!"), []
//   );

//   return (
//     <h1>hello react</h1>
//   );
// }

// export default App;

// import { createContext , useContext } from "react";

// const ColorContext = createContext("blue"); 

// function Box() {
//   const color = useContext(ColorContext); 
 
//   return <h1>
//     {color} 
//   </h1>
// }

// function App() {
//   return <Box/>; 
// } 

// export default App;

    
// import { NameContext } from  "./NameContext";
// import Child from "./Child";

// function App() {
//   const user = {
//     name: "adam"
//   };
//   return (
//     <NameContext.Provider value= {user}>
//       <Child />
//     </NameContext.Provider>
//   );
// }

// export default App;


// import { useReducer } from "react";

// function reducer(score, action) {
//   if(action == "add") {
//     return score + 1;
//   }
//   return score;
// }
// export default function App() {
//   const[score, dispatch] = useReducer(reducer, 0);

//  return (
//   <div>
//  <h1>{score}</h1>

//  <button onClick={() => dispatch("add")}>
//   Add point
//  </button>
//  </div>
//  );
// }

 

// import { useReducer } from "react";

// function  reducer(likes, action ) {
//  if(action === "like") {
//   return likes + 1;
//  }
//  if( action === "unlike") {
//   return likes - 1;
//  }
//  return likes;
// }

// export default function App() {
//   const [likes,dispatch] = useReducer(reducer, 0);

// return (
//   <div>
//    <h1>Likes : {likes}</h1>

// <button onClick={() => dispatch("like")}>
//   like
// </button>

// <button onClick={() => dispatch("unlike")}>
//   unlike
//   </button>
// </div>
//   );
// }


// import { useMemo , useState} from "react";

// // function App() {
// //   const [count, setCount] = useState(0);

// //   const square = useMemo(() => {
// //     return count * count;
// //   }, [count]);

// //   return (
// //     <>
// //     <h2>{square}</h2>

// //     <button onClick={() => setCount(count + 1)}>
// //       increase
// //     </button>
// //     </>
// //   ); 
// // }


// function App() {
//   const [count,setCount] = useState(0);
//    const [input,setInput] = useState(0);


//    function expensiveTask(num) {
//     console.log("inside expensive task");
//     for(let i=0; i<=1000000; i++) {}
//     return num*2;
//    }

//    let doubleValue = useMemo(() => expensiveTask(input),[input]);

//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>
//         increase
//       </button>

//       <div>
// //         Count:{count}
// //       </div>
// //       <input 
// //       type='number'
// //       placeholder='enter number'
// //       value={input}
// //       onChange={(e) => setInput(e.target.value)}/>
// //     </div>
// //   );
// // }

// // export default App;

//  import { useEffect , useState} from "react";

// // function App() {
// //   useEffect(() => {
// //     console.log("fetching users...")
// //   }, []);
// //   return <h1>Users</h1>
// // }

// function App() {
 
//   const [score, setScore] = useState(0);

//   useEffect(() => {
//     alert("executes on every render cycle")
//   });

//   function increaseScore() {
//     setScore(score + 1);
//   }

  
//   return (
//     <div>
//       <button onClick={increaseScore}>
//         add point
//       </button>

// <p>Score : {score}</p>
//     </div>
//   );
// }


// export default App;

    // function App() {
    //   const [count, setCount] = useState(0);

    //   useEffect(() => {
    //     console.log("page loaded")
    //   },[]);

    //   return (
    //     <>
    //     <h1>{count}</h1>

    //     <button onClick={() => setCount(count + 1)}>
    //       add
    //     </button>
    //     </>
    //   );

    // }


//     // export default App;

// import TimerComponent from "./TimerComponent";


//  function App() {
// //   const [count, setCount] = useState(0);
// //   const [total, setTotal] = useState(1);

// // useEffect(() => {
// //   alert("runs whenever count or total changes")
// // }, [count, total])

// // function handleClick() {
// //   setCount(count + 1);
// // }

// // function handleClickTotal() {
// //   setTotal(total + 1);
// // }


// // return (
// // <div>
// //   {/* {<LoggerComponent/>} */}
// //   {/* { <TimerComponent/>  }  */}


// // {/* //     <button onClick ={handleClick}>
// // //       update count
// // //     </button>


// // //         <button onClick ={handleClickTotal}>
// // //       update total
// // //     </button> */}
// //    </div>
// //  );
// //  }

// //  export default App;

// // import './App.css'

// // import { useState } from "react";

// // function App() {

// //  const [ text, setText] = useState("click me");

// //  function handleClick() {
// //   setText("clicked");
// //  }
   
// //  return (
// //   <button onClick={handleClick}>
// //     {text}
// //   </button>
// // //  )


// // //   return (
// // //     <div>
// // //         <button onClick={() => alert("button clicked")}>
// // //           Click me
// // //         </button>
       
// // //        {/* <form onSubmit={handleSubmit}>
// // //         <input type="text"
// // //          onChange={(e) => handleInputChange(e)}/>
// // //         <button type='submit'>submit</button>
    
        
// // //          </form>  */}

// // //     </div>
  
// //   );
// // }

// // export default App;


// // import { useState } from "react";

// // function App() {
// //   const [name, setName] = useState("");


// //   return (
// //     <div>
// //       <input 
// //       value={name}
// //       onChange={(e) => setName(e.target.value)}
// //       placeholder="enter your name"
// //       />

// //       <h2>hello, {name}</h2>
// //     </div>
// //   );
// // // }

// // // export default App;


// // // import { useRef } from "react";

// // // function App() {
// // //   const inputRef = useRef();

// // //   function handleClick() {
// // //     alert("your name is:" + inputRef.current.value);
// // //   }

// // //   return (
// // //     <>
// // //     <h2>uncontrolled component</h2>
// // //     <input
// // // //     ref={inputRef}
// // // //     placeholder="enter your name"
// // // //       />

// // // //     <button onClick={handleClick}>
// // // //       submit
// // // //     </button>
// // // //     </>
// // // //   );
// // // // }

// // // // export default App;

// // // function Greeting(props) {
// // //   return (
// // //     <div>
// // //     {props.render("falak")}
// // //     </div>
// // //   );
// // // }

// // // function App() {
// // //   return (
// // //     <Greeting
// // //     render={(name) => <h1>hello,{name}!</h1>}
// // // //     />

// // // //   );
// // // // }

// // // // export default App;


 
// // // import { useState } from 'react';
// // // // import './App.css'
// // //  import TemperatureInput from './TemperatureInput'
// // // import TemperatureDisplay from './TemperatureDisplay'

// // // function App() {

// // //   const [ temp, setTemp] = useState("");


// // //   return (
// // //     <>   
// // //      <TemperatureInput temp={temp} setTemp={setTemp}/>
// // //      <TemperatureDisplay temp={temp} />

// // //     </>
// // //   );
// // // }

// // // export default App;


// // import { useState } from "react";

// // function App() {
// //   const [name] = useState("falak");

// //   function sayHello() {
// //     alert(`hi ${name}`);
  
// //   }
// //   return (
// //     <button onClick={sayHello}>
// //       say hello
// //     </button>
// //   );
// // }

// // export default App;

// import { useMemo, useState } from "react";

// function App() {
  
//   const [number,setNumber] = useState(5);

//    const [count,setCount] = useState(0);

//    const square = useMemo(() => {
//    console.log("calculating value");
//   return number * number;
// },[number]);

// return (
//   <div>
//     <h1>count: {count}</h1>
//     <h1>number:{number}</h1>
//     <h1>square:{square}</h1>


//     <button onClick={() => setNumber(number + 1)}>
//       increase number
//     </button>

    
//     <button onClick={() => setCount(count + 1)}>
//       increase count
//     </button>
//   </div>
//   );
// }

// export default App;

// import { useReducer } from "react";

// function bankReducer(state,action) {

//   switch(action.type) {

//     case "deposit":
//     return {
//       balance: state.balance + action.amount
//     };

//     case "withdraw":
//     return {
//       balance: state.balance - action.amount
//     };

//     default:
//       return state;
//    }

// }

// import { useReducer } from 'react';

// function lightReducer(state, action) {

//   switch (action.type) {
//     case "turnOn":
//       return true;

//       case "turnOff":
//         return false;

// //       default:
// //         return state;
// //   }

// // }


// import { useReducer } from 'react';

    
// function App() {
//   const [isOn, dispatch] = useReducer(lightReducer, false);


//   return (
//     <div>
//       <h1>
//         {isOn ? "Light is ON:" : "Light is OFF"}
//       </h1>


//       <button onClick={() => dispatch({type:
//       "turnOn"})}>
//         Turn On
//       </button>

      
//       <button onClick={() => dispatch({type:
//       "turnOff"})}>
//         Turn Off
//       </button>
//     </div>
//   );
// }

// export default App;

 

// function App() {

//   const names = ["Sam" , "Anna" , "Alex"];

//   return (
//     <div>
//       <ul>
//         {names.map((name) => (
//           <li>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// export default App;


// import { useState } from "react";

// function App() {
//   const [search, setSearch] = useState("");


//   return (
//     <>
//     <input type="text"
//      placeholder="search...."
//      value={search} 
//      onChange={(e) => setSearch(e.target.value)}
//      />

//      <h2>searching for: {search}</h2>
//     </>
//   );
// }


// export default App;

// function App() {
//   const names = ["emma" , "anna" , "sophia"];

//   const allNames = [...names, "john"];


//   return (
//     <div>
//    <p>{allNames}</p>
     
//     </div>
//   );
// }

// export default App;


// function Student({name, ...details}) {
//   return (
//     <div>
//       <h2>{name}</h2>
//       <p>age: {details.age}</p>
//       <p>class: {details.className}</p>
//     </div>
//   );
// }


// function App() {
//   return (
//     <div>
//       <Student
//       name="liyanna"
//       age={16}
//       className="10th"
//       subject="computer science"
//       />
//     </div>
//   );
// }

// export default App;


// import { useId } from "react";

// function SignUpForm() {
//   const nameId = useId();
//   const emailId = useId();
//   const passwordId = useId();

//   return (
//     <div>
//       <div>
//         <label htmlFor="{nameId}">name</label>
//         <input id={nameId} type="text" />
//       </div>

//          <div>
//         <label htmlFor="{emailId}">email</label>
//         <input id={emailId} type="email" />
//       </div>

//          <div>
//         <label htmlFor="{passwordId}">password</label>
//         <input id={passwordId} type="password" />
//       </div>

//       <button>Sign Up</button>
//     </div>
//   );
// }


// export default SignUpForm;

// import { useState } from "react";

// function App() {
//   const [name, setName] = useState("");

//   return (
//     <div>
//       <Input name={name}
//       setName={setName}/>
//       <Greeting name={name}/>
//     </div>
//   );
// }

// function Input({ name, setName}) {
//   return (
//     <input 
//     value={name}
//     onChange={(e) =>
//       setName(e.target.value)}
//       placeholder="enter your name"
//       />
//   );
// }

// function Greeting({name}) {
//   return <h2>hi {name}</h2>
// }


// export default App;


import { useEffect, useState } from "react";

function App() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => setPosts(data));
  },[]);

  return (
  <div>
    <h1>post feed</h1>

    {posts.map((post) => (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        </div>
    ))}
  </div>
}

export default App;