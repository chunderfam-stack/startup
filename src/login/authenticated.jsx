import React from 'react';

import { useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('userName');
        localStorage.removeItem('highScore');
        props.onLogOut();
    }

    return(
        <div>
            <div className='playerName'>Welcome {props.userName}!</div>
            <Button onClick={() => navigate('/game')}>Play</Button>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    )
}