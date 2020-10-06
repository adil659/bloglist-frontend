import React from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import LoginForm from './LoginForm'


    const LoggedIn = ({ user, blogFormRef, logout, addBlog }) => {
      const buttonStyle = {
        margin: `0 0 20px 40px`
      }
      const loginStyle = {
        display: 'inline-block'
      }

       return (

        <div>
          <span>
            <h4 style={loginStyle}>{user.name} logged-in</h4>
          <button style={buttonStyle} onClick={logout}>logout </button>
          </span>
          <Togglable buttonLabel="new blog" ref={blogFormRef} toggle={false}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
            </div>
       )
    }

    const Login = ({ username, setUsername, password, setPassword, handleLogin }) => (
        <div>
             <Togglable buttonLabel="login" toggle={true}>
          <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
        </Togglable>
            </div>
    )

const LoginView = ({user, username, setUsername, password, setPassword, handleLogin, blogFormRef, logout, addBlog}) => {

    return (
        <div>
            {user === null ?
       <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />
       :
       <LoggedIn blogFormRef={blogFormRef} user={user} logout={logout} addBlog={addBlog}/>
     }
        </div>
    )
}

export default LoginView