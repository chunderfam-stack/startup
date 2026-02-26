import React from 'react';
import './game.css';

import {PlayArea} from './playArea';
import {Statistics} from './statistics';

export function Game(props) {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    const scoresText = localStorage.getItem('scores');
    if (scoresText) {
      setScores(JSON.parse(scoresText));
    }
  }, []);
  return (
    <main className='container-fluid' id="main">
        <PlayArea 
        userName={props.userName}
        scores={scores}
        setScores={setScores}
        />
        <Statistics 
        userName={props.userName}
        scores={scores}
        />
    </main>
  );
}