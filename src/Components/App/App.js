import React, { useReducer, createContext, useContext } from 'react';
import './App.scss';
import FoldersContainer from '../FoldersContainer/FoldersContainer';
import NoURLMatch from '../NoURLMatch/NoURLMatch.test';
import Main from '../Main/Main';
import { Route, Switch } from 'react-router-dom';

const newColorGenerator = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}
const defaultColors = [
  {color: newColorGenerator(), locked: false},
  {color: newColorGenerator(), locked: false},
  {color: newColorGenerator(), locked: false},
  {color: newColorGenerator(), locked: false},
  {color: newColorGenerator(), locked: false},
];
const reducer = (state = defaultColors, action = {}) => {
  switch (action.type) {
    case 'GENERATE COLORS':
      return action.payload.map(element => {
        if (element.locked) {
          return element
        }
        return element.color = newColorGenerator();
      });
    case 'TOGGLE LOCK':
      let newState = state.map((element, idx) => {

        if (idx === action.id) {
          return { color: element.color, locked: !element.locked }
        }
          return element
      })
      return newState
    default:
      return state;
  };
};

export const ColorsContext = createContext({color: '3f63fd', locked: false});

export const useStore = () => useContext(ColorsContext);

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultColors)
  const value = { state, dispatch }

  return (
    <ColorsContext.Provider value={value}>
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
    </ColorsContext.Provider>
  );
}

export default App;
