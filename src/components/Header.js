import React from 'react';

const Header = ({ onGenerateClick, onLogoClick }) => {
  return (
    <header style={styles.header}>
      <div
        style={styles.logo}
        onClick={onLogoClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && onLogoClick()}>
        CompleteClarity Free Online Tools
      </div>
      {/* <nav>
        <button style={styles.button} onClick={onGenerateClick}>
          Generate QR
        </button>
      </nav> */}
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a3d66',
    padding: '0 2rem',
    color: 'white',
    height: '60px', // fixed height
    lineHeight: '60px', // vertical centering
    position: 'fixed', // fixed header
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  logo: {
    fontWeight: '600',
    fontSize: '1.25rem',
    cursor: 'pointer',
    userSelect: 'none',
  },
  button: {
    backgroundColor: '#00bcd4',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default Header;
