import React from 'react'
import {
  Link
} from "react-router-dom"

import Table from 'react-bootstrap/Table';

const UserList = ({ users }) =>{

    const tableStyle = {
      backgroundColor: 'lightblue'
    }

    return (
        <div className="container">
            <h2> Users</h2>      
        <Table striped style={tableStyle}>
          <thead>

          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          </thead>
          <tbody>
          {(users.map(user => 
        <tr key={user.id}>
          <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
          <td>{user.blogs.length}</td>
        </tr> 
      )
      )}
      </tbody>
        </Table>
    </div>
    )
}

export default UserList