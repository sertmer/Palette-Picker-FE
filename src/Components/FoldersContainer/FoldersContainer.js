import React, { useState, useEffect } from 'react';
import { getFolders } from '../../apiCalls/apiCalls';
import folderIcon from '../../Images/003-folder.svg';
import './FoldersContainer.scss';

const FoldersContainer = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    getFolders()
      .then(data => {
        setFolders(data)
      })
      .catch(error => console.error(`Something went wrong ${error}`))
  }, []);

  let foldersArray = folders.map(folder => {
      return (
      <div className="folder-div">
        <img src={folderIcon} alt='icon of a folder' key={folder.id} 
        className='icon' id={folder.id} />
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