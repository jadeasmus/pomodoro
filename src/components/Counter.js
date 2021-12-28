import React, { useState, useEffect } from "react";

export default function Counter() {
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPicked, setIsPicked] = useState(false);

  useEffect(() => {
    console.log(isPicked)
    if(isPicked) {
      let interval = setInterval(() => {
        console.log(isActive)
        if(isActive){
            clearInterval(interval);
            if (seconds === 0) {
              if (minutes !== 0) {
                setSeconds(59);
                setMinutes(minutes - 1);
              } else {
                let minutes = displayMessage ? 24 : 3;
                let seconds = 59;
      
                setSeconds(seconds);
                setMinutes(minutes);
                setDisplayMessage(!displayMessage);
              }
            } else {
              setSeconds(seconds - 1);
            }
          }
        }, 1000);
    }
  }, [seconds]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  const handleClick = (event) => {
    setIsPicked(true);
    // if(event.target.textContent === "Classic"){
    //     setMinutes(2)
    // }
  }

  return (
    <div className="text-center">
      <div className="">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div>
      <div className="text-white text-6xl pt-32 pb-8">
        {timerMinutes}:{timerSeconds}
      </div>
      <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Classic</button>
      <button className="text-blue-800 px-3 m-3 shadow-sm bg-white rounded-md" onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Start"}</button>
    </div>
  );
}
