import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <nav>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/generate-qr" style={styles.link}>
          Generate QR
        </Link>
      </nav>
      <div style={styles.copy}>© 2025 CompleteClarity Web Tools</div>
    </footer>
  );
};

const styles = {
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50px', // fixed height
    lineHeight: '50px', // vertical centering
    backgroundColor: '#2a3d66',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 1.5rem',
    zIndex: 1000,
  },
  link: {
    color: 'white',
    marginRight: '1rem',
    textDecoration: 'none',
    fontWeight: '600',
    cursor: 'pointer',
  },
  copy: {
    fontSize: '0.875rem',
  },
};

export default Footer;
