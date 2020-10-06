import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, updateBlog, deleteBlog }) => {
    

    const blogListStyle = {
        margin: `50px 0 0 0`
    }

    return (
        <div style={blogListStyle}>
            <h2 id="all-blogs">Blogs</h2>
            {(blogs.sort((a,b) => b.likes - a.likes)).map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
            )}
        </div>
    )
}

export default BlogList