import './App.css';
import React, {useState, useEffect} from "react";
import c from './images/background.webp'
import c1 from './images/aogaeru.webp';
import c2 from './images/catbus.jpg';
import c3 from './images/teto.webp';
import {Link} from 'react-router-dom'
import Timer from './Timer';


// firebase setting 

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';

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

async function getLocations(db){
  const locationsCol = collection(db,'location')
  const locationSnapshot = await getDocs(locationsCol);
  const locationList = locationSnapshot.docs.map(doc=>doc.data())
  return locationList
}

// add data to firebase storage 

async function saveScore(name,time){
    try {
        await addDoc(collection(getFirestore(),'scores'),{
        name:name,
        time:time
        })
        console.log('data was saved')
    }
catch(error){
    console.error('Error writing new score to database',error)
}
}


//image size 1200x675

const Game =(props)=>{

    const [dict,setDict] = useState({'Aogaeru':false,'Catbus':false,'Teto':false})
    
    useEffect(()=>{
        const image = document.querySelector('.image')
        const picture = document.querySelector('.picture')

        function gameOver(){
            let count = 0;
            for (let i of Object.keys(dict)){
               count += dict[i]}
            return count===3;
        }

        function timeIt(){
            return parseInt(document.querySelector('.timer').innerHTML)
        }

        const anyClick = (e) =>{
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

            function addLi(name,x,y){
                const li = document.createElement('li');
                li.innerText=name;
                const afterGame = (message)=>{
                                const time =timeIt()
                                message.innerHTML=`Cleared in ${time} seconds`
                                const timer = document.querySelector('.timer')
                                timer.remove()
                                const picture = document.querySelector('.picture')
                                picture.remove()
                                const image = document.querySelector('.image')
                                image.innerHTML=`<div class='record'>
                                <h1>Enter your name for your score record</h1>
                                <input id="name" type='text' placeholder="Enter your name"/>
                                <button id='submit'>Submit</button>
                                
                                
                                </div>
                                `

                                const button = image.querySelector('#submit')
                                button.addEventListener('click',
                                ()=>{
                                    const name= image.querySelector('#name').value
                                    if (name==''){
                                        return;
                                    }
                                    saveScore(name,time)
                                    image.innerHTML=`
                                    <a href="/board"><Button class="view">View Board</Button></a>`
                                    
                                })
                                
                                }

                li.addEventListener('click',(e)=>{
                    let array = dict
                    const message = document.querySelector('.message')
                    if (name==='Catbus'){
                        getLocations(db).then(data=>{
                         let locationX;
                         let locationY;   
                         for (let i of data){
                            if (i.character==='Catbus'){
                                //1102
                                locationX = (i.location[0])
                                // 117
                                locationY = (i.location[1])
                            
                            }
                         }
                         // (x>1061 & x<1143) & (y >83 & y<151)
                         if ((x> locationX-41 & x<locationX +42) & (y >locationY-34 & y<locationY +34)){
                            console.log('correct')
                            array['Catbus']=true
                            setDict(array)
                            const ca = document.querySelector('#catbus')
                            ca.innerHTML+= '<span>✓</span>'
                            message.innerHTML= `Correct`
                            message.style.color='green'
                            if(gameOver()){
                                afterGame(message)
                            }
                        }
                        else{
                           message.innerText = `It's not Catbus`
                           message.style.color='red'
                        }
                         


                    
                         })
                        

                    }
                    else if (name==='Aogaeru'){
                        getLocations(db).then(data=>{
                            let locationX;
                            let locationY;   
                            for (let i of data){
                               if (i.character==='Aogaeru'){
                                   //233
                                   locationX = (i.location[0])
                                   // 615
                                   locationY = (i.location[1])
                               
                               }
                            }
                        if((x>locationX-50 & x<locationX+50) & (y>locationY-38 & y<locationY+40)){
                            console.log('correct')
                            array['Aogaeru']=true
                            const ao = document.querySelector('#aogaeru')
                            ao.innerHTML+= '<span>✓</span>'
                            message.innerHTML= `Correct`
                            message.style.color='green'
                            if(gameOver()){
                                afterGame(message)
                            }
                        }
                        else{
                            message.innerText = `It's not Aogaeru`
                            message.style.color='red'
                         }
                         })
                    }

                    else if (name ==='Teto'){
                        getLocations(db).then(data=>{
                            let locationX;
                            let locationY;   
                            for (let i of data){
                               if (i.character==='Teto'){
                                   //230
                                   locationX = (i.location[0])
                                   // 445
                                   locationY = (i.location[1])
                               
                               }
                            }
                        if((x>locationX-30 & x<locationX+30) & (y<locationY+25 & y>locationY-25)){
                            console.log('correct')
                            array['Teto']=true;
                            setDict(array)
                            const te = document.querySelector('#teto')
                            te.innerHTML+= '<span>✓</span>'
                            message.innerHTML= `Correct`
                            message.style.color='green'
                            if(gameOver()){
                                afterGame(message)
                            }
                        }
                        else{
                            message.innerText = `It's not Teto`
                            message.style.color='red'
                         }
                        })
                    }

                    circle.remove()
                    })
                list.appendChild(li)
            }
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            if(!dict['Aogaeru']){
            addLi('Aogaeru',x,y)}
            if(!dict['Catbus']){
            addLi('Catbus',x,y)}
            if(!dict['Teto']){
            addLi('Teto',x,y)}
            circle.appendChild(list)
            image.appendChild(circle)
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
                    <h3 id='aogaeru'>Aogaeru</h3>
                </div>
                <div className='target-div'>
                    <img className='target' src={c2}></img>
                    <h3 id='catbus'>Catbus</h3>
                </div>
                <div className='target-div'>
                    <img className='target' src={c3}></img>
                    <h3 id='teto'>Teto</h3>
                </div>
                <h1 className='message'>Find Them!!</h1>
                {<Timer />}
            </div>
            <div className='image'>
               <img className='picture' src={c}></img>
            </div>
        </div>
    )
}

export default Game;