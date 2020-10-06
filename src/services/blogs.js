import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  console.log("getting all, token: ", token)
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  console.log("before GIVEM EM UPDATE: ", newObject)
  
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log("GIVE ME THE UPDATE: ", response.data)
  return response.data
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

const addComment = (blogId, commentObject) => {
  console.log("reached addComment request")
  const newObject = {
    commentObject,
    blogId
  }
  const request = axios.post(`${baseUrl}/${blogId}/comments`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update, setToken, deleteBlog, addComment }