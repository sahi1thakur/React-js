import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setAuthenticated={setAuthenticated} />} />
        {authenticated && <Route path="/home" element={<Home />} />}
      </Routes>
    </Router>
  );
};

export default App;
