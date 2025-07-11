import { useState,useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
    // const [timerExpired, setTimerExpired] = useState(false)
    // const [timerActive, setTimerActive] = useState(false)
    // const timerRef = useRef()
    // const dialog = useRef()

    // function handleClick() {
    //     timerRef.current = setTimeout(() => {
    //         setTimerExpired(true)
    //         dialog.current.open()
    //     }, targetTime * 1000)
    //     setTimerActive(true)

    //     setTimeout(() => {
    //     }, targetTime * 1000)
    // }

    const timerRef = useRef()
    const dialog = useRef()

    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000
    if (timeRemaining <=0) {
        clearInterval(timerRef.current)
        dialog.current.open()
    }

    function handleClick() {
        timerRef.current = setInterval(() => {
            setTimeRemaining(prev => prev - 100)
        }, 100)
    }

    function handleStopClick() {
        clearInterval(timerRef.current)
        dialog.current.open()
    }

    function handleReset() {
        setTimeRemaining(targetTime*1000)
    }

    return (
        <>
            <ResultModal 
                ref={dialog} 
                targetTime={targetTime} 
                timeRemaining={timeRemaining} 
                onReset={handleReset}/>

            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                {targetTime} second{targetTime === 1 ? '' : 's'}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStopClick : handleClick}>
                        {timerIsActive ? 'Stop Challenge' : 'Start Challenge'}
                    </button>
                </p>
                <p className="">
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    )
}
