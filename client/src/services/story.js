import api from './apiConfig'

export const getStories = async () => {
  try {
    const res = await api.get('/stories')
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const getStory = async (id) => {
  try {
    const res = await api.get(`/stories/${id}`)
    return res.data
  } catch (e) {
    throw e
  }
}

export const createStory = async (input) => {
  try {
    const res = await api.post('/stories', input)
    return res.data
  } catch (e) {
    console.log(e)
    throw e
  }
}
