import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockUpdateHandler = jest.fn()
  let mockDeleteHandler = jest.fn()

  beforeEach(() => {

    const blog = {
        title: "Harry Potter",
        author: "JK Rowling",
        url: "www.harrypotter.com",
        likes: "55"
    }

    component = render(
      <Blog blog={blog} updateBlog={mockUpdateHandler} deleteBlog={mockDeleteHandler}/>
    )

    component.debug()
  })

  test('renders its children', () => {
    expect(component.container).toHaveTextContent('Harry Potter')
    expect(component.container).toHaveTextContent('JK Rowling')

    expect(component.container).not.toHaveTextContent('www.harrypotter.com')
    expect(component.container).not.toHaveTextContent('55')


  })

  test('display url and likes after button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    
    expect(component.container).toHaveTextContent('www.harrypotter.com')
    expect(component.container).toHaveTextContent('55')
  })

  test('like button is pressed twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)


    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })

})