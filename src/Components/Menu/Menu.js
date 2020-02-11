import React, { useEffect, useState } from 'react';
import { useStore } from '../App/App.js';
import { getFolders, postFolder } from '../../apiCalls/apiCalls'
import './Menu.scss';
import { Link } from 'react-router-dom';
import shuffle from '../../Images/001-random.svg';
import heart from '../../Images/002-heart.svg'
import folderIcon from '../../Images/003-folder.svg'

export const Menu = () => {
  const [ folder, setFolder ] = useState({});
  const [ folders, setFolders ] = useState([]);
  const [ paletteName, setPaletteName ] = useState('');
  const { state, dispatch } = useStore();

  let handlePalettePost = () => {
    let folderName = folder.folder_name
    let matchingFolder = folders.find(folder => folder.folder_name === folderName)
    let palette = {
      folder_id: matchingFolder.id,
      palette_name: paletteName,
      color_one: state[0].color,
      color_two: state[1].color,
      color_three: state[2].color,
      color_four: state[3].color,
      color_five: state[4].color,
    }

    // conditional for no folder
  }

  let handleFolderPost = () => {
    postFolder(folder)
      .then(res => {
        let postedFolder = {
          folder_name: folder.folder_name,
          id: res.id
        }

        setFolders([...folders, postedFolder])
      })
      .catch(err => console.log(err))
  }
  
  let handleChange = (e) => {
    if (e.target.name === 'folder_name' && e.target.value !== 'choose existing folder'){
      setFolder({ [e.target.name]: e.target.value })
    } else {
      setPaletteName(e.target.value)
    }
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
      <button type='button' onClick={() => handleFolderPost()}>Create New Folder</button>
      <p>Save Palette</p>
      <select name='folder_name' onChange={(e) => handleChange(e)}>
        <option>choose existing folder</option>
        {selectOptions}
      </select>
      { folder.folder_name &&
        <input type='text' placeholder='Name This Palette' onChange={(e) => handleChange(e)}></input>
      }
      { paletteName &&
        <img className='icon' src={heart} alt='icon of a heart' onClick={() => handlePalettePost()}></img>
      }
      <img  className='icon' src={shuffle} alt='shuffle icon' onClick={() => dispatch({type: 'GENERATE COLORS', payload: state})}></img>
    </nav>
  )
}

export default Menu;


// conditional render to select pal
//--- folder is chosen 
//--- palette name input appears
//--- heart appears