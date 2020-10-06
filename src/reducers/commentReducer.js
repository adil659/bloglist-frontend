import blogService from '../services/blogs'


const reducer = (state=[] , action) => {
    
    switch (action.type) {
        case 'ADD_COMMENT':
            return state.concat(action.data.addedComment)
    }
    return state
}


export default reducer