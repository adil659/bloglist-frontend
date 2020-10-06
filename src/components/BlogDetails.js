import React from 'react'
import {useField} from '../hooks/index'
import {
    // ...
    useParams,
    useHistory
  } from "react-router-dom"

const BlogDetails = ({ blogs, updateBlog, deleteBlog, addComment }) => {
    const id = useParams().id
    const history = useHistory()
    const commentField = useField('text')

    console.log("individual blog: ", blogs)

    const blog = blogs.find(blog => blog.id === id)

    const likeOnChange = (event) => {
        const blogId = event.target.value
        const blog = blogs.find(blog => blog.id === blogId)
        blog.likes+=1
        console.log("onLike: ", blog)
        // const newBlog = {
        //     ...blog,
        //     likes: blog.likes++
        // }
        console.log("the blog object looks like this: ", blog)
        const newBlogObject = {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes+1,
          user: blog.user
        }
        updateBlog(blog.id, blog)
      }

      const deleteBlogOnChange = (event) => {
        deleteBlog(event.target.value)
        history.push('/blogs')
      }

      const createComment = (event) => {
        event.preventDefault()
        const commentObject = {
            comment: commentField.value
        }

        addComment(blog.id, commentObject)
      }

    return (
        <div>
            <h1>{blog.title}</h1>
            <a href={blog.url}>{blog.url}</a>
            <br></br>
            <span id="likes">{blog.likes}</span> <button value={blog.id} onClick={likeOnChange}>like</button>
            <br></br>
            added by {blog.author}
            <br></br>
            <button value={blog.id} onClick={deleteBlogOnChange}>delete</button>

            <h3>comments</h3>
            <form onSubmit={createComment}>
                <input {...commentField}/>
                <button type="submit">submit</button>
            </form>

            <ul>
                {console.log("blog comment id: ", blog.comments)}
                {
                    
                    blog.comments.map((comment, i) => 
                    <li key={i}>
                        {comment.comment}
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default BlogDetails