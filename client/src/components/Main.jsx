import { Routes, Route } from 'react-router-dom'
import StoryIndex from '../pages/story/StoryIndex'
import StoryShow from '../pages/story/StoryShow'
import StoryNew from '../pages/story/StoryNew'
import StoryEdit from '../pages/story/StoryEdit'
import Profile from '../pages/profile/Profile'

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/stories' element={<StoryIndex />} />
        <Route path='/stories/:id' element={<StoryShow />} />
        <Route path='/stories/new' element={<StoryNew />} />
        <Route path='/stories/:id/edit' element={<StoryEdit />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </main>
  )
}

export default Main
