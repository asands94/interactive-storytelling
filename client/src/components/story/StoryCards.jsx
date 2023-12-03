import { useState, useEffect } from 'react'
import { getStories } from '../../services/story'

const StoryCards = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [stories, setStories] = useState([])

  const handleRequest = async () => {
    try {
      const storiesData = await getStories()
      if (storiesData.length) {
        setStories(storiesData)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        throw Error(storiesData)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    handleRequest()
  }, [])

  const loaded = () => {
    return stories?.map((story) => {
      return (
        <section key={story._id} className='users-stories'>
          <div className='stories-top'>
            <div>
              <a href={`/stories/${story._id}`}>{story.title}</a> by{' '}
              {story.author?.username}
            </div>
            <p>
              {new Date(story.createdAt).toDateString('en-us', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
              })}
            </p>
          </div>

          <p>{story.summary}</p>
          <div className='admin'>
            <div className='buttons'>
              {/* {user &&
                user._id.toString() ===
                  story.author._id.toString()(
                    <> */}
              <a href={`/stories/${story._id}/edit`}>Edit</a>{' '}
              <a href={`/${story._id}/poll`}>Add Poll</a>
              {/* </>
                  )} */}
            </div>
            <p>Comments: {story.comments.length}</p>
          </div>
        </section>
      )
    })
  }

  const loading = () => {
    ;<section className='users-stories'>
      <h1>Loading...</h1>
    </section>
  }

  return <>{isLoading ? loading() : loaded()}</>
}

export default StoryCards
