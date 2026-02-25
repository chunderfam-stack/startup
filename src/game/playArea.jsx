import React from 'react';
import './game.css';
import { Duck } from './duck';

export function PlayArea(){
    const [timer, setTimer] = React.useState(0);
    const [inPlay, setPlay] = React.useState(false);
    const [gameStarted, setGame] = React.useState(false);
    const [duckMode, setDuckMode] = React.useState(false);
    const [highScore, setHighScore] = React.useState(localStorage.getItem('highScore') || 0);
    const [gameTimeOut, setGameTimeOut] = React.useState(null);
    function startPlay(){
        setTimer(0);
        setPlay(true);
    }
    function readyGame(){
        setGame(true);
        setGameTimeOut(setTimeout(() => startPlay(), Math.random() * 4000 + 500));
    }
    React.useEffect(() => {
        if(!inPlay){
            return;
        }
        const start = performance.now();
            const interval = setInterval(() =>{
            const now = performance.now();
            setTimer((now - start).toFixed(1))
        }, 10);
        return () => clearInterval(interval);
        
    }, [inPlay]);
    function StartDuckMode(){
        setDuckMode(!duckMode);
    }
    function stopGame(){
        setGame(false);
        setPlay(false);
        if(Number(timer) < Number(highScore) || Number(highScore) === 0) {
            setHighScore(timer);
            localStorage.setItem('highScore', timer);
        }
    }
    function doNothing(){
        clearTimeout(gameTimeOut);
        setGame(false);
    }

    return (
        <>
            <div className="play-area">
            {duckMode === true && <Duck left={1}/>}
                <button className={gameStarted ? inPlay ? "click-button" : "button-red" : "button-blue"} onClick={inPlay ? () => stopGame() : gameStarted ? () => doNothing() : () => readyGame()}>
                    {gameStarted === false && (<p className='button-text'>Click to Play!</p>)}
                </button>
            {duckMode === true && <Duck left={-1}/>}
            </div>

            <div className="below-play">
                <div className="form-check switch">
                    <input className = "form-check-input" type="checkbox" onChange={StartDuckMode}/>
                    <label className="form-check-label">
                        <span className="slider round">Duck Mode</span>
                    </label>
                </div>
                <p id='timer'>{timer}ms</p>
                {highScore !== 0 && <p id='timer'>High Score: {highScore}ms</p>}
            </div>  
        </>
        
    )
}
