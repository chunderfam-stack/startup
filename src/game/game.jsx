import React from 'react';
import './game.css';

import {PlayArea} from './playArea';
import {Statistics} from './statistics';

export function Game(props) {
  return (
    <main className='container-fluid' id="main">
        <PlayArea userName={props.userName}/>
        <Statistics userName={props.userName}/>
    </main>
  );
}