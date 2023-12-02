import { Routes, Route } from "react-router-dom";
import StoryIndex from "../pages/story/StoryIndex";
import StoryShow from "../pages/story/StoryShow";


const Main = () => {
  return (
    <main>
      <Routes>
        <Route path='/stories' element={<StoryIndex />} />
        <Route path='stories/:id' element={<StoryShow />} />
      </Routes>
    </main>
  );
};

export default Main;
