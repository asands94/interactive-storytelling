import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import TinyMCE from './TinyMCE'
import { createStory } from '../../services/story'

const StoryForm = () => {
  const { user } = useAuth0()
  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    warning: '',
    rating: '',
    thumbnail: '',
    author: user?.name,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleEditorChange = (content, editor) => {
    setForm((prevForm) => ({ ...prevForm, content }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const storyData = await createStory(form)
    setForm({
      ...form,
      title: '',
      content: '',
      summary: '',
      warning: '',
      rating: '',
      thumbnail: '',
    })
  }

  const warningOptions = ['Violence', 'Trauma', 'Drug Use']

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className='story-form'
        encType='multipart/form-data'
      >
        <label htmlFor='new-rating'>
          <h4>Rating</h4>
        </label>
        <select
          id='new-rating'
          name='rating'
          defaultValue='default'
          onChange={handleChange}
        >
          <option disabled value='default'>
            -- SELECT RATING --
          </option>
          <option value='General'>General</option>
          <option value='Teen'>Teen</option>
          <option value='Mature'>Mature</option>
          <option value='Explicit'>Explicit</option>
        </select>

        <label htmlFor='new-warning'>
          <h4>Warning</h4>
        </label>
        {warningOptions.map((warning) => (
          <label key={warning} htmlFor={`new-${warning}`}>
            <input
              id={`new-${warning}`}
              type='checkbox'
              name='warning'
              value={warning}
              onChange={handleChange}
            />
            {warning}
          </label>
        ))}

        <label htmlFor='new-cloudinary-image'>
          Image Upload
          <input id='new-cloudinary-image' type='file' name='imageUpload' />
        </label>
        <label htmlFor='new-cloudinary-description'>
          Image Description
          <input
            id='new-cloudinary-description'
            type='text'
            name='description'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='new-cloudinary-alt'>
          Image Alt Text
          <input
            id='new-cloudinary-alt'
            type='text'
            onChange={handleChange}
            name='alt'
          />
        </label>

        <label htmlFor='new-summary'>
          <h4>Summary</h4>
        </label>
        <textarea
          id='new-summary'
          name='summary'
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor='new-title'>
          <h4>Title</h4>
        </label>
        <input
          id='new-title'
          type='text'
          name='title'
          onChange={handleChange}
          required
        />

        <TinyMCE handleChange={handleEditorChange} />

        <button type='submit'>Add Story</button>
      </form>
    </>
  )
}
export default StoryForm
