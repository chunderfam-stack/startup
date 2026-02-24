import React from 'react';
import './game.css';


export function PlayArea(){
    const [timer, setTimer] = React.useState(0);
    const [inPlay, setPlay] = React.useState(false);
    const [startGame, setGame] = React.useState(false);
    const [duckMode, setDuckMode] = React.useState(false);
    function startPlay(){
        setPlay(true);
    }
    function readyGame(){
        setTimeout(() => startPlay(), Math.random() * 3000 + 500);
    }
    React.useEffect(() => {
        if(!inPlay){
            return;
        }
        const start = performance.now();
            const interval = setInterval(() =>{
            const now = performance.now();
            setTimer(((now - start)).toFixed(1))
        }, 10);
        return () => clearInterval(interval);
        
    }, [inPlay]);
    function StartDuckMode(){
        setDuckMode(!duckMode);
    }

    return (
        <>
            <div className="play-area">
            {duckMode === true && <img src="../duck-placeholder.jpg" height="100" width="100"/>}
                <button className="click-button" onClick={() => readyGame()}>
                    {inPlay === false && (<p className='button-text'>Click to Play!</p>)}
                </button>
            {duckMode === true && <img src="../duck-placeholder.jpg" height="100" width="100"/>}
            </div>

            <div className="below-play">
                <div className="form-check switch">
                    <input className = "form-check-input" type="checkbox" onChange={StartDuckMode}/>
                    <label className="form-check-label">
                        <span className="slider round">Duck Mode</span>
                    </label>
                </div>
                <p id='timer'>{timer}ms</p>
            </div>  
        </>
        
    )
}
