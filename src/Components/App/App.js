import React from 'react';
import './App.scss';
import Menu from '../Menu/Menu';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import FoldersContainer from '../FoldersContainer/FoldersContainer';
import NoURLMatch from '../NoURLMatch/NoURLMatch.test';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Palette Picker</h1>
      </header>
      <Switch>
        <Route exact path='/' component={PaletteContainer} />
        <Route exact path='/' component={Menu}/>
        <Route exact path='/folders' component={FoldersContainer} />
        <Route component={NoURLMatch} />
      </Switch>
    </main>
  );
}

export default App;
