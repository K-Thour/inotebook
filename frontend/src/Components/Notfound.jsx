import React from 'react';
import { Link } from 'react-router-dom'; // for navigation back to home or other pages
const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" style={styles.link}>Go Back to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
  },
  header: {
    fontSize: '48px',
    color: '#FF6347', // Tomato color
  },
  message: {
    fontSize: '20px',
    margin: '20px 0',
  },
  link: {
    fontSize: '18px',
    color: '#007BFF',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NotFound;
