import React, { useState } from 'react';
import './PaletteContainer.scss'
import Color from '../Color/Color';


const PaletteContainer = () => {
  const newColorGenerator = () => {
    return Math.floor(Math.random()*16777215).toString(16);
  }
  let arr = [1, 2, 3, 4, 5];
  let colorsToDisplay = arr.map((color, idx) => {
    color = newColorGenerator()
    return <Color key={idx} color={color} />
  })
  return (
    <section className='palette-container'>
      {colorsToDisplay}
    </section>
  )
}

export default PaletteContainer;