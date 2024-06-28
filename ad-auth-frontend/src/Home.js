import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ ou, username }) => {
  const navigate = useNavigate();
  const logoUrl = 'C:\Users\sahil\Downloads\logo.png'; // Replace with your logo destination

  const handleQuizClick = () => {
    navigate('/quiz', { state: { username } });
  };

  return (
    <div>
      <header style={styles.header}>
        <img src={logoUrl} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Welcome to the Home Page!</h1>
      </header>
      <div style={styles.content}>
        {ou === 'Mumbai' && (
          <button style={styles.button} onClick={handleQuizClick}>Take Quiz</button>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#88000C',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    height: '50px',
    marginRight: '20px',
  },
  title: {
    color: 'white',
    margin: 0,
  },
  content: {
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#88000C',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
};

export default Home;
