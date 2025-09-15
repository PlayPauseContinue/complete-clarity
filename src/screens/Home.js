import React, { useState } from 'react';
import QR from '../components/QR';

const Home = () => {
  const [showQR, setShowQR] = useState(false);

  const handleGenerateClick = () => {
    setShowQR(true);
  };

  const handleComingSoonClick = () => {
    alert('This tool is coming soon!');
  };

  if (showQR) {
    return <QR />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Welcome to CompleteClarity Free Online Tools
      </h1>
      <div style={styles.cardContainer}>
        <div
          style={{ ...styles.card, cursor: 'pointer' }}
          onClick={handleGenerateClick}>
          <h2 style={styles.cardTitle}>Generate QR Code</h2>
          <p style={styles.cardDesc}>Create custom QR codes instantly.</p>
        </div>

        <div
          style={{ ...styles.card, cursor: 'not-allowed', opacity: 0.6 }}
          onClick={handleComingSoonClick}>
          <h2 style={styles.cardTitle}>Coming Soon</h2>
          <p style={styles.cardDesc}>More free tools are on the way!</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    color: '#2a3d66',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '2rem',
  },
  cardContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '2rem',
    width: '250px',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: '0.5rem',
  },
  cardDesc: {
    marginTop: 0,
    color: '#555',
  },
};

export default Home;
