import userService from '../services/users'

const initialState = {
    users: [],
    user: null
}

const reducer = (state=initialState, action) => {

    switch(action.type) {
        case 'INIT_USERS':
            const newState = {
                ...state,
                users: action.data.users
            }
            return newState
    }
    return state
}

export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: {
                users
            }
        })
    }
}

export default reducer