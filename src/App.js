import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import LoginView from './components/LoginView'
import Menu from './components/Menu'

import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, removeBlog, logoutBlog, addCommentReq} from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
//import { addCommentReq } from './reducers/commentReducer'



const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users.users)
  


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    dispatch(initUsers())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
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
      dispatch(initBlogs())
      dispatch(setNotification(`Successfully logged into: ${user.name}`))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('Wrong credentials'))
    }
  }

  const addBlog = async (blogObject) => {

    try {
      dispatch(createBlog(blogObject))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`Successfully added blog`))
      setTimeout(() => {
        blogFormRef.current.toggleVisibility()
      }, 2000)
    } catch (exception) {
      dispatch(setNotification(`Could not add blog`))
    }
  }

  const updateBlog = async (id, blogObject) => {

    try {
      dispatch(likeBlog(id, blogObject))
      dispatch(setNotification(`Successfully updated blog`))
      
    } catch (exception) {
      dispatch(setNotification(`Could not update blog`))
    }
  }

  const deleteBlog = async (id) => {

    try {
      dispatch(removeBlog(id))
      dispatch(setNotification(`Successfully deleted blog`))
    } catch (exception) {
      dispatch(setNotification(`Could not delete blog`))
    }
  }

  const addComment = async (blogId, commentObject) => {

    try {
      dispatch(addCommentReq(blogId, commentObject))
    } catch (exception) {
      console.log('couldnt add comment: ', exception)
    }
  }

  const logout = async (event) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      dispatch(logoutBlog())
      dispatch(setNotification(`Successfully logged out`))
    } catch (exception) {
      dispatch(setNotification(`Could not logout`))
    }
  }

  const wholepageStyle = {
    minHeight: '100vh',
    height: '100%'
  }


  return (
    <div className="container" style={wholepageStyle} >

      <Notification/>

      <Menu blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} users={users}
      username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}
      blogFormRef={blogFormRef} user={user} logout={logout} addBlog={addBlog} addComment={addComment}/>
      

      {/* <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>

      <UserList users={users}/> */}

    </div>
  )
}

export default App