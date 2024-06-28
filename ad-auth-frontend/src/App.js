import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Home from './Home';
import Quiz from './Quiz';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState({ ou: '', username: '' });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm setAuthenticated={setAuthenticated} setUserData={setUserData} />} />
        {authenticated && (
          <>
            <Route path="/home" element={<Home ou={userData.ou} username={userData.username} />} />
            <Route path="/quiz" element={<Quiz username={userData.username} />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;