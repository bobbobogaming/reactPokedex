import { ReactCard } from './components';
import './style/App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

function App(props) {
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
            <Outlet context={[switchAnimationDirection]} />
          </div>
        </ReactCard>
    </div>
  );
}

export default App;
