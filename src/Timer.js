import React, { useEffect, useState } from 'react';
import './App.css';


const Timer = ({ callQueuedTime }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
  setTimeout(function(){
    setTime(time+1)
  },1000)
    
  }, [time]);
  return <h2 className='timer'>{time}</h2>
          
};

export default Timer;