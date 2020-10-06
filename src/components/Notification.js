import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
    const notificationMessage = useSelector(state => state.notification)
    
    return (
        <div>
            <h2>{notificationMessage}</h2>
        </div>
    )
}

export default Notification
