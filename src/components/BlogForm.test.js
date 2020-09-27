import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  let mockCreateHandler = jest.fn()
  
  beforeEach(() => {


    component = render(
      <BlogForm createBlog={mockCreateHandler}/>
    )

    component.debug()
  })

  test('form input', () => {
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')

  
    fireEvent.change(inputTitle, { 
      target: { value: 'Harry Potter' } 
    })
    fireEvent.change(inputAuthor, { 
        target: { value: 'JK Rowling' } 
    })
      fireEvent.change(inputUrl, { 
        target: { value: 'www.harrypotter.com' } 
    })
    fireEvent.submit(form)

    expect(mockCreateHandler.mock.calls).toHaveLength(1)
    expect(mockCreateHandler.mock.calls[0][0].title).toBe('Harry Potter' )
    expect(mockCreateHandler.mock.calls[0][0].author).toBe('JK Rowling' )
    expect(mockCreateHandler.mock.calls[0][0].url).toBe('www.harrypotter.com' )
    
  })


})