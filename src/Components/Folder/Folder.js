import React, { useState, useEffect } from 'react';
import { getPalettes } from '../../apiCalls/apiCalls';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import './Folder.scss';

const Folder = ({ id }) => {
  const [ palettes, setPalettes ] = useState([]);

  useEffect((id) => {
    getPalettes(id)
      .then(data => setPalettes(data))
      .catch(error => console.error(`Something went wrong ${error}`))
  }, [])

  let palettesArray = palettes.map(palette => {

    let paletteArr = Object.values(palette)
    console.log(paletteArr)
    let colorsArray = [
      paletteArr[2], 
      paletteArr[3], 
      paletteArr[4], 
      paletteArr[5], 
      paletteArr[6]]

    return (
      <div>
        <h2>{palette.palette_name}</h2>
        <PaletteContainer key={palette.id} id={palette.id} 
        palette={colorsArray} />
      </div>)
  })
  return (
    <div>
    <h2>its the folder, ok?</h2>
    {palettesArray}
    </div>
  )
}

export default Folder;