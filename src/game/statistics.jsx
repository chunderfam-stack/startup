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
import {Data, Options} from "./graphData"

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend, 
);

export function Statistics(props){

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
                    {props.eventsList.map((callout, i) => (
                        <li className='player-name' key={i}>{callout}</li>
                    ))}
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