import React, { useEffect } from 'react';
import { useStore } from '../App/App';
import { getPalettes } from '../../apiCalls/apiCalls';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import './Folder.scss';
import PropTypes from 'prop-types';

const Folder = ({ id }) => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    getPalettes(id)
      .then(data => {
        let lockedDataArr = data.map(element => {
          return (
            {
              id: element.id, 
              palette_name: element.palette_name,
              palette: [ 
                {color: element.color_one, locked: true},
                {color: element.color_two, locked: true},
                {color: element.color_three, locked: true},
                {color: element.color_four, locked: true},
                {color: element.color_five, locked: true},
              ],
              folder_id: element.folder_id
            }
          )
        })
        dispatch({type: 'SET CURRENT PALETTES', payload: lockedDataArr})
      })
      .catch(error => console.error(`Something went wrong ${error}`))
  }, [])

  let palettesArray = state.currentPalettes.map(palette => {
    let paletteArr = Object.values(palette)
    return (
        <div className='palettes-viewer-div' key={palette.id}>
          <PaletteContainer key={palette.id} id={palette.id} 
          palette={palette.palette} name={palette.palette_name}/>
        </div>)
  })


  return (
    <div className='folder'>
      {palettesArray}
    </div>
  )
}

export default Folder;

Folder.propTypes = {
  id: PropTypes.number
}