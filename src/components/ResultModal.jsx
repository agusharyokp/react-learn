import { useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ ref, targetTime, timeRemaining, onReset }) {
    const dialog = useRef()
    
    const userLost = timeRemaining <=0
    const formattedRemainTime = (timeRemaining / 1000).toFixed(2)
    const score = Math.round((1- timeRemaining / (targetTime*1000)) * 100)
    
    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal()
        }
    }))
    return (
        createPortal(
            <dialog ref={dialog} className="result-modal"> 
                <h2>You {userLost ? 'lost' : 'won'}</h2>

                {!userLost && <h2>Your score:{score}</h2>}

                <p>The target time was <strong>{targetTime}</strong> seconds.</p>
                <p>You stopped the timer at <strong>{formattedRemainTime}</strong> second left</p>    
                <form action="dialog" onSubmit={onReset}>
                    <button>Close</button>
                </form>
            </dialog>,
            document.getElementById('modal')
        )
    )
}