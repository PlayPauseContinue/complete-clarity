import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const theme = {
  primary: '#00bcd4',
  background: '#f5f5f5',
  cardBg: 'white',
  border: '0 2px 8px rgba(0,0,0,0.08)',
  text: '#2a3d66',
  inputBorder: '#ccc',
};

const conversions = {
  length: {
    units: [
      'Meter',
      'Kilometer',
      'Centimeter',
      'Millimeter',
      'Mile',
      'Yard',
      'Foot',
      'Inch',
    ],
    toMeter: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Millimeter: 0.001,
      Mile: 1609.34,
      Yard: 0.9144,
      Foot: 0.3048,
      Inch: 0.0254,
    },
  },
  weight: {
    units: ['Gram', 'Kilogram', 'Milligram', 'Pound', 'Ounce'],
    toGram: {
      Gram: 1,
      Kilogram: 1000,
      Milligram: 0.001,
      Pound: 453.592,
      Ounce: 28.3495,
    },
  },
  temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
  },
};

const UnitConverter = () => {
  const [category, setCategory] = useState('length');
  const [inputUnit, setInputUnit] = useState(conversions.length.units[0]);
  const [outputUnit, setOutputUnit] = useState(conversions.length.units[1]);
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  const convert = (value, fromUnit, toUnit, category) => {
    if (category === 'temperature') {
      // Temperature conversions
      let tempC;
      switch (fromUnit) {
        case 'Celsius':
          tempC = value;
          break;
        case 'Fahrenheit':
          tempC = ((value - 32) * 5) / 9;
          break;
        case 'Kelvin':
          tempC = value - 273.15;
          break;
        default:
          tempC = value;
      }

      switch (toUnit) {
        case 'Celsius':
          return tempC;
        case 'Fahrenheit':
          return (tempC * 9) / 5 + 32;
        case 'Kelvin':
          return tempC + 273.15;
        default:
          return tempC;
      }
    } else if (category === 'length') {
      // Convert input value to meters
      const valueInMeters = value * conversions.length.toMeter[fromUnit];
      // Convert meters to output unit
      return valueInMeters / conversions.length.toMeter[toUnit];
    } else if (category === 'weight') {
      // Convert input value to grams
      const valueInGrams = value * conversions.weight.toGram[fromUnit];
      // Convert grams to output unit
      return valueInGrams / conversions.weight.toGram[toUnit];
    }
    return value;
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setCategory(cat);
    setInputValue('');
    setOutputValue('');
    setInputUnit(conversions[cat].units[0]);
    setOutputUnit(conversions[cat].units[1] || conversions[cat].units[0]);
  };

  const handleInputUnitChange = (e) => {
    setInputUnit(e.target.value);
    if (inputValue !== '') {
      setOutputValue(
        convert(
          Number(inputValue),
          e.target.value,
          outputUnit,
          category
        ).toFixed(4)
      );
    }
  };

  const handleOutputUnitChange = (e) => {
    setOutputUnit(e.target.value);
    if (inputValue !== '') {
      setOutputValue(
        convert(
          Number(inputValue),
          inputUnit,
          e.target.value,
          category
        ).toFixed(4)
      );
    }
  };

  const handleInputValueChange = (e) => {
    const val = e.target.value;
    if (val === '' || !isNaN(val)) {
      setInputValue(val);
      if (val === '') {
        setOutputValue('');
        return;
      }
      setOutputValue(
        convert(Number(val), inputUnit, outputUnit, category).toFixed(4)
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Free Unit Converter Online - Length, Weight & Temperature |
          CompleteClarity
        </title>
        <meta
          name="description"
          content="Convert length, weight, temperature and more instantly with our free online Unit Converter. Accurate, fast, and easy to use tool for all your measurement needs."
        />
        <meta
          name="keywords"
          content="unit converter, online unit conversion, length conversion, weight conversion, temperature converter, free unit converter, measurement converter"
        />
        <meta
          property="og:title"
          content="Free Unit Converter Online - Length, Weight & Temperature | CompleteClarity"
        />
        <meta
          property="og:description"
          content="Instantly convert units of length, weight, temperature, and more with our fast, easy-to-use online Unit Converter tool."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://completeclarity.in/unit-converter"
        />
        <meta
          property="og:image"
          content="https://completeclarity.in/images/unit-converter-logo.png"
        />
      </Helmet>

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Unit Converter</h2>
          <p style={styles.description}>
            Our <strong>Unit Converter tool</strong> lets you easily convert
            between various units of measurement including length, weight, and
            temperature. Whether you need to switch from meters to miles,
            kilograms to pounds, or Celsius to Fahrenheit, this intuitive
            converter ensures accurate and instant results. Designed with
            user-friendliness and precision in mind, it’s perfect for students,
            professionals, and anyone needing quick conversions without hassle.
            Compatible across devices and seamlessly integrated into
            CompleteClarity’s platform, this free online unit converter helps
            you save time and get accurate conversions anytime.
          </p>

          <div style={styles.row}>
            <label style={styles.label}>Category:</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              style={styles.select}>
              {Object.keys(conversions).map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.row}>
            <div style={styles.col}>
              <label style={styles.label}>From:</label>
              <select
                value={inputUnit}
                onChange={handleInputUnitChange}
                style={styles.select}>
                {conversions[category].units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputValueChange}
                placeholder="Enter value"
                style={styles.input}
              />
            </div>

            <div style={styles.col}>
              <label style={styles.label}>To:</label>
              <select
                value={outputUnit}
                onChange={handleOutputUnitChange}
                style={styles.select}>
                {conversions[category].units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={outputValue}
                readOnly
                style={styles.input}
                placeholder="Result"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    padding: '2rem',
    minHeight: '100vh',
    background: theme.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    background: theme.cardBg,
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: theme.border,
    width: '100%',
    maxWidth: '600px',
    color: theme.text,
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  description: {
    color: theme.text,
    fontSize: '1rem',
    marginBottom: '1.5rem',
    fontFamily: "'Poppins', sans-serif",
    lineHeight: 1.5,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  label: {
    flexBasis: '100%',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  col: {
    flexBasis: '48%',
    display: 'flex',
    flexDirection: 'column',
  },
  select: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: `1px solid ${theme.inputBorder}`,
    marginBottom: '0.75rem',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: `1px solid ${theme.inputBorder}`,
  },
};

export default UnitConverter;
