import React from 'react'
import { useState, useEffect } from 'react'

export default function Pomodoro() {
    // keeps track of count down
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)

    // pomodoro work and break duration
    const [counter, setCounter] = useState(0)
    const [rest, setRest] = useState(0)

    // in work mode or break mode?
    const [inFlow, setInFlow] = useState(false)

    // keeps track of what is selected and if counter is active
    const [isPicked, setIsPicked] = useState(false)
    const [isActive, setIsActive] = useState(false)

    // runs after DOM updates
    useEffect(() => {
        let clockInterval;
        if (isPicked) {
            clockInterval = setInterval(() => {
                if (isActive) {
                    if (second === 0) {
                        if (minute !== 0) {
                            setSecond(59)
                            setMinute(minute - 1)
                        } else {
                            let minutes = inFlow ? counter : rest
                            let seconds = 59
            
                            setSecond(seconds)
                            setMinute(minutes)
                            setInFlow(!inFlow)
                        }
                    } else {
                        setSecond(second - 1)
                    }
                }   
    
            }, 1000) // 1000 milliseconds per second

        }

        return () =>  clearInterval(clockInterval);  // clean up

    })

    // const timerHours = hour < 10 ? `0${hour}` : hour;
    const timerMinutes = minute < 10 ? `0${minute}` : minute;
    const timerSeconds = second < 10 ? `0${second}` : second;

    // choosing a pomodoro type
    const handleClick = (e) => {
        setIsPicked(true)
        if(e.target.textContent === "Classic"){
            setCounter(4)
            setRest(2)
        }
    }

    // end the session
    const stopTimer = () => {
        setIsActive(false);
        // setCounter(0);
        setSecond('00');
        setMinute('00')
        setHour('00');
    }

    return (
        <div className="text-center">
            <div className="text-white text-6xl pt-32 pb-8">
                {counter}:{timerSeconds}
            </div>

            <div className="">
                <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Classic</button>
                <button className="text-blue-800 px-3 m-3 shadow-sm bg-white rounded-md" onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Start"}</button>
                <button className="text-blue-800 px-3 m-3 shadow-md bg-white rounded-md" onClick={ stopTimer }>Reset</button>
            </div>
            
        </div>
    )
}
