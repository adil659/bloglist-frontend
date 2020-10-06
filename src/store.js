import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

//import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  users: userReducer,
  comments: commentReducer
  //filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store