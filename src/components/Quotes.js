import React, { useEffect, useState } from 'react';

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch quote');
        return res.json();
      })
      .then((data) => setQuote(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  if (!quote) {
    return <div style={styles.container}>Loading Quote...</div>;
  }

  return (
    <div style={styles.container}>
      <blockquote style={styles.quote}>"{quote.content}"</blockquote>
      <p style={styles.author}>- {quote.author}</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '2rem auto',
    padding: '1rem 2rem',
    fontFamily: "'Poppins', sans-serif",
    color: '#2a3d66',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: '1.3rem',
    marginBottom: '1rem',
  },
  author: {
    fontWeight: 600,
    color: '#007B8A',
  },
};

export default Quotes;
