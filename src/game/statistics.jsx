import React from 'react';
import './game.css';

export function Statistics(){
    return(
        <>
     <h1 className="stats-title">Statistics</h1>

        <div className="stats">
            <div className="graph">
                <svg height="400" width="400">
                    <rect width="400" height="400" id='placeholder'></rect>
                </svg>
                
                <p id='averageTime'>Average Reaction Time: 0.5675ms</p>
            </div>
            <div className="updates">
                <p id='updatesLabel'>updates:</p>
                <ul className="notification">
                    <li className="player-name">Grace got a time of 0.5ms</li>
                    <li className="player-name">Alan got a time of 9ms</li>
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
                            <td>0.457ms</td>
                        </tr>
                        <tr>
                            <td>Alan</td>
                            <td>0.506ms</td>
                        </tr>
                        <tr>
                            <td>Michael</td>
                            <td>0.750ms</td>
                        </tr>
                        <tr>
                            <td>Barry</td>
                            <td>1.534ms</td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
            
        </div>
    </>
    )
    
   
}