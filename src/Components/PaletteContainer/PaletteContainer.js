import React from 'react';
import { useStore } from '../App/App';
import './PaletteContainer.scss'
import Color from '../Color/Color';

const PaletteContainer = ({ palette }) => {
  const { state, dispatch } = useStore();
  let colorsToDisplay, container;

  if (!palette) {
    colorsToDisplay = state.map((element, idx) => {
      return <Color id={idx} key={idx} color={element.color.toUpperCase()} 
      locked={element.locked} review={false}/>
    })
    container = (
      <section className='palette-container-normal'>
        {colorsToDisplay}
      </section>)
  } else {
    colorsToDisplay = palette.map((element, idx) => {
      let border;
      idx === 0 ? border = '25px 0 0 25px'
      : idx === 4 ? border = '0 25px 25px 0'
      : border = ''
      element = element.split('').filter(letter => letter !== '#').join('')
      return <Color id={idx} key={idx} color={element.toUpperCase()} 
      locked={true} review={true} border={border}/>
    })
    container = (
      <section className='speech-bubble'>
        <div className='inner-bubble-div'>
        {colorsToDisplay}
        </div>
      </section>)
  }
  return (
    <>
      {container}
    </>
  )
}

export default PaletteContainer;