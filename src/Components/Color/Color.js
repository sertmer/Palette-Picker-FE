import React from 'react';
import { useStore } from '../App/App';
import './Color.scss';
import lockedIcon from '../../Images/lock.svg';
import unlockedIcon from '../../Images/unlock.svg';

const Color = ({color, locked, id}) => {
  const { state, dispatch } = useStore();
  let icon, text;
  locked ? icon = lockedIcon : icon = unlockedIcon;
  locked ? text = 'an icon of a locked lock' : text = 'an icon of an unlocked lock';

  return (
    <div className='color-column' style={{backgroundColor: `#${color}`}}>
      <img className='lock-icon' src={icon} alt={text} 
      onClick={() => dispatch({type:'TOGGLE LOCK', id})}/>
      <h2 className='color-h2'>#{color}</h2>
    </div>
  )
}

export default Color;