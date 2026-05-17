function App() {
  return (
    <div>
      <h1>hello react </h1>
    </div>
  )
}

export default App

const element = <h1>hello react </h1>

function ButtonExample() {
  function showMessage() {
    alert("button clicked!");
  }

  return (
    <button onClick={showMessage}>
      click Me
    </button>
  );
}

export default ButtonExample;


import React, { useState } from 'react';

function App() {
  const[count,setCount] = useState(2);

  return(
    <div>
      <h2>count: {count}</h2>
      <button onClick={()=>
      setCount(count + 1)}>
      increment
      </button>
    </div>
  );
}

import React from "react";

function Hello() {
  return (
  <div>
    <h2>hello</h2>
    <p>stateless functional comp</p>
  </div>

  );
}

export default Hello;

import React, {Component} from "react";

class Counter extends Component {
  constructor() {
  super();
  this.state = {
    count:0
  };
}

increaseCount = () => {
  this.setState({
    count: this.state.count + 1
  });
};

render() {
  return (
    <div>
      <h2>Count: {this.state.count}</h2>
      <button onClick={this.IncreaseCount}>
        increase
      </button>
    </div>
    );
  }
}

export default Counter;