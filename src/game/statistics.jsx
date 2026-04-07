import React from 'react';
import './game.css';
import {Chart as ChartJS, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {Options} from "./graphData"
import {GameEvent, GameNotifier} from "./gameNotifier";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend, 
);

export function Statistics(props){
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        GameNotifier.addHandler(handleGameEvent);
        return () => {
            GameNotifier.removeHandler(handleGameEvent);
        }
    });

    function handleGameEvent(event){
        setEvents([...events, event]);
    }

    function createMessageArray(){
        const messageArray = [];
        for(const [i, event] of events.entries()){
            let message = 'unknown';
            if(event.type == GameEvent.End) message = `scored ${event.value.score}`;
            else if(event.type == GameEvent.Start) message = `started a new game`;
            else if(event.type == GameEvent.System) message = event.value.msg;

            messageArray.push(
                <li key={i} className={'player-name'}>
                <span>{event.from.split(`@`)[0]}</span>
                {message}
                </li>
            );
        }
        return messageArray;
    }  

    return(
    <>
     <h1 className="stats-title">Statistics</h1>
        <div className="stats">
            <div className="graph">
                <Line data={props.Data} options={Options}/>
                <p id='averageTime'>Average Reaction Time: {props.averageTime.toFixed(1)}ms</p>
            </div>
            <div className="updates">
                <p id='updatesLabel'>updates:</p>
                <ul className="notification">
                    {createMessageArray()}
                </ul>   
            </div>
            <div className="playerData">
                <p id='scores-label'>High Scores</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>{props.scores.map((score, i) => (
                        <tr key={i}>
                            <td>{score.name}</td>
                            <td>{score.score}</td>
                        </tr>
                    ))}</tbody>
                </table>
            </div>
            
        </div>
    </>
    )
    
   
}