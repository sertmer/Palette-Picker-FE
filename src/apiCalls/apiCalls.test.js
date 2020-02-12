
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

    it('should throw an error if fetch fails', () => {
      window.fetch = jest.fn().mockImplementation(()=> {
        return Promise.resolve({
          ok: false
        })
      })

      expect(getFolders()).rejects.toEqual(Error('Failed fetching folders'))
    })

    it('should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      })

      expect(getFolders()).rejects.toEqual(Error('fetch failed'))
    })
  })

  describe('getPalettes', () => {
    let mockResponse = [
       { id: 1,
        palette_name: 'colors to make robbie blush', 
        color_one: '#80adaa',
        color_two: '#d9c9fb',
        color_three: '#9c5f3d',
        color_four: '#4ba9b3',
        color_five: '#a6617c',
        folder_id: 1 
      },
      { id: 2,
        palette_name: 'colors to defeat trump', 
        color_one: '#blue',
        color_two: '#brown',
        color_three: '#green',
        color_four: '#ffffff',
        color_five: '#11111',
        folder_id: 2 
      },
      { id: 3,
        palette_name: 'colors to grant yr wishes', 
        color_one: '#blue',
        color_two: '#brown',
        color_three: '#green',
        color_four: '#ffffff',
        color_five: '#11111',
        folder_id: 3 
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
      const mockFolderId = undefined
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/folders/${mockFolderId}/palettes`;
      getPalettes()
      expect(window.fetch).toHaveBeenCalledWith(url)
    })

    it('should return an array of folders', () => {
      expect(getPalettes()).resolves.toEqual(mockResponse)
    })

    it('should throw an error if fetch fails', () => {
      window.fetch = jest.fn().mockImplementation(()=> {
        return Promise.resolve({
          ok: false
        })
      })

      expect(getPalettes()).rejects.toEqual(Error('Failed fetching palettes'))
    })

    it('should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      })

      expect(getPalettes()).rejects.toEqual(Error('fetch failed'))
    })
  })

  describe('postFolder', () => {
    let mockResponse, mockFolder, mockOptions
    beforeEach(() => {
      mockResponse = {id: 1}
      mockFolder = {
        folder_name: 'Colors out of Space'
      }
      mockOptions = {
        method: 'POST',
        body: JSON.stringify(mockFolder),
        headers: {
          'Content-Type': 'application/json'  
        }
      }
  
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => {
            return Promise.resolve(mockResponse)
          }
        })
      })
    })
    it('should call fetch with the right url', () => {
      let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/`
      postFolder(mockFolder)
      expect(window.fetch).toHaveBeenCalledWith(url, mockOptions)
    })

    it('return an id', () => {
      expect(postFolder(mockFolder)).resolves.toEqual(mockResponse)
    })

    it('should throw an error if fetch fails', () => {
      window.fetch = jest.fn().mockImplementation(()=> {
        return Promise.resolve({
          ok: false
        })
      })

      expect(postFolder(mockFolder)).rejects.toEqual(Error('Error posting folder'))
    })

    it('should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      })

      expect(postFolder(mockFolder)).rejects.toEqual(Error('fetch failed'))
    })
  })

  describe('postPalette', () => {
    let mockResponse, mockPalette, mockOptions, mockFolderId
    beforeEach(() => {
      mockResponse = { id: 2,
        palette_name: 'colors to defeat trump', 
        color_one: '#blue',
        color_two: '#brown',
        color_three: '#green',
        color_four: '#ffffff',
        color_five: '#11111',
        folder_id: 2 
      }
      mockPalette = { id: 2,
        palette_name: 'colors to defeat trump', 
        color_one: '#blue',
        color_two: '#brown',
        color_three: '#green',
        color_four: '#ffffff',
        color_five: '#11111',
        folder_id: 2 
      }
      mockOptions = {
        method: 'POST',
        body: JSON.stringify(mockPalette),
        headers: {
          'Content-Type': 'application/json'  
        }
      }
      mockFolderId = 1
  
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          ok: true,
          json: () => {
            return Promise.resolve(mockResponse)
          }
        })
      })
    })
    it('should call fetch with the right url', () => {
      let url = process.env.REACT_APP_BACKEND_URL + `/api/v1/folders/${mockFolderId}/palettes`
      postPalette(mockPalette, mockFolderId)
      expect(window.fetch).toHaveBeenCalledWith(url, mockOptions)
    })

    it('return an id', () => {
      expect(postPalette(mockPalette, mockFolderId)).resolves.toEqual(mockResponse)
    })

    it('should throw an error if fetch fails', () => {
      window.fetch = jest.fn().mockImplementation(()=> {
        return Promise.resolve({
          ok: false
        })
      })

      expect(postPalette(mockPalette, mockFolderId)).rejects.toEqual(Error('Error posting folder'))
    })

    it('should return an error if promise rejects', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(Error('fetch failed'))
      })

      expect(postPalette(mockPalette, mockFolderId)).rejects.toEqual(Error('fetch failed'))
    })
  })
})