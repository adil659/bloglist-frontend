

const reducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.message
        case 'REMOVE_NOTIFICATION':
            return ''

    }
    return state
}

export const setNotification = (message) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {
                message
            }
        })

        setTimeout(() => {
            dispatch(removeNotification())
        }, 2000);
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}


export default reducer