import React, { useState, useRef } from 'react';
import './App.css'; // Add some basic styling here

function App() {
  const [inputType, setInputType] = useState('Annualized Salary');
  const [dollarAmount, setDollarAmount] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [runningTotal, setRunningTotal] = useState(0);
  const [timer, setTimer] = useState(0);

  const intervalRef = useRef(null);

  const calculateDecisecondWage = () => {
    if (!dollarAmount) return 0;
    const amount = parseFloat(dollarAmount);
    if (inputType === 'Annualized Salary') {
      return amount / (365 * 24 * 60 * 60 * 10); // Annualized salary broken down to deciseconds
    } else {
      return amount / (3600 * 10); // Hourly wage broken down to deciseconds
    }
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      const decisecondWage = calculateDecisecondWage();
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
        setRunningTotal((prev) => prev + decisecondWage);
      }, 100); // 100ms = 1 decisecond
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimer(0);
    setRunningTotal(0);
  };

  return (
    <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Wage Timer</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="inputType">Select Type:</label>
        <select
          id="inputType"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Annualized Salary">Annualized Salary</option>
          <option value="Hourly Wage">Hourly Wage</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="dollarAmount">Enter Amount:</label>
        <input
          id="dollarAmount"
          type="number"
          value={dollarAmount}
          onChange={(e) => setDollarAmount(e.target.value)}
          placeholder="$"
        />
      </div>

      <button
        onClick={handleStartStop}
        style={{
          backgroundColor: isRunning ? 'red' : 'blue',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>

      <button
        onClick={handleReset}
        style={{
          marginLeft: '10px',
          backgroundColor: 'gray',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Reset
      </button>

      <div
        style={{
          marginTop: '50px',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        ${runningTotal.toFixed(6)}
      </div>
    </div>
  );
}

export default App;
