import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const day = String(time.getDate()).padStart(2, '0');
  const weekday = ['日', '月', '火', '水', '木', '金', '土'][time.getDay()];

  return (
    <div className="app-container">
      {/* Animated Background */}
      <div className="background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="grid-pattern"></div>
      </div>

      {/* Main Clock Display */}
      <div className={`clock-wrapper ${mounted ? 'mounted' : ''}`}>
        <div className="time-display">
          <div className="time-segment" style={{ animationDelay: '0s' }}>
            <span className="time-number">{hours}</span>
          </div>
          <div className="time-separator" style={{ animationDelay: '0.1s' }}>:</div>
          <div className="time-segment" style={{ animationDelay: '0.2s' }}>
            <span className="time-number">{minutes}</span>
          </div>
          <div className="time-separator" style={{ animationDelay: '0.3s' }}>:</div>
          <div className="time-segment seconds-segment" style={{ animationDelay: '0.4s' }}>
            <span className="time-number seconds-number">{seconds}</span>
          </div>
        </div>

        <div className="date-display" style={{ animationDelay: '0.6s' }}>
          <span className="date-text">
            {year}.{month}.{day}
          </span>
          <span className="weekday-text">{weekday}曜日</span>
        </div>

        {/* Decorative Elements */}
        <div className="corner-decoration top-left"></div>
        <div className="corner-decoration top-right"></div>
        <div className="corner-decoration bottom-left"></div>
        <div className="corner-decoration bottom-right"></div>
      </div>
    </div>
  );
}

export default App;
