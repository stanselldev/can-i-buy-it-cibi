import React from 'react'
import { NavLink } from 'react-router-dom'

export default class Navigation extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/">Calendar</NavLink>
        <br />
        <NavLink to="/profile">Profile</NavLink>
      </div>
    )
  }
}