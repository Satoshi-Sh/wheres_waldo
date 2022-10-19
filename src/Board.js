import './App.css';
import React, {useState} from "react";
import c from './images/catbus.jpg'
import {Link} from 'react-router-dom'


const Board =(props)=>{
    return (
        <div className='board'>
            <h1>Top 10 Players</h1>
        <div className='board-content'>
           
           <img className='logo' src={c} alt='logo'></img>
           <Link to='/'>
           <button>
            Back
           </button>
           </Link>
        </div>
        </div>
    )
}

export default Board;