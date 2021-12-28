import React from 'react'
import { useState, useEffect } from 'react'

export default function Timer() {

    const [isActive, setIsActive] = useState(false);
    const [isPicked, setIsPicked] = useState(false);
    // const [sessionCount, setSessionCount] = useState(0);

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [hour, setHour] = useState('00');
    const [counter, setCounter] = useState(0)
    const [bub, setBub] = useState(2)


    useEffect(() => {
        let flowInterval;
        let restInterval;

        // console.log(counter)
    
        if (isPicked) {
            const hourCounter = Math.floor(counter / 3600);
            const minuteCounter = Math.floor(counter / 60) % 60;
            const secondCounter = (counter % 60);
    
            const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
            const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
            const computedHour = String(hourCounter).length === 1 ? `0${hourCounter}`: hourCounter;
        
            setSecond(computedSecond);
            setMinute(computedMinute);
            setHour(computedHour);
        
            
            flowInterval = setInterval(() => {
                // console.log(inFlow)
                // when bub is even, its time for rest, when it is odd, it's time for work
                if (isActive) {
                    if (counter >= 1) {
                        setCounter(counter => counter - 1);
                    } else {
                        console.log("in else")
                        console.log(setBub(bub+1), bub) // in rest
                        setCounter(bub%2===0 ? 5 : 15)
                    }
                    // console.log(bub)
                    
                }  
            }, 1000) // 1000 milliseconds per second
          
        }
        return () => clearInterval(flowInterval);
    }, [isActive, isPicked, counter]);


    const stopTimer = () => {
        setIsActive(false);
        setCounter(0);
        setSecond('00');
        setMinute('00')
        setHour('00');
      }


    const handleClick = (event) => {
        setIsPicked(true);
        if(event.target.textContent === "Classic"){
            setCounter(15)
            // setRest(5)
        }
        if(event.target.textContent === "Longer") {
            setCounter(3000)
            // setRest(10)
        }
        if(event.target.textContent === "Longest"){
            setCounter(4500)
            // setRest(15)
        }
        // timerLoop(counter)
    }


    return (
        <div className="">

            {/* Timer display */}
            <div className='text-white text-6xl pt-32 pb-8 text-center'>
                <span className="">{hour}</span>
                    <span>:</span>
                <span className="minute">{minute}</span>
                    <span>:</span>
                <span className="second">{second}</span>
            </div>

            {/* Pomodoro session options */}
            {!counter ? 
            <div className="text-center">
                {/* 
                <button onClick={event => handleClick(event)} className="text-red-500 px-3 m-3 rounded-md shadow-md bg-white">3600</button>
                <button onClick={event => handleClick(event)} className="text-red-500 px-3 m-3 rounded-md shadow-md bg-white">600</button>
                <button onClick={event => handleClick(event)} className="text-red-500 px-3 m-3 rounded-md shadow-md bg-white">300</button>
                <button onClick={event => handleClick(event)} className="text-red-500 px-3 m-3 rounded-md shadow-md bg-white">120</button>
    
                <form className="" onSubmit={(e) => e.preventDefault()}>
                <input className="border-5 border-green-glow rounded-md" type="text" placeholder="Custom" onChange={(e) => setE(parseInt(e.target.value))}></input>
                    <input type="submit" value="Submit" onClick={ () => setCounter(E) }></input>
                </form> 
                */}

                <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Classic</button>
                <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Longer</button>
                <button onClick={event => handleClick(event)} className="text-blue-800 px-3 m-3 rounded-md shadow-md bg-white">Longest</button>
        
            </div>
            : 
            // <div>
            //     <h1 className="text-md"> Flow session {sessionCount} </h1>
            // </div>

            
            <div className="flex justify-center space-x-5">
                <button className="text-blue-800 font-semibold text-lg h-24 w-24 mt-20 shadow-sm bg-white rounded-full" onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Start"}</button>
                <button className="text-blue-800 text-lg font-semibold shadow-sm h-24 w-24 mt-20 bg-white rounded-full" onClick={() => stopTimer()}> End Session </button>
            </div>
    
            
            }
            
        </div>
    )
}
