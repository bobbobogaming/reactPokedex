import { ReactCard } from './components';
import { PokePreview } from './pokePreview'
import { PokeList } from './pokeList'
import './style/App.css';
import './style/reactComponents.css';

// code snippet make first letter of a string uppercase:
// text.replace(/^[a-zA-Z]/g,text.charAt(0).toUpperCase())

function App() {
  return (
    <div className="App">
        <div className='splitContainer'>
          <div className='rightSplit'></div>
          <div className='leftSplit'></div>
        </div>
        <ReactCard className={"pokedex-background"}>
          <div>
            <PokePreview />
            <PokeList />            
          </div>
        </ReactCard>
    </div>
  );
}

export default App;
