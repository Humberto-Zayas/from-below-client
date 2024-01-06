import React, { useState, useEffect } from "react";

function Timer({ time }) {
  let resetTime = time;
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    let interval = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(resetTime);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  return <div>Time remaining: {seconds} seconds</div>;
}

export default Timer;
