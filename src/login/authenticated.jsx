import React from 'react';

import { useNavigate} from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('userName')
        props.logOut()
    }

    return(
        <div>
            <div className='playerName'>{props.userName}</div>
            <Button onClick={() => navigate('/game')}>Play</Button>
            <Button onClick={() => logout()}>Logout</Button>
        </div>
    )
}