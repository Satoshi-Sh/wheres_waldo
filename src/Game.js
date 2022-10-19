import './App.css';
import React, {useState, useEffect} from "react";
import c from './images/background.webp'
import c1 from './images/aogaeru.webp';
import c2 from './images/catbus.jpg';
import c3 from './images/teto.webp';
import {Link} from 'react-router-dom'


//image size 1200x675

const Game =(props)=>{
    
    useEffect(()=>{
        const image = document.querySelector('.image')
        const picture = document.querySelector('.picture')

        const anyClick = (e) =>{
            console.log('clicked')
            if(document.querySelector('#circle')){
                document.querySelector('#circle').remove()
            }
        }
        document.addEventListener('click',anyClick,true)
        const positionClick = (e)=>{
            const rect= picture.getBoundingClientRect()
            const circle = document.createElement('div');
            circle.id='circle';
            circle.style.position = 'absolute';
            circle.style.left=`${e.clientX- rect.left -40}px`;
            circle.style.top = `${e.clientY - rect.top -40}px`;
            circle.style.width = '80px';
            circle.style.height='80px';
            circle.style.border='4px dashed red'
            circle.style.borderRadius='50%';
            // for list selection 
            const list = document.createElement('ul')
            list.id='list'
            list.innerHTML=`
              <li class='question'>Which Caracter?</li>
              `
            function addLi(name){
                const li = document.createElement('li');
                li.innerText=name;
                li.addEventListener('click',(e)=>{
                    console.log(e.target.innerText)
                    circle.remove()
                    })
                list.appendChild(li)
            }
            addLi('Aogaeru')
            addLi('Catbus')
            addLi('Teto')
            circle.appendChild(list)
            image.appendChild(circle)
            console.log(e.clientX - rect.left,e.clientY - rect.top)
        }
        
        picture.addEventListener('click',positionClick,false)
        

        return () => {
            picture.removeEventListener('click',positionClick)
            document.removeEventListener('click',anyClick)
        }
    
    },[])

    return (
        <div className='game'>

            <div className='header'>
                <div className='target-div'>
                    <img className='target' src={c1}></img>
                    <h3>Aogaeru</h3>
                </div>
                <div className='target-div'>
                    <img className='target' src={c2}></img>
                    <h3>Catbus</h3>
                </div>
                <div className='target-div'>
                    <img className='target' src={c3}></img>
                    <h3>Teto</h3>
                </div>
                <h1>Find Them!!</h1>
            </div>
            <div className='image'>
               <img className='picture' src={c}></img>
            </div>
        </div>
    )
}

export default Game;