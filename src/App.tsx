import React from "react";
import "./App.css";
import Calculator from "./components/Calculator";
import History from "./components/History";
function App() {
  return (
    <div className="App">
      <div className="app-container">
        <Calculator />
        <History />
      </div>
    </div>
  );
}

export default App;
