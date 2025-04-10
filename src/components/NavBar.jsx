import React from 'react';
import "./NavBar.css";
import steamLogo from "../resources/steam-logo.webp";
import { FaGithub } from 'react-icons/fa';

function NavBar(){
    return (
        <div className="navbar">
            <div className='steam-logo'>
                <img src={steamLogo}/>
                <h2>Steam Sales</h2>
            </div>

            <div className="github-logo">
                <a href="https://github.com/DubPlayer" target="_blank" rel="noopener noreferrer">  <FaGithub size={60}/> </a>
                

            </div>

        </div>
    );
}

export default NavBar;