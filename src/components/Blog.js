import React, { useState } from 'react'
import {
   Link
} from "react-router-dom"

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [details, setDetails] = useState(false)

  const blogStyle = {
    border: '1px solid',
    padding: `20px 40px`,
    backgroundColor: 'aliceblue'
  }

  const likeOnChange = (event) => {
    const blogId = event.target.value

    console.log("the blog object looks like this: ", blog)
    const newBlogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }

    updateBlog(blogId, newBlogObject)

  }

  const deleteBlogOnChange = (event) => {
    deleteBlog(event.target.value)
  }

  const viewOnClick = () => {
    setDetails(!details)
  }

  const detailsView = () => (
    <div>
      
      {blog.url}
      <br></br>
      <span id="likes">{blog.likes}</span> <button value={blog.id} onClick={likeOnChange}>like</button>
      <br></br>
      {blog.author}
      <br></br>
      <button value={blog.id} onClick={deleteBlogOnChange}>delete</button>

    </div>
  )


  return (
  <div className="blog" style={blogStyle}>
    <Link to={`/blogs/${blog.id}`}>
    <span id="title">{blog.title}</span> <span id="author">{blog.author}</span> 
    </Link>
    {
      details ? detailsView() : false 
    }
  </div>
  )

}

export default Blog
