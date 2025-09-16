import React, { useState } from 'react';
import QR from '../components/QR';
import ImageCompressor from '../screens/ImageCompressor'; // Adjust path as needed
import Quotes from '../components/Quotes';
import TextToSpeech from '../screens/TextToSpeech';

const Home = () => {
  const [activeTool, setActiveTool] = useState(null);

  const handleGenerateClick = () => {
    setActiveTool('qr');
  };

  const handleImageCompressorClick = () => {
    setActiveTool('compressor');
  };
  const handleTextToSpeechClick = () => {
    setActiveTool('tts');
  };

  const handleComingSoonClick = () => {
    alert('This tool is coming soon!');
  };

  if (activeTool === 'qr') {
    return <QR />;
  }

  if (activeTool === 'compressor') {
    return <ImageCompressor />;
  }
  if (activeTool === 'tts') {
    return <TextToSpeech />;
  }

  return (
    <div style={styles.container}>
      {/* <Quotes /> */}
      <h1 style={styles.heading}>Free Online Tools</h1>
      <h2>Unlimited Downloads. No Watermarks.</h2>
      <div style={styles.cardContainer}>
        <div
          style={{ ...styles.card, cursor: 'pointer' }}
          onClick={handleGenerateClick}>
          <h2 style={styles.cardTitle}>Generate QR Code</h2>
          <p style={styles.cardDesc}>Create custom QR codes instantly.</p>
        </div>
        <div
          style={{ ...styles.card, cursor: 'pointer' }}
          onClick={handleImageCompressorClick}>
          <h2 style={styles.cardTitle}>Image Compressor</h2>
          <p style={styles.cardDesc}>Reduce image size in KB and download.</p>
        </div>
        <div
          style={{ ...styles.card, cursor: 'pointer' }}
          onClick={handleTextToSpeechClick}>
          <h2 style={styles.cardTitle}>Text To Speech</h2>
          <p style={styles.cardDesc}>
            Convert any text into natural speech instantly
          </p>
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
