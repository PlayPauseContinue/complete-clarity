import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './screens/Home';
import QR from './components/QR';
import Footer from './components/Footer';
import ImageCompressor from './screens/ImageCompressor';
import TextToSpeech from './screens/TextToSpeech';
import UnitConverter from './screens/UnitConverter';
function App() {
  return (
    <>
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
            <Route path="/text-to-speech" element={<TextToSpeech />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Analytics />
    </>
  );
}

export default App;
