import React from 'react';
import { useStore } from '../App/App';
import './Color.scss';
import lockedIcon from '../../Images/lock.svg';
import unlockedIcon from '../../Images/unlock.svg';

const Color = ({color, locked, id, review, border}) => {
  const { state, dispatch } = useStore();
  let icon, text, column;
  locked ? icon = lockedIcon : icon = unlockedIcon;
  locked ? text = 'an icon of a locked lock' : text = 'an icon of an unlocked lock';
  let divStyle = {
    backgroundColor: `#${color}`,
    borderRadius: `${border}`,
  }

  if (review) {
  column = (
      <div className='color-column bubble' style={divStyle}>
        <img className='lock-icon hidden' src={icon} alt={text} 
        onClick={() => dispatch({type:'TOGGLE LOCK', id})}/>
        <h2 className='color-h2 hidden'>#{color}</h2>
      </div>)
  } else {
    column = (
      <div className='color-column' style={divStyle}>
        <img className='lock-icon' src={icon} alt={text} 
        onClick={() => dispatch({type:'TOGGLE LOCK', id})}/>
        <h2 className='color-h2'>#{color}</h2>
      </div>)
  }

  return (
    <>
    {column}
    </>
  )
}

export default Color;