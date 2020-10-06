import React from 'react'
import {
    // ...
    useParams,
    useHistory
  } from "react-router-dom"

const UserBlogs = ({ users }) => {
    const id = useParams().id
    const user = users.find(user => user.id === id)
    console.log("blogs in users: ", user.blogs)
    return (
        <div>
            <h1>{user.name}</h1>
            <h4>added blogs</h4>

            <ul>
                {
                    user.blogs.map((blog) => 
                    <li key={blog.id}>
                        {blog.title}
                    </li>)
                }
            </ul>

        </div>
    )   
}

export default UserBlogs