import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Landing />
      </div>
    </Router>
  );
}

export default App;
