import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from '../App/App';
import './PaletteContainer.scss'
import Color from '../Color/Color';
import shuffle from '../../Images/001-random.svg';
import lockedIcon from '../../Images/lock.svg';
import unlockedIcon from '../../Images/unlock.svg';
import heart from '../../Images/002-heart.svg';
import { randomColorGenerator } from '../App/App';
import { patchPalette, deletePalette, deleteFolder } from '../../apiCalls/apiCalls';
import PropTypes from 'prop-types'



const displayEditMenu = (e, id=false) => {
  if(!id) {
    return e.target.parentNode.parentNode.nextSibling.classList.toggle('hidden')
  }
  e.target.parentNode.classList.toggle('hidden')
}


const PaletteContainer = ({ palette, name, id }) => {
  const [ triggerRender, setTriggerRender ] = useState(true)
  const { state, dispatch } = useStore();
  const history = useHistory();
  
  let colorsToDisplay, container, icon, text;
  
  const toggleLock = (e) => {
    dispatch({type: 'TOGGLE REVIEW LOCK', payload: {colorId: e.target.id, id}})
  }
  
  const displayLock = (bool) => {
    if (!bool) {
      text = 'an icon of an unlocked lock'
      return  unlockedIcon
    }
    text = 'an icon of a locked lock'
    return lockedIcon
  }

  const handlePatch = (palette, name, id, e) => {
    let folderId = window.location.pathname.split('/')[2]
    patchPalette(palette, name, id, folderId)
      .then(res => console.log(res))
      .then(data => console.log(data))
      .catch(error => console.error(error))
    displayEditMenu(e, id)
  }

  const handleDelete = (id, e) => {      
    deletePalette(id)
      .then(res => {
        e.target.parentNode.parentNode.parentNode.parentNode.remove()
      })
      .catch(error => console.log(error))
    

    if (state.currentPalettes.length === 1) {
      deleteFolder()
        .then(res => {
          history.push('/')
        })
        .catch(error => console.log(error))
    }
  }
  
  if (!palette) {
    colorsToDisplay = state.defaultColors.map((element, idx) => {
      return <Color id={idx} key={idx} color={element.color.toUpperCase()} 
      locked={element.locked} review={false}/>
    })
    container = (
      <section className='palette-container-normal'>
        {colorsToDisplay}
      </section>)
  } else {
    colorsToDisplay = palette.map((color, idx) => {
      let border;
      idx === 0 ? border = '25px 0 0 25px'
      : idx === 4 ? border = '0 25px 25px 0'
      : border = ''
      return <Color id={idx} key={idx} color={color.color.toUpperCase()} 
      locked={true} review={true} border={border}/>
    })

    container = (
      <section className='palette-section'>
        <div className='palette-review-div-wrapper'>
          <section className='speech-bubble'>
            <div className='inner-bubble-div'>
            {colorsToDisplay}
            </div>
          </section>
          <h2 className='palette-name-h2'>{name}</h2>
          <div className='edit-delete-div'>
            <button type='button' className='edit-btn' onClick={(e) => displayEditMenu(e)}>EDIT</button>
            <p className='delete-btn' onClick={(e) => handleDelete(id, e)}>🗑</p>
          </div>
        </div>
        <div className='edit-menu hidden'>
          <div className='lock-div'>
            <img id={0} className='lock-icon' src={displayLock(palette[0].locked)} alt={text} onClick={(e) => toggleLock(e)}/>
            <img id={1} className='lock-icon' src={displayLock(palette[1].locked)} alt={text} onClick={(e) => toggleLock(e)}/>
            <img id={2} className='lock-icon' src={displayLock(palette[2].locked)} alt={text} onClick={(e) => toggleLock(e)}/>
            <img id={3} className='lock-icon' src={displayLock(palette[3].locked)} alt={text} onClick={(e) => toggleLock(e)}/>
            <img id={4} className='lock-icon' src={displayLock(palette[4].locked)} alt={text} onClick={(e) => toggleLock(e)}/>
          </div>
          <img  className='palette-icon' src={shuffle} alt='shuffle icon' 
          onClick={() => dispatch({type: 'GENERATE PALETTE COLORS', payload: id})}></img>
          <img className='palette-icon' src={heart} alt='icon of a heart' onClick={(e) => handlePatch(palette, name, id, e)}></img>
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

PaletteContainer.propTypes = {
  palette: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.number
}