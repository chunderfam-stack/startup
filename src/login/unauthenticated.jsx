import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';



export function UnAuthenticated(props){
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState();

    async function createUser(){
        loginOrCreate(`api/auth/login`);
    }
    async function loginUser(){
        loginOrCreate(`api/auth/create`);
    }

    async function loginOrCreate(endpoint){
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({username : userName, password : password}),
            headers: {
                'Content-type': 'application/json; charset=UTF 8', 
            },
        });
        if(response?.status == 200){
            localStorage.setItem('userName', userName);
            props.onLogin(userName);
        } else{
            const body = await response.json();
            setDisplayError(`Error: ${body.msg}`)
        }
    }

    return(
        <>
            <div>
                <div className='input-group mb-3'>
                    <input className='form-control' type='text' onChange={(e) => setUserName(e.target.value)} value={userName} placeholder="username"/>
                </div>
                <div className='input-group mb-3'>
                    <input className='form-control' type='password' onChange={(e) => setPassword(e.target.value)} value={password}  placeholder='password'/>
                </div>
                <Button onClick={() => loginUser()} disabled={!userName || !password}>
                    Login
                </Button>
                <Button onClick={() => createUser()} disabled={!userName || !password}>
                    Create
                </Button>
            </div>
            
        </>
    );
    
} 