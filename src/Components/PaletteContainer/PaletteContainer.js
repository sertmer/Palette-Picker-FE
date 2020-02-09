import React from 'react';
import { useStore } from '../App/App';
import './PaletteContainer.scss'
import Color from '../Color/Color';

const PaletteContainer = () => {
  const { state, dispatch } = useStore();

  let colorsToDisplay = state.map((element, idx) => {
    return <Color key={idx} color={element.color} locked={element.locked}/>
  })
  return (
    <section className='palette-container'>
      {colorsToDisplay}
    </section>
  )
}

export default PaletteContainer;