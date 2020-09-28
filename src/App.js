import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef(null)


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
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log("userr", user)


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

  const addBlog = async (blogObject) => {

    try {
      const addedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(addedBlog))
      setErrorMessage('Successfully added blog')
      setTimeout(() => {
        setErrorMessage(null)
        blogFormRef.current.toggleVisibility()
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could not add blog')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {

    try {
      const addedBlog = await blogService.update(id, blogObject)

      setErrorMessage('Successfully updated blog')
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could not update blog')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {

    try {
      const deletedBlog = await blogService.deleteBlog(id)

      //const newBlogs = blogs.filter((blog) => blog.id != deletedBlog.id)
      setErrorMessage('Successfully deleted blog')
      //setBlogs(newBlogs)
      const updatedBlogs = await blogService.getAll()
      setBlogs(updatedBlogs)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Could not update blog')
      console.log(exception)
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


  return (
    <div>

      <Notification message={errorMessage} />

      {user === null ?
        <Togglable buttonLabel="login" toggle={true}>
          <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        </Togglable>
        :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={logout}>logout </button>
          <Togglable buttonLabel="new blog" ref={blogFormRef} toggle={true}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      }

      <h2 id="all-blogs">blogs</h2>
      {(blogs.sort((a,b) => b.likes - a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App