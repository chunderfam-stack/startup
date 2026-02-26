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
    const scores = React.useRef(props.scores);
    React.useEffect(() =>{
        console.log("yes?");
    }, [props.scores]);

    return(
        <>
     <h1 className="stats-title">Statistics</h1>
        <p></p>
        <div className="stats">
            <div className="graph">
                <Line data={Data} options={Options}/>
                <p id='averageTime'>Average Reaction Time: 345ms</p>
            </div>
            <div className="updates">
                <p id='updatesLabel'>updates:</p>
                <ul className="notification">
                    <li className="player-name">Grace got a time of 500ms</li>
                    <li className="player-name">Alan got a time of 900ms</li>
                    <li className="player-name">Barry got a time of 8018ms</li>
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