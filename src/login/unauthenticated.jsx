import React from 'react';

import Button from 'react-bootstrap/Button';




export function UnAuthenticated(props){
    const [userName, setUserName] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState();

    async function createUser(){
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }
    async function loginUser(){
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    }

    return(
        <div>
            <div className='input-group mb-3'>
                <input className='form-control' type='text' onChange={(e) => setUserName(e.target.value)} value={username} placeholder="your@email.com"/>
            </div>
            <div className='input-group mb-3'>
                <input className='form-control' type='text' onChange={(e) => setUserName(e.target.value)} value={username} />
            </div>
            <Button onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </Button>
            <Button onClick={() => createUser()} disabled={!userName || !password}>
                Create
            </Button>
        </div>
        
    );
    
} 