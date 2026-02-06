import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Game } from './game/game';
import { About } from './about/about';

export default function App() {
  return ( 
    <BrowserRouter>
        <div className='body'>
            <header className="bg-dark container-fluid">
                <nav className="navbar fixed-top navbar-dark">
                    <h1 className="navbar-brand" href="#">Reactionary</h1>
                    <menu className="navbar-nav">
                        <li className="nav-item"><NavLink className='nav-link' to=''>Login</NavLink></li>
                        <li className="nav-item"><NavLink className='nav-link' to='game'>Play</NavLink></li>
                        <li className="nav-item"><NavLink className='nav-link' to='about'>About</NavLink></li>
                    </menu>
                </nav>
            </header>

            <Routes>
                <Route path='/' element={<Login />} exact />
                <Route path='/game' element={<Game />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>

            <footer className="bg-secondary text-white-50">
                <div className="container-fluid">
                    <a className="text-reset" href = "https://github.com/chunderfam-stack/startup">Author/Github</a>
                </div>
            </footer>
        </div>
    </BrowserRouter>
    );
}

function NotFound(){
    return(<main className=''>
        <p>It appears the page you are looking for does not exist.</p>
    </main>)
}