import { ButtonStyle, ReactButton } from './components';
import logo from './logo.svg';
import './style/App.css';
import './style/reactComponents.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <ReactButton buttonStyle={ButtonStyle.outlineInfo} className="something" onClick={() => console.log("hey")}>click me</ReactButton>
        <div className='splitContainer'>
          <div className='rightSplit'></div>
          <div className='leftSplit'></div>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
