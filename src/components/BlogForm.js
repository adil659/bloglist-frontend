import React, { useState } from 'react'


const BlogForm = (props) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const blog = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }

        props.createBlog(blog)
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                title:
      <input
                    id="title"
                    value={newBlogTitle}
                    onChange={({ target }) => setNewBlogTitle(target.value)}
                />

      author:
      <input
                    id="author"
                    value={newBlogAuthor}
                    onChange={({ target }) => setNewBlogAuthor(target.value)}
                />

      url:
      <input
                    id="url"
                    value={newBlogUrl}
                    onChange={({ target }) => setNewBlogUrl(target.value)}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm