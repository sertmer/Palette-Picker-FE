export const getFolders = () => {
  let url = process.env.REACT_APP_BACKEND_URL + '/api/v1/folders'

  return fetch(url)
    .then(res => {
      if(!res.ok) {
        throw Error('Failed fetching folders')
      }
      return res.json()})
}

export const getPalettes = (id) => {
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${id}/palettes`
  return fetch(url)
    .then(res => {
      if(!res.ok) {
        throw Error('Failed fetching palettes')
      }
      return res.json()})
}

export const postFolder = (folder) => {
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/`
  const options = {
    method: 'POST',
    body: JSON.stringify(folder),
    headers: {
      'Content-Type': 'application/json'  
    }
  }

  return fetch(url, options)
    .then(res => {
      if (!res.ok){
        throw Error('Error posting folder')
      }
      return res.json()
    })
}

export const patchPalette = (palette, name, id, folderId) => {
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${folderId}/palettes/${id}`
  const body = {
    palette_name: name,
    color_one: palette[0].color,
    color_two: palette[1].color,
    color_three: palette[2].color,
    color_four: palette[3].color,
    color_five: palette[4].color,
    folder_id: folderId
  }

  const options = {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  }
  
   return fetch(url, options)
    .then(res => {
      if (!res.ok){
        throw Error('Error updating palette')
      }
     return res.json()
   })
}

export const postPalette = (palette, folder_id) => {
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${folder_id}/palettes`
  
  const options = {
    method: 'POST',
    body: JSON.stringify(palette),
    headers: {
      'Content-Type': 'application/json'  
    }
  }

  return fetch(url, options)
    .then(res => {
      if (!res.ok){
        throw Error('Error posting palette')
      }
      return res.json()
    })
}

export const deletePalette = (id) => {
  let folderId = parseInt(window.location.pathname.split('/')[2])
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${folderId}/palettes/${id}`

  const options = {
    method: 'DELETE',
  }

  return fetch(url, options)
    .then(res => {
      if (!res.ok){
        throw Error('Error deleting palette')
      }
      return res.json()
    })
}

export const deleteFolder = () => {
  let folderId = parseInt(window.location.pathname.split('/')[2])
  let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${folderId}`

  const options = {
    method: 'DELETE',
    body: '',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(url, options)
    .then(res => {
      if (!res.ok){
        throw Error('Error posting palette')
      }
      return res.text
    })
}