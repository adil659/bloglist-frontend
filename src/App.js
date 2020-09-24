import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })


      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
      setErrorMessage(`Successfully logged into: ${user.name} `)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      const addedBlog = await blogService.create(blog)

      setBlogs(blogs.concat(addedBlog))
      setErrorMessage('Successfully added blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')

    } catch (exception) {
      setErrorMessage('Could not add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = async (event) => { 
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setBlogs([])
      setUser(null)
      setErrorMessage('Successfully logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could not logout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
            <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
            <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      title:
      <input
        value={newBlogTitle}
        onChange={({ target }) => setNewBlogTitle(target.value)}
      />

      author:
      <input
        value={newBlogAuthor}
        onChange={({ target }) => setNewBlogAuthor(target.value)}
      />

      url:
      <input
        value={newBlogUrl}
        onChange={({ target }) => setNewBlogUrl(target.value)}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>

      <Notification message={errorMessage} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout </button>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App