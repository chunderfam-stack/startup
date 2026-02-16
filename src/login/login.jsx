import React from 'react';

import { Authenticated } from './authenticated';
import {UnAuthenticated } from './unauthenticated';
import {AuthState} from './handleStates';

export function Login({userName, authState, onAuthChange}) {
  return (
    <main>
        <div class="bg-yellow">
            {authState !== Unknown && <h1>Login to save your scores!</h1>}
            {authState === Authenticated && (<Authenticated userName={userName} onLogOut={() => onAuthChange(userName, AuthState.UnAuthenticated)}/>)}
        </div>
    </main>
  );
}