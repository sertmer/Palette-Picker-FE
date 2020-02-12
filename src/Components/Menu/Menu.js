import React, { useEffect, useState } from 'react';
import { useStore } from '../App/App.js';
import { getFolders, postFolder, postPalette } from '../../apiCalls/apiCalls'
import './Menu.scss';
import { Link } from 'react-router-dom';
import shuffle from '../../Images/001-random.svg';
import heart from '../../Images/002-heart.svg';
import folderIcon from '../../Images/003-folder.svg';


export const Menu = () => {
  const [ newFolder, setNewFolder ] = useState({})
  const [ folder, setFolder ] = useState({});
  const [ folders, setFolders ] = useState([]);
  const [ paletteName, setPaletteName ] = useState('');
  const [ error, setError ] = useState('')
  const [ paletteSuccess, setPaletteSuccess ] = useState('')
  const [ folderSuccess, setFolderSuccess ] = useState('')
  const { state, dispatch } = useStore();

  let evaluateInput = (e) => {
    if (e.target.name === 'choose_folder' && e.target.value === 'choose existing folder') {
      setError('select a folder')
    }
    if (e.target.name === 'heart' && !paletteName) {
      setError('enter a palette name')
    }
    if (e.target.name === 'create_folder' && !newFolder.folder_name) {
      setError('enter a folder name')
    }
    if (e.target.name === 'create_folder' && newFolder.folder_name) {
      handleFolderPost()
    }
    if (e.target.name === 'heart' && !folder.folder_name) {
      setError('select a folder')
    }
    if (e.target.name === 'heart' && paletteName && folder.folder_name) {
      handlePalettePost()
    }
  }

  let handlePalettePost = () => {
    let folderName = folder.folder_name
    let matchingFolder = folders.find(folder => folder.folder_name === folderName)
  
    let palette = {
      paletteName: paletteName,
      colors: [
        `#${state.defaultColors[0].color}`,
        `#${state.defaultColors[1].color}`,
        `#${state.defaultColors[2].color}`,
        `#${state.defaultColors[3].color}`,
        `#${state.defaultColors[4].color}`
      ]
    }

    postPalette(palette, matchingFolder.id)
      .then(res => setPaletteSuccess('saved!'))
      .catch(err => console.log(err))
    setError('')
    setPaletteName('')
  }

  let handleFolderPost = () => {
    postFolder(newFolder)
      .then(res => {
        let postedFolder = {
          folder_name: newFolder.folder_name,
          id: res.id
        }

        setFolders([...folders, postedFolder])
      })
      .then(res => setFolderSuccess('created!'))
      .catch(err => console.log(err))
    setError('')
    setNewFolder({folder_name: ''})
  }
  
  let handleChange = (e) => {
    if (e.target.name === 'choose_folder') {
      setFolder({ folder_name: e.target.value })
    } if (e.target.name === 'create_folder_input') {
      setNewFolder({ folder_name: e.target.value }) 
    } if (e.target.name === 'name_palette') {
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
      <input type='text' name='create_folder_input' value={newFolder.folder_name} onChange={(e) => handleChange(e)} placeholder='Create New Folder'></input>
      {error === 'enter a folder name' && 
        <p>{error}</p>
      }
      <button type='button' name='create_folder' onClick={(e) => evaluateInput(e)}>Create New Folder</button>
      {folderSuccess && 
        <p>{folderSuccess}</p>
      }
      <p>Save Palette</p>
      <select name='choose_folder' onChange={(e) => handleChange(e)}>
        <option>choose existing folder</option>
        {selectOptions}
      </select>
      <input type='text' name='name_palette' value={paletteName} placeholder='Name This Palette' onChange={(e) => handleChange(e)}></input>
      { error === 'select a folder' && 
        <p>{error}</p>
      }
      { error === 'enter a palette name' && 
        <p>{error}</p>
      }
      <img className='icon' name='heart' src={heart} alt='icon of a heart' onClick={(e) => evaluateInput(e)}></img>
      { paletteSuccess && 
        <p>{paletteSuccess}</p>
      }
      <img  className='icon' name='shuffle' src={shuffle} alt='shuffle icon' onClick={() => dispatch({type: 'GENERATE COLORS', payload: state})}></img>
    </nav>
  )
}

export default Menu;