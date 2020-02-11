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
        throw Error('Failed fetching folders')
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