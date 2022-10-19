
import './App.css';

import logo from './images/kodama.png'
import {Link} from 'react-router-dom'




function App() {
  // getLocations(db).then(data=>{
  //   console.log(data[0])
  //}
    
  //)
  
  return (
    <div className="App">
      <h1>Where's Waldo</h1>
      <img src={logo} className='logo'></img>
      <div className='buttons'>
        <Link to='game'>
        <button>
          Play Game
        </button>
        </Link>
        <Link to='board'>
        <button>
          Leader Board
        </button>
        </Link>
      </div>

    </div> 
  );
}

export default App;
