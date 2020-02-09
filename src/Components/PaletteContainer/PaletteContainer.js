import React from 'react';
import { useStore } from '../App/App';
import './PaletteContainer.scss'
import Color from '../Color/Color';

const PaletteContainer = ({ palette }) => {
  const { state, dispatch } = useStore();
  let colorsToDisplay;

  if (!palette) {
    colorsToDisplay = state.map((element, idx) => {
      return <Color id={idx} key={idx} color={element.color.toUpperCase()} locked={element.locked}/>
    })
  } else {
    colorsToDisplay = palette.map((element, idx) => {
      element = element.split('').filter(letter => letter !== '#').join('')
      return <Color id={idx} key={idx} color={element.toUpperCase()} locked={true}/>
    })
  }
  return (
    <section className='palette-container'>
      {colorsToDisplay}
    </section>
  )
}

export default PaletteContainer;