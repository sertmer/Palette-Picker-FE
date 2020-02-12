import React, { useState, useEffect } from 'react';
import { useStore } from '../App/App';
import { getPalettes } from '../../apiCalls/apiCalls';
import PaletteContainer from '../PaletteContainer/PaletteContainer';
import './Folder.scss';

const Folder = ({ id }) => {
  const { state, dispatch } = useStore();
  const [folderState, setFolderState ] = useState([]);
  
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

  // useEffect((prevState) => {
  //   if (state.currentPalettes.length > 0 && state !== prevState) {
  //   getPalettes(id)
  //     .then(data => {
  //       let lockedDataArr = data.map(element => {
  //         return (
  //           {
  //             id: element.id, 
  //             palette_name: element.palette_name,
  //             palette: [ 
  //               {color: element.color_one, locked: true},
  //               {color: element.color_two, locked: true},
  //               {color: element.color_three, locked: true},
  //               {color: element.color_four, locked: true},
  //               {color: element.color_five, locked: true},
  //             ],
  //             folder_id: element.folder_id
  //           }
  //         )
  //       })
  //     dispatch({type: 'SET CURRENT PALETTES', payload: data})
  //     })
  //     .catch(error => console.error(`Something went wrong: ${error}`))
  //   }
  // }, [state])

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