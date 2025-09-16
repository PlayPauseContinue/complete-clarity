import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const theme = {
  primary: '#00bcd4',
  background: '#f5f5f5',
  cardBg: 'white',
  border: '0 2px 8px rgba(0,0,0,0.08)',
  text: '#2a3d66',
};

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressedSize, setCompressedSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [targetKB, setTargetKB] = useState(200);

  const handleImageUpload = (e) => {
    setOriginalImage(e.target.files[0]);
    setCompressedImage(null);
    setCompressedSize(null);
  };

  const handleCompress = async () => {
    if (!originalImage) return;
    setLoading(true);
    try {
      const options = {
        maxSizeMB: targetKB / 1024, // convert KB to MB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      const compressed = await imageCompression(originalImage, options);
      setCompressedImage(URL.createObjectURL(compressed));
      setCompressedSize((compressed.size / 1024).toFixed(2)); // in KB
    } catch (error) {
      alert('Compression failed: ' + error.message);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = 'compressed-image.jpg';
    link.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Reduce Image Size (KB)</h2>
        <div style={styles.flexRow}>
          <div style={styles.leftPanel}>
            <div style={styles.imageHolder}>
              {loading ? (
                <div style={styles.skeleton}></div>
              ) : compressedImage ? (
                <img
                  src={compressedImage}
                  alt="Compressed Preview"
                  style={styles.image}
                />
              ) : originalImage ? (
                <img
                  src={URL.createObjectURL(originalImage)}
                  alt="Original Preview"
                  style={styles.image}
                />
              ) : (
                <div style={styles.placeHolder}>Image Preview</div>
              )}
            </div>
            {compressedSize && (
              <div style={styles.sizeText}>
                Compressed Size: {compressedSize} KB
              </div>
            )}
          </div>
          <div style={styles.rightPanel}>
            <input
              type="file"
              accept="image/*"
              style={styles.input}
              onChange={handleImageUpload}
            />
            <div style={styles.sliderWrap}>
              <label htmlFor="size-slider" style={styles.label}>
                Target Size (KB):
              </label>
              <input
                id="size-slider"
                type="range"
                min={10} /* Updated minimum */
                max={500}
                value={targetKB}
                style={styles.slider}
                onChange={(e) => setTargetKB(Number(e.target.value))}
              />
              <span style={styles.sliderValue}>{targetKB} KB</span>
            </div>
            <button
              style={styles.primaryBtn}
              onClick={handleCompress}
              disabled={!originalImage || loading}>
              {loading ? 'Compressing...' : 'Compress Image'}
            </button>
            {compressedImage && (
              <button style={styles.secondaryBtn} onClick={handleDownload}>
                Download Compressed Image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '1rem 2rem', // reduced top margin and side padding
    background: theme.background,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    background: theme.cardBg,
    borderRadius: '12px',
    boxShadow: theme.border,
    padding: '2rem',
    maxWidth: '900px',
    width: '100%',
  },
  heading: {
    color: theme.text,
    textAlign: 'center',
    marginBottom: '1.25rem', // reduced margin bottom
  },
  flexRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  leftPanel: {
    flex: 1,
    minWidth: '220px',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  imageHolder: {
    width: '220px',
    height: '220px',
    background: '#e0e0e0',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    maxWidth: '220px',
    maxHeight: '220px',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0,188,212,0.2)',
    objectFit: 'contain',
    background: 'white',
  },
  skeleton: {
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    background: 'linear-gradient(90deg, #f0f0f0 25%, #dbeef3 37%, #f0f0f0 63%)',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  placeHolder: {
    color: '#999',
    fontStyle: 'italic',
    fontSize: '1.1rem',
  },
  sizeText: {
    marginTop: '0.75rem',
    color: theme.text,
    fontWeight: 600,
  },
  rightPanel: {
    flex: 1,
    minWidth: '220px',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1.5rem',
    justifyContent: 'center',
  },
  input: {
    marginBottom: '1rem',
    fontSize: '1rem',
  },
  sliderWrap: {
    margin: '1rem 0',
    width: '100%',
  },
  label: {
    fontWeight: 600,
    color: theme.text,
    marginBottom: '0.5rem',
    display: 'block',
  },
  slider: {
    width: '80%',
  },
  sliderValue: {
    marginLeft: '1rem',
    fontWeight: 600,
    color: theme.primary,
  },
  primaryBtn: {
    background: theme.primary,
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'background 0.3s',
  },
  secondaryBtn: {
    background: theme.background,
    border: `1px solid ${theme.primary}`,
    color: theme.text,
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginBottom: '1rem',
  },
};

export default ImageCompressor;
