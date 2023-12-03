import * as storiesAPI from './stories-api'

export const getStories = async () => {
  try {
    const data = await storiesAPI.index()
    return data
  } catch (e) {
    console.log(e)
    return e
  }
}
