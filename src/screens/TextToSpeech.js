import React, { useState, useEffect, useRef } from 'react';

const theme = {
  primary: '#00bcd4',
  background: '#f5f5f5',
  cardBg: 'white',
  border: '0 2px 8px rgba(0,0,0,0.08)',
  text: '#2a3d66',
  buttonText: 'white',
};

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  // Load voices and set default voice
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = synthRef.current.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };
    if (synthRef.current.onvoiceschanged !== undefined) {
      synthRef.current.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, [selectedVoice]);

  // Split text into words for highlighting
  useEffect(() => {
    setWords(text.trim().split(/\s+/));
    setCurrentWordIndex(-1);
  }, [text]);

  const handleSpeak = () => {
    if (!text.trim()) return;

    if (synthRef.current.speaking) {
      synthRef.current.cancel();
      setSpeaking(false);
      setCurrentWordIndex(-1);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find((v) => v.name === selectedVoice);
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setSpeaking(true);
      setCurrentWordIndex(0);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };

    // Event for word highlighting (using char boundary)
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        // Find which word we're at by counting spaces until charIndex
        const textBefore = text.slice(0, charIndex);
        const newWordIndex = textBefore.trim().split(/\s+/).length - 1;
        setCurrentWordIndex(newWordIndex);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // Move backward one word
  const handleBack = () => {
    if (!utteranceRef.current || !text) return;
    synthRef.current.cancel();
    let newIndex = currentWordIndex > 0 ? currentWordIndex - 1 : 0;
    speakFromWordIndex(newIndex);
  };

  // Move forward one word
  const handleForward = () => {
    if (!utteranceRef.current || !text) return;
    synthRef.current.cancel();
    let newIndex =
      currentWordIndex < words.length - 1
        ? currentWordIndex + 1
        : words.length - 1;
    speakFromWordIndex(newIndex);
  };

  // Helper to speak text from a given word index
  const speakFromWordIndex = (index) => {
    if (!text) return;
    const textToSpeak = words.slice(index).join(' ');
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.voice = voices.find((v) => v.name === selectedVoice);
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setSpeaking(true);
      setCurrentWordIndex(index);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };
    utterance.onend = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const spokenText = textToSpeak.slice(0, charIndex);
        const newWordIndex = spokenText.trim().split(/\s+/).length - 1 + index;
        setCurrentWordIndex(newWordIndex);
      }
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  // Download audio placeholder handler
  // (Explain in UI that actual download requires external service)
  const handleDownload = () => {
    alert(
      'Audio download is not supported by browser SpeechSynthesis API. Use a server-side TTS API or dedicated library for this feature.'
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Text-to-Speech (TTS)</h2>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={styles.textarea}
          rows={6}
        />
        <div style={styles.controls}>
          <select
            style={styles.select}
            value={selectedVoice || ''}
            onChange={(e) => setSelectedVoice(e.target.value)}>
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} {voice.lang}
              </option>
            ))}
          </select>
          <button
            style={{ ...styles.button, backgroundColor: theme.primary }}
            onClick={handleSpeak}
            disabled={!text.trim()}>
            {speaking ? 'Stop' : 'Speak'}
          </button>
          <button
            style={styles.navButton}
            onClick={handleBack}
            disabled={!speaking || currentWordIndex <= 0}
            title="Backward one word">
            ←
          </button>
          <button
            style={styles.navButton}
            onClick={handleForward}
            disabled={!speaking || currentWordIndex >= words.length - 1}
            title="Forward one word">
            →
          </button>
          <button
            style={styles.downloadButton}
            onClick={handleDownload}
            title="Download audio">
            Download Audio
          </button>
        </div>
        <div style={styles.textPreview}>
          {words.map((word, idx) => (
            <span
              key={idx}
              style={
                idx === currentWordIndex ? styles.highlightedWord : styles.word
              }>
              {word + ' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: '1rem 2rem',
    background: theme.background,
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    background: theme.cardBg,
    borderRadius: '12px',
    boxShadow: theme.border,
    padding: '2rem',
    maxWidth: '700px',
    width: '100%',
    color: theme.text,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  textarea: {
    width: '100%',
    fontSize: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    marginBottom: '1rem',
    fontFamily: "'Poppins', sans-serif",
  },
  controls: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    flexGrow: 1,
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    minWidth: '180px',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    color: theme.buttonText,
    cursor: 'pointer',
    userSelect: 'none',
    minWidth: '100px',
  },
  navButton: {
    fontSize: '1.5rem',
    padding: '0 0.75rem',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: theme.primary,
    userSelect: 'none',
    fontWeight: '700',
    minWidth: '36px',
  },
  downloadButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontWeight: '600',
  },
  textPreview: {
    marginTop: '1.5rem',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    minHeight: '3rem',
    textAlign: 'center',
  },
  highlightedWord: {
    color: theme.primary,
    fontWeight: '700',
    backgroundColor: 'rgba(0, 188, 212, 0.15)',
    borderRadius: '4px',
    padding: '0 4px',
  },
  word: {
    color: theme.text,
  },
};

export default TextToSpeech;
