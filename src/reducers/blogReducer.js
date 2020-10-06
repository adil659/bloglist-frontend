import blogService from '../services/blogs'

const reducer = (state = [], action) => {

    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data.blogs
        case 'CREATE_BLOG':
            return state.concat(action.data.blog)
        case 'UPDATE_BLOG':
            console.log("updating blog: ", action.data.updatedBlog)
            const newState = state.map((blog) => action.data.id !== blog.id ? blog : action.data.updatedBlog)
            console.log(newState)
            return newState
        case 'DELETE_BLOG':
            const newStateDelete = state.filter((blog) => blog.id !== action.data.deletedBlog.id)
            console.log("blog deleted: ", newStateDelete)
            return newStateDelete
        case 'ADD_COMMENT':
            const blogComment = state.find((blog) => blog.id === action.data.blogId)
            const commentObject = {
                comment: action.data.addedComment.comment,
                id: action.data.addedComment.id
            }
            blogComment.comments = [...blogComment.comments, commentObject]
            const newStateComment = state.map((blog) => action.data.blogId !== blog.id ? blog : blogComment)
            return newStateComment
        case 'LOGOUT':
            console.log('logging out reducer')
            return []
    }
    return state
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: {
                blogs
            }
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const addedBlog = await blogService.create(blog)
        dispatch({
            type: 'CREATE_BLOG',
            data: {
                blog: addedBlog
            }
        })
    }
}

export const likeBlog = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blogObject)
        console.log("updating blog: ", updatedBlog)
        dispatch({
            type: 'UPDATE_BLOG',
            data: {
                id,
                updatedBlog
            }
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        const deletedBlog = await blogService.deleteBlog(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: {
                deletedBlog
            }
        })
    }
}

export const addCommentReq = (blogId, commentObject) => {
    return async dispatch => {
        const addedComment = await blogService.addComment(blogId, commentObject)
        dispatch({
            type: 'ADD_COMMENT',
            data: {
                addedComment,
                blogId
            }
        })
    }
}

export const logoutBlog = () => {
    return {
        type: 'LOGOUT'
    }
}

export default reducer