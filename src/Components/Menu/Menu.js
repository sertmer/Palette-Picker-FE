import React, { useEffect } from 'react';
import { useStore } from '../App/App.js';
import './Menu.scss';
import { Link } from 'react-router-dom';
import shuffle from '../../Images/001-random.svg';
import heart from '../../Images/002-heart.svg'
import folder from '../../Images/003-folder.svg'

export const Menu = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    
  })

  return (
    <nav className='vertical-menu menu'>
      <Link to={'/folders'}>
        <img className='icon' src={folder} alt='icon of a folder'></img>
      </Link>
      <input type='text' placeholder='Create New Folder'></input>
      <p>or</p>
      <select>
        <option>project one</option>
      </select>
      <input type='text' placeholder='Name This Palette'></input>
      <img className='icon' src={heart} alt='icon of a heart'></img>
      <img  className='icon' src={shuffle} alt='shuffle icon' onClick={() => dispatch({type: 'GENERATE COLORS', payload: state})}></img>
    </nav>
  )
}

export default Menu;