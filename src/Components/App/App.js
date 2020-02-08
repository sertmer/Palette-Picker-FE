import React from 'react';
import './App.scss';
import Menu from '../Menu/Menu';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import Folder from '../Folder/Folder';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hey</h1>
      </header>
      <Menu />
      <PaletteContainer />
      <Folder />
    </div>
  );
}

export default App;
