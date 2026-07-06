
import React, {useState, useEffect} from 'react';

function TimerComponent() {
    const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
        console.log("setInterval executed");
        setSeconds(prevSeconds => prevSeconds + 1);
    },1000);
  }
}