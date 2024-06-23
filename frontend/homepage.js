import React from 'react';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
    const history = useHistory();

    const handleLogout = () => {
        history.push('/login');
    };

    return (
        <div>
            <h2>Welcome to Home Page</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
