import { useState } from 'react'
import Header from './components/header/Header'
import Main from './components/Main'
import { StoryContext } from './data/StoryContext'

function App() {
  const { Provider: StoryData, Consumer } = StoryContext
  const [state, setState] = useState({})

  return (
    <>
      <StoryData value={{ state, setState }}>
        <Header />
        <Main />
      </StoryData>
    </>
  )
}

export default App
