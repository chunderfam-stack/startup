import React from 'react';
import './game.css';
import { Duck } from './duck';

export function PlayArea(props){
    const [timer, setTimer] = React.useState(0);
    const [inPlay, setPlay] = React.useState(false);
    const [gameStarted, setGame] = React.useState(false);
    const [duckMode, setDuckMode] = React.useState(false);
    const [gameTimeOut, setGameTimeOut] = React.useState(null);
    const userName = React.useRef(props.userName);
    function startPlay(){
        setTimer(0);
        setPlay(true);
    }

    function readyGame(){
        setGame(true);
        setGameTimeOut(setTimeout(() => startPlay(), Math.random() * 4000 + 500));
        props.callEvent({type: "start", time: timer, userName: props.userName});
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
        updateScores({name: userName.current, score: timer});
        props.callEvent({type: "time", time: timer, userName: props.userName});
    }

    function doNothing(){
        clearTimeout(gameTimeOut);
        setGame(false);
    }

    async function updateScores(newScore){
        fetch('/api/score', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newScore),
        })
        .then((response) => response.json())
        .then((scores) => {
            props.setScores(scores.scores);
            props.setHighScore(scores.highScore);

        });
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
                {props.highScore !== 0 && <p id='timer'>High Score: {props.highScore}ms</p>}
            </div>  
        </>
        
    )
}
