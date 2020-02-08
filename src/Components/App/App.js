import React from 'react';
import './App.scss';
import FoldersContainer from '../FoldersContainer/FoldersContainer';
import NoURLMatch from '../NoURLMatch/NoURLMatch.test';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Palette Picker</h1>
      </header>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/folders' component={FoldersContainer} />
        <Route component={NoURLMatch} />
      </Switch>
    </main>
  );
}

export default App;
