
import { getFolders, getPalettes, postFolder, patchPalette, postPalette }from './apiCalls';

describe('apiCalls', () => {

  describe('getFolders', () => {
    let mockResponse = [
      {
        id: 1,
        folder_name: 'colors to win 2020',
      },
      {
        id: 2,
        folder_name: 'colors of the old gods',
      },{
        id: 3,
        folder_name: 'kanye test folder',
      }
    ]
    
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse)
        })
      })

    })

    it('should call fetch with the correct url', () => {
      let url = process.env.REACT_APP_BACKEND_URL + '/api/v1/folders'
      getFolders()
      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should return an array of folders', () => {
      expect(getFolders()).resolves.toEqual(mockResponse)
    })
  })
})