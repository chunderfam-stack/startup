import React from 'react';
import './game.css';

import {PlayArea} from './playArea';
import {Statistics} from './statistics';
import { data } from 'react-router-dom';

export function Game(props) {
  const [scores, setScores] = React.useState([]);
  const [eventsList, setEventsList] = React.useState([]);
  const [highScore, setHighScore] = React.useState([]);

  const [yValues, setYValues] = React.useState([]);
  const [xValues, setXValues] = React.useState([]);
  const [averageTime, setAverageTime] = React.useState(0);
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
        setAverageTime(scores.average);
      });
    const xs = []
    for(let x = 0; x < 500; x += 10){
        xs.push(x);
    }
    setXValues(xs);
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
        setYValues={setYValues}
        setAverageTime={setAverageTime}
        />
        <Statistics 
        userName={props.userName}
        scores={scores}
        eventsList={eventsList}
        Data={Data}
        averageTime={averageTime}
        />
    </main>
  );
}

class ChatClient {
  observers = [];
  connected = false;

  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.notifyObservers('system', 'websocket', 'connected');
      this.connected = true;
    };

    // Display messages we receive from our friends
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      this.notifyObservers('received', chat.name, chat.msg);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers('system', 'websocket', 'disconnected');
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers('sent', 'me', msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}