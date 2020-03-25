import React from "react"
import {styled} from "styled-components"

function UserCard(props) {
    const {user} = props

    return (
        <div>
            <h2>User Overview</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}

export default UserCard