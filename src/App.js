import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import QR from './components/QR';
import Footer from './components/Footer';
import ImageCompressor from './screens/ImageCompressor';
function App() {
  return (
    <Router>
      <Header />
      <main
        style={{
          paddingTop: '60px',
          paddingBottom: '50px',
          minHeight: 'calc(100vh - 110px)',
        }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate-qr" element={<QR />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
