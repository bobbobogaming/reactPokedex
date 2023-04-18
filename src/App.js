import { ReactCard } from './components';
import { PokePreview } from './pokePreview'
import { PokeList } from './pokeList'
import './style/App.css';
import './style/reactComponents.css';
import { useRef, useState } from 'react';

// code snippet make first letter of a string uppercase:
// text.replace(/^[a-zA-Z]/g,text.charAt(0).toUpperCase())

function App() {
  let pokePreviewRef = useRef(null);
  const [shouldAnimateIn,setAnimationDirectionToIn] = useState(true);
  const switchAnimationDirection = () => {
    setAnimationDirectionToIn(!shouldAnimateIn)
  }
  
  return (
    <div className="App">
        <div className={`splitContainer animateSplit${(shouldAnimateIn)?"In":"Out"}`} style={{gap: shouldAnimateIn?0:"1500px"}}>
          <div className='rightSplit'></div>
          <div className='leftSplit'></div>
        </div>
        <ReactCard className={`pokedex-background animateBackground${(shouldAnimateIn)?"In":"Out"}`} style={{width: shouldAnimateIn?"40px":"1550px"}}>
          <div>
            <PokePreview ref={pokePreviewRef}/>
            <PokeList handleSection={(name)=>pokePreviewRef.current.changeSelectedItem(name)}/>
          </div>
        </ReactCard>
    </div>
  );
}

export default App;
