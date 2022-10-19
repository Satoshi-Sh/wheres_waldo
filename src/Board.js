import './App.css';
import React, {useState,useEffect} from "react";
import c from './images/catbus.jpg'
import {Link} from 'react-router-dom'

// firebase setting 

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-PZ_ClKJdolHQ-lDNAmuUMd0tP0gwHuM",
  authDomain: "wheres-waldo-ba8c4.firebaseapp.com",
  projectId: "wheres-waldo-ba8c4",
  storageBucket: "wheres-waldo-ba8c4.appspot.com",
  messagingSenderId: "820883740672",
  appId: "1:820883740672:web:817f498b56d12c3a9b20e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


// get a location data 

async function getScores(db){
  const scoresCol = collection(db,'scores')
  const scoresSnapshot = await getDocs(scoresCol);
  const scoresList = scoresSnapshot.docs.map(doc=>doc.data())
  return scoresList
}



const Board =(props)=>{
    useEffect(() =>{
    getScores(db).then(data=>{
        
        data.sort((a,b) => a.time - b.time);
        const ranking = document.querySelector('.ranking')
        let count=1;
        if (!document.querySelector('.row')){
        for (let i of data.slice(0,10)){
        let row = document.createElement('div')
        row.className='row'
        row.innerHTML = `
        <div id='rank'>${count}</div>
        <div id='s_name'>${i.name}</div>
        <div id='time'>${i.time}</div>
        `
        count++;
        ranking.appendChild(row)
        }
    }
     })
    },[]);
    return (
        <div className='board'>
            <h1>Top 10 Players</h1>
        <div className='board-content'>
           
           <img className='logo' src={c} alt='logo'></img>
           <div className='ranking'>


           </div>
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