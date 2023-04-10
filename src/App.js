import { ButtonStyle, ReactButton, ReactCard } from './components';
import typeicon from './assets/types/fire.svg';
import './style/App.css';
import './style/reactComponents.css';

function App() {
  return (
    <div className="App">
        <div className='splitContainer'>
          <div className='rightSplit'></div>
          <div className='leftSplit'></div>
        </div>
        <ReactCard className={"pokedex-background"}>
          <div>
            <ReactCard className={"leftContainer"}>
              <ReactCard id={"pokemonPreview"}>
                <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png' alt='pokemonImage'></img>
              </ReactCard>
              <h1>Bulbasaur</h1>
              <h5>A strange seed was planted on its back at birth. The plant sprouts and grows with this POKéMON.</h5>
              <div id='types'>
                <ReactCard>
                  <img src={typeicon} alt='svg'></img>
                  <h4>Fire</h4>
                </ReactCard>
                <ReactCard>

                </ReactCard>
              </div>
              <ReactButton buttonStyle={ButtonStyle.danger}>More info</ReactButton>
            </ReactCard>
            <ReactCard className={"rightContainer"}>
              <div>
                <ReactCard className={"pokemonListItem"}>
                  <p>#1</p>
                  <h4>Bulbasaur</h4>
                </ReactCard>
                <ReactCard className={"pokemonListItem"}>
                  <p>#1</p>
                  <h4>Bulbasaur</h4>
                </ReactCard>
                <ReactCard className={"pokemonListItem"}>
                  <p>#1</p>
                  <h4>Bulbasaur</h4>
                </ReactCard>
              </div>
              <div>
                <ReactButton buttonStyle={ButtonStyle.light}>Previous</ReactButton>
                <ReactButton buttonStyle={ButtonStyle.light}>Next</ReactButton>
              </div>
            </ReactCard>
          </div>
        </ReactCard>
    </div>
  );
}

export default App;
