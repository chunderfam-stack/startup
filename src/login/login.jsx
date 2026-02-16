import React from 'react';

import Button from 'react-bootstrap/Button';

import { Authenticated } from './authenticated';
import {UnAuthenticated } from './unauthenticated';
import {AuthState} from './handleStates';
import { Unauthenticated } from '../../../simon-react/src/login/unauthenticated';

export function Login({userName, authState, onAuthChange}) {
  return (
    <main>
        <div class="bg-yellow">
            {authState !== AuthState.Unknown && <h1>Login to save your scores!</h1>}
            {authState === AuthState.Authenticated && (<Authenticated userName={userName} onLogOut={() => onAuthChange(userName, AuthState.UnAuthenticated)}/>)}
            {authState === AuthState.UnAuthenticated && (<Unauthenticated userName={userName} onLogin={(loginUserName) => onAuthChange(loginUserName, AuthState.Authenticated)}/>)}
        </div>
    </main>
  );
}