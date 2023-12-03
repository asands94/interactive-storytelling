import { Routes, Route } from 'react-router-dom'
import StoryIndex from '../pages/story/StoryIndex'
import StoryShow from '../pages/story/StoryShow'
import StoryNew from '../pages/story/StoryNew'
import StoryEdit from '../pages/story/StoryEdit'
import OAuthCallback from './Auth/OAuthCallback'

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/auth/google' element={<OAuthCallback />} />
        <Route path='/stories' element={<StoryIndex />} />
        <Route path='/stories/:id' element={<StoryShow />} />
        <Route path='/stories/new' element={<StoryNew />} />
        <Route path='/stories/:id/edit' element={<StoryEdit />} />
      </Routes>
    </main>
  )
}

export default Main
