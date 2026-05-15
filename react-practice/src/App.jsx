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
      Click Me
    </button>
  );
}

export default ButtonExample;