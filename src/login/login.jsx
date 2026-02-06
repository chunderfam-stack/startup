import React from 'react';

export function Login() {
  return (
    <main>
        <div class="bg-yellow">
            <h1>Login to save your scores!</h1>
            <form method="get" action="game">
                <div>
                    <input type="text" placeholder="your@email.com" />
                </div>
                <div>
                    <input type="password" placeholder="password" />
                </div>
                <button type="submit">Login</button>
                <button type="submit">Create</button>
            </form>
        </div>
    </main>
  );
}