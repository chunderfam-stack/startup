import React from 'react';
import './game.css';

import {PlayArea} from './playArea';
import {Statistics} from './statistics';

export function Game(props) {
  const [scores, setScores] = React.useState([]);
  const [eventsList, setEventsList] = React.useState([]);
  const [highScore, setHighScore] = React.useState([]);

  const [yValues, setYValues] = React.useState([]);
  const xValues = [];
  const types = ['time', 'start'];
  const names = ['Bob', 'Alan', 'Grace', 'Ducks4Life', 'Timmy Tommygun', 'Santa', 'Character Limit Test']

  const Data = {
    labels: xValues,
    datasets: [{
        label: "Recorded Data",
        data: yValues,
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.2
    }
    ]
  };


  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores.scores);
        setHighScore(scores.highScore);
        setYValues(scores.yValues);
      });
    for(let x = 0; x < 500; x += 10){
        xValues.push(x);
    }
    const interval = setInterval(() =>{
      callEvent({type: types[Math.floor(Math.random() * 2)], time: (Math.random() * 500 + 100).toFixed(1), userName: names[Math.floor(Math.random() * names.length)]});
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  function callEvent(props){
        setEventsList(previous => {
          let eventsList = [...previous];
          switch(props.type){
            case "time":
              eventsList.splice(0, 0, `${props.userName} got a time of ${props.time}ms`);
              break;
            case "start":
              eventsList.splice(0, 0, `${props.userName} has started a game!`);
              break;
          }
          if(eventsList.length > 5){
            eventsList.length = 5;
          }
          return eventsList;
        });
    }

  return (
    <main className='container-fluid' id="main">
        <PlayArea 
        userName={props.userName}
        scores={scores}
        setScores={setScores}
        callEvent={callEvent}
        highScore={highScore}
        setHighScore={setHighScore}
        />
        <Statistics 
        userName={props.userName}
        scores={scores}
        eventsList={eventsList}
        
        />
    </main>
  );
}