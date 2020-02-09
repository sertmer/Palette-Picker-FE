import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFolders } from '../../apiCalls/apiCalls';
import folderIcon from '../../Images/003-folder.svg';
import './FoldersContainer.scss';

const FoldersContainer = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getFolders()
      .then(data => setFolders(data))
      .catch(error => console.error(`Something went wrong ${error}`))
  }, []);

  let foldersArray = folders.map(folder => {
      return (
      <div className="folder-div" key={folder.id}>
        <Link to={`/folders/${folder.id}/palettes`} className='folder-link'>
          <img src={folderIcon} alt='icon of a folder' 
          className='icon' id={folder.id} />
        </Link>
        <h2 className="folder-name-h2">{folder.folder_name}</h2>
      </div>
      )
    })
  
  return (
    <div className="folders-container-div">
      {foldersArray}
    </div>
  )
}

export default FoldersContainer;