
import React from 'react'
import BlogList from './BlogList'
import UserList from './UserList'
import LoginView from './LoginView'
import BlogDetails from './BlogDetails'
import UserBlogs from './UserBlogs'


import {
    BrowserRouter as Router,
    Switch, Route, Link
  } from "react-router-dom"

const Menu = ({ blogs, updateBlog, deleteBlog, users, 
    user, username, setUsername, password, setPassword, handleLogin, blogFormRef, logout, addBlog, addComment}) => {
    const padding = {
      paddingRight: '15px'
    }

    const navStyle = {
      margin: `20px auto`,
      padding: '20px 0',
      backgroundColor: 'aliceblue',
      fontSize: '30px'
    }
  
  
  
    return (
      <Router>
        <div style={navStyle}>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
        </div>
        <LoginView username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}
      blogFormRef={blogFormRef} user={user} logout={logout} addBlog={addBlog}/>
        <Switch>
        <Route path="/blogs/:id">
          <BlogDetails blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} addComment={addComment}/>
          </Route>
          <Route path="/blogs">
          <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
          </Route>
          <Route path="/users/:id">
          <UserBlogs users={users}/>
          </Route>
          <Route path="/users">
          <UserList users={users}/>
          </Route>
          {/* <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route> */}
          {/* <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route> */}
        </Switch>
  
      </Router>
    )
  }

  export default Menu