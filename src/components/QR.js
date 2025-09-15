import React, { useState, useRef, useEffect } from 'react';

// You can add your own QR generation and scanning libraries
// For demo: we'll use placeholder functions

// Placeholder QR code generation (use qrcode.react or similar lib in real use)
const generateQRCode = (text) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    text
  )}`;

const isValidURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};

function QR() {
  const [tab, setTab] = useState('generate'); // 'generate' or 'scan'
  const [inputText, setInputText] = useState('');
  const [contentType, setContentType] = useState('URL');
  const [qrUrl, setQrUrl] = useState('');
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      alert('Please enter some content to generate QR Code');
      return;
    }
    setQrUrl(generateQRCode(inputText));
  };
  const downloadQRCode = () => {
    fetch(qrUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr-code.png';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('Error downloading QR code'));
  };

  // Basic camera open & scan simulation
  useEffect(() => {
    if (tab === 'scan' && scanning && navigator.mediaDevices) {
      const constraints = { video: { facingMode: 'environment' } };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            // In real app, implement QR decode from video stream here!
            // Simulate scan after 5 sec
            setTimeout(() => {
              setScanResult('https://example.com/scanned-url');
              setScanning(false);
              stream.getTracks().forEach((track) => track.stop());
            }, 5000);
          }
        })
        .catch(() => alert('Could not access camera.'));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, [tab, scanning]);

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Copied to clipboard!'));
  };

  return (
    <div className="app">
      {/* <header>
        <div className="logo">CompleteClarity QR Tool</div>
        <nav>
          <button
            onClick={() => setTab('generate')}
            className={tab === 'generate' ? 'active' : ''}>
            Generate
          </button>
          <button
            onClick={() => setTab('scan')}
            className={tab === 'scan' ? 'active' : ''}>
            Scan
          </button>
        </nav>
      </header> */}

      <main>
        {tab === 'generate' && (
          <div className="generate-panel">
            <label htmlFor="input">Enter URL, text or contact info:</label>
            <textarea
              id="input"
              rows="4"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your content here..."></textarea>

            <label htmlFor="contentType">Content type:</label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}>
              <option value="URL">URL</option>
              <option value="Text">Text</option>
              <option value="Contact">Contact</option>
            </select>

            <button className="primary-btn" onClick={handleGenerate}>
              Generate QR Code
            </button>
            <div>
              {/* banner-ad-cc */}
              <h1>Banner Ad</h1>
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2171200369103844"
                data-ad-slot={6305799023}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>

            <div className="qr-preview">
              {qrUrl ? (
                <>
                  <img src={qrUrl} alt="Generated QR Code" />
                  <div className="qr-actions">
                    <button className="secondary-btn" onClick={downloadQRCode}>
                      Download PNG
                    </button>
                    <button
                      className="secondary-btn"
                      onClick={() => handleCopy(qrUrl)}>
                      Copy QR Code URL
                    </button>
                  </div>
                </>
              ) : (
                <div className="qr-placeholder">
                  QR code preview will appear here
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'scan' && (
          <div className="scan-panel">
            <div className="scan-controls">
              <button
                className="primary-btn"
                disabled={scanning}
                onClick={() => setScanning(true)}>
                {scanning ? 'Scanning...' : 'Open Camera'}
              </button>
              <input
                type="file"
                accept="image/*"
                className="file-input"
                onChange={(e) => alert('Image upload scanning not implemented')}
              />
            </div>

            <div className="scan-result">
              <label>Scanned Result:</label>
              <textarea
                readOnly
                value={scanResult}
                rows="3"
                placeholder="Scan a QR code to see result here"
              />
              <div className="qr-actions">
                <button
                  disabled={!scanResult}
                  className="secondary-btn"
                  onClick={() => handleCopy(scanResult)}>
                  Copy Text
                </button>
                <button
                  disabled={!isValidURL(scanResult)}
                  className="secondary-btn"
                  onClick={() =>
                    scanResult && window.open(scanResult, '_blank')
                  }>
                  Open URL
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body,html, #root, .app {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Poppins', sans-serif;
          background: #f5f5f5;
          color: #2a3d66;
          display: flex; flex-direction: column;
          min-height: 100vh;
        }
       .app {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background: white;
  border-radius: 0; /* optional: remove rounded corners to fit edge */
  box-shadow: none; /* optional: remove shadow for edge-to-edge look */
  overflow: hidden;
  padding: 1rem 2rem; /* add horizontal padding */
}
       
        .logo {
          font-weight: 600; font-size: 1.25rem;
        }
        nav button {
          border: none;
          background: transparent;
          color: white;
          font-weight: 600;
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: background 0.3s;
        }
        nav button.active, nav button:hover {
          background: #00bcd4;
        }
        main {
          padding: 2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        label {
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: block;
        }
        textarea, select, input[type="file"] {
          width: 100%;
          border-radius: 6px;
          border: 1px solid #ccc;
          padding: 0.75rem 1rem;
          resize: vertical;
          font-size: 1rem;
          margin-bottom: 1rem;
          color: #2a3d66;
          font-family: inherit;
        }
        .primary-btn {
          background: #00bcd4;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .primary-btn:hover:not(:disabled) {
          background: #0097a7;
        }
        .secondary-btn {
          background: #f5f5f5;
          border: 1px solid #ccc;
          color: #2a3d66;
          cursor: pointer;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          margin-right: 1rem;
          font-weight: 600;
          transition: background 0.3s;
        }
        .secondary-btn:hover {
          background: #e0e0e0;
        }
        .qr-preview {
          margin-top: 1rem;
          text-align: center;
        }
        .qr-preview img {
          width: 150px;
          height: 150px;
          margin-bottom: 0.5rem;
          border-radius: 12px;
          box-shadow: 0 0 8px rgb(0 188 212 / 0.5);
        }
        .qr-actions {
          display: flex;
          justify-content: center;
          margin-top: 0.5rem;
        }
        .qr-placeholder {
          width: 150px;
          height: 150px;
          background: #e0e0e0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: #999;
          font-style: italic;
          user-select: none;
        }
        .scan-panel {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .video-preview {
          width: 100%;
          max-width: 320px;
          height: auto;
          border-radius: 12px;
          border: 2px solid #00bcd4;
          background: black;
        }
        .scan-controls {
          margin: 1rem 0;
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
          width: 100%;
          max-width: 320px;
        }
        .scan-result {
          width: 100%;
          max-width: 320px;
        }
       
        @media (max-width: 600px) {
          main {
            padding: 1rem;
          }
          nav button {
            padding: 0.5rem 0.75rem;
            margin-left: 0.5rem;
          }
          .qr-actions {
            flex-direction: column;
          }
          .qr-actions button,
          .qr-actions a {
            margin: 0.25rem 0;
          }
          .scan-controls {
            max-width: 100%;
          }
          .scan-result textarea {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}

export default QR;
