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
                <p id='scores-label'>Scores</p>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                        </tr>
                        <tr>
                            <td>Grace</td>
                            <td>457ms</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>506ms</td>
                        </tr>
                        <tr>
                            <td>Michael</td>
                            <td>750ms</td>
                        </tr>
                        <tr>
                            <td>Barry</td>
                            <td>534ms</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
            
        </div>
    </>
    )
    
   
}