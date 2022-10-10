import React from "react";
import "./App.css";

import Dashboard from "./Dashboard/Dashboard";

const App: React.FC = () => {
  return (
      <div className="App">
        <div className='header-text'>Candidate Dashboard</div>
        <Dashboard />
      </div>
  );
};

export default App;
