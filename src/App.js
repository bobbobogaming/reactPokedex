import { ReactCard } from './components';
import { PokePreview } from './pokePreview';
import { PokeList } from './pokeList';
import { PokeInfoPage } from './pokeInfoPage';
import './style/App.css';
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
        <div className={`splitContainer animateSplit${(shouldAnimateIn)?"In":"Out"}`} style={{gap: shouldAnimateIn?"var(--split-closed-gap)":"var(--split-open-gap)"}}>
          <div className='rightSplit'></div>
          <div className='leftSplit'></div>
        </div>
        <ReactCard className={`pokedex-background animateBackground${(shouldAnimateIn)?"In":"Out"}`} style={{width: shouldAnimateIn?"var(--background-closed-width)":"var(--background-open-width)"}}>
          <div>
            {/*<PokeInfoPage />*/}

            <PokePreview ref={pokePreviewRef} animatePageChange={switchAnimationDirection} />
            <PokeList handleSection={(name)=>pokePreviewRef.current.changeSelectedItem(name)}/>
          </div>
        </ReactCard>
    </div>
  );
}

export default App;
