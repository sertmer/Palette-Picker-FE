import React, { useReducer, createContext, useContext } from 'react';
import './App.scss';
import FoldersContainer from '../FoldersContainer/FoldersContainer';
import Folder from '../Folder/Folder';
import NoURLMatch from '../NoURLMatch/NoURLMatch';
import Main from '../Main/Main';
import { Route, Switch, Link } from 'react-router-dom';

export const newColorGenerator = () => {
  let color =  Math.floor(Math.random()*16777215).toString(16);
  if (color.toString().length < 6) {
    newColorGenerator()
  }
  return color
};

const defaultState = {
  defaultColors: [
    {color: `${newColorGenerator()}`, locked: false},
    {color: `${newColorGenerator()}`, locked: false},
    {color: `${newColorGenerator()}`, locked: false},
    {color: `${newColorGenerator()}`, locked: false},
    {color: `${newColorGenerator()}`, locked: false},
  ],
  currentPalettes: [],
};
const reducer = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'GENERATE COLORS':
      let newDefaultColors = action.payload.defaultColors.map(element => {
        if (element.locked) {
          return element
        }
        return { color: `${newColorGenerator()}`, locked: false }
      });
      return {defaultColors: newDefaultColors, currentPalettes: []}
    case 'TOGGLE LOCK':
      let newState = state.defaultColors.map((element, idx) => {

        if (idx === action.id) {
          return { color: element.color, locked: !element.locked }
        }
          return element
      })
      return {defaultColors: newState, currentPalettes: []}
    case 'SET CURRENT PALETTES':
      return {defaultColors: state.defaultColors, currentPalettes: action.payload}
    case 'TOGGLE REVIEW LOCK': 
      let palettes = state.currentPalettes.map(palette => {
        if (palette.id === action.payload.id) {
           let paletteArr = palette.palette.map((color, idx) => {
            if (idx === parseInt(action.payload.colorId)) {
              return {color: color.color, locked: !color.locked}
            } else {
              return color
            }
          })

          return {id: palette.id, palette_name: palette.palette_name, palette: paletteArr, folder_id: palette.folder_id}
        }
        return palette
        })
        return {defaultColors: state.defaultColors, currentPalettes: palettes}
    case 'GENERATE PALETTE COLORS': 
      let newColorPalettes = state.currentPalettes.map(palette => {
        if (palette.id === action.payload) {
          let newColorArr = palette.palette.map(color => {
            if (!color.locked) {
              return {color: `#${newColorGenerator()}`, locked: false}
            }
            return color
          })
          return {id: palette.id, palette_name: palette.palette_name, palette: newColorArr, folder_id: palette.folder_id}
        }
        return palette 
      })
      return {defaultColors: state.defaultColors, currentPalettes: newColorPalettes}
    default:
      return state;
  };
};

export const ColorsContext = createContext({color: '3f63fd', locked: false});

export const useStore = () => useContext(ColorsContext);

const App = () => {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const value = { state, dispatch }

  return (
    <ColorsContext.Provider value={value}>
      <main className="App">
        <header className="App-header">
          <Link className='home-link' to={'/'}>Palette Picker</Link>
        </header>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/folders' component={FoldersContainer} />
          <Route exact path='/folders/:folderId/palettes' render={({ match }) => {
            const { folderId } = match.params
            return <Folder id={folderId} />
          }} 
          />
          <Route component={NoURLMatch} />
        </Switch>
      </main>
    </ColorsContext.Provider>
  );
}

export default App;
