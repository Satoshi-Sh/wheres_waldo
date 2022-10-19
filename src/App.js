
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import logo from './images/kodama.png'
import {Link} from 'react-router-dom'

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
