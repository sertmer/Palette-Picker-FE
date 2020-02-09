import React, { useEffect, useState} from 'react';
import { useStore } from '../App/App.js';
import { getFolders } from '../../apiCalls/apiCalls'
import './Menu.scss';
import { Link } from 'react-router-dom';
import shuffle from '../../Images/001-random.svg';
import heart from '../../Images/002-heart.svg'
import folderIcon from '../../Images/003-folder.svg'

export const Menu = () => {
  const [ folder, setFolder ] = useState({});
  const [ folders, setFolders ] = useState([]);
  const { state, dispatch } = useStore();

  let handleClick = () => {
    // call post folder from apiCalls
  }
  
  let handleChange = (e) => {
    setFolder({ [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getFolders()
      .then(data => {
        setFolders(data)
      })
      .catch(error => console.error(`Something went wrong ${error}`))
  }, []);

  let selectOptions = folders.map(folder => {
    return (
      <option key={folder.id}>{folder.folder_name}</option>
    )})
    
  return (
    <nav className='vertical-menu menu'>
      <Link to={'/folders'}>
        <img className='icon' src={folderIcon} alt='icon of a folder'></img>
      </Link>
      <input type='text' name='folder_name' onChange={(e) => handleChange(e)} placeholder='Create New Folder'></input>
      <button type='button' onClick={() => handleClick()}>Create New Folder</button>
      <p>or</p>
      <select>
        {selectOptions}
      </select>
      <input type='text' placeholder='Name This Palette'></input>
      <img className='icon' src={heart} alt='icon of a heart'></img>
      <img  className='icon' src={shuffle} alt='shuffle icon' onClick={() => dispatch({type: 'GENERATE COLORS', payload: state})}></img>
    </nav>
  )
}

export default Menu;