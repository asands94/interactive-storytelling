import { Routes, Route } from 'react-router-dom'
import StoryIndex from '../pages/story/StoryIndex'
import StoryShow from '../pages/story/StoryShow'
import StoryForm from './story/StoryForm'

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/:id' element={<StoryIndex />} />
        <Route path='/' element={<StoryForm />} />
        <Route path='stories/:id' element={<StoryShow />} />
      </Routes>
    </main>
  )
}

export default Main
