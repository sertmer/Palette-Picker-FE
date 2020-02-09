export const getFolders = async () => {
  let url = window.location.href;
  url = url.split('/');

  if (url[2] === 'localhost:3000') {
    url[2] = 'localhost:3001'
  }
  url.splice(3, 0, 'api/v1');

  url = url.join('/');

  return fetch(url)
    .then(res => {
      if(!res.ok) {
        throw Error('Failed fetching folders')
      }
      return res.json()})
}