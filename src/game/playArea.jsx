import React from 'react';
import './game.css';


export function PlayArea(){
    const [timer, setTimer] = React.useState(0);
    return (
        <>
            <div className="play-area">
                <img src="../duck-placeholder.jpg" height="100" width="100"/>
                <button className="click-button">
                    <svg height="100" width="100">
                        <circle cx="50" cy="50" r="43" stroke="none" fill="Green"/>
                        <circle cx="50" cy="50" r="49" fill="none" stroke="Green"/>
                    </svg> 
            </button>
            <img src="../duck-placeholder.jpg" height="100" width="100"/>
            </div>

            <div className="below-play">
                <div className="form-check switch">
                    <input class = "form-check-input" type="checkbox"/>
                    <label className="form-check-label">
                        <span className="slider round">Duck Mode</span>
                    </label>
                </div>
                <p id='timer'>0.567ms</p>
            </div>
        </>
        
    )
}