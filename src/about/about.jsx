import React from 'react';
import './about.css';

export function About() {
  return (
     <main className='container-fluid' id="body">
        <h1 className="Q text-reset">What is this game?</h1>
        <p className="A">Reactionary is a simple reaction testing game. You must click on the button when it turns green. If you want to up the challenge, you can toggle duck mode which will try to distract you as the button turns green.</p>
        <h1 className="Q">Why should I care about reaction times?</h1>
        <p className="A">Reaction times are affected by many different factors such as age, gender, current situation. However, having a good reaction time can help one not only in athletic sports or video games, but can also help them avoid dangerous situations such as car crashes.</p>
        <h1 className="Q">Why does this game matter?</h1>
        <p className="A">While reaction times may shift based on different factors, they are not completely set in stone. Reaction times are a cognitive skill that can be developed through practice. This game seeks to make this process more fun, while also helping individuals improve.</p>
        <p id='credit'>Credit to <a href="https://www.fontspace.com/typewriter-font-f5889">fontspace</a> for the typewriter font and <a href="https://random-d.uk/">random-d.uk</a> for the random duck images.</p>
    </main>
  );
}