import React, {Component} from 'react'
import '../styles/Nav.css'

class Nav extends Component {
  render () {
    return (
    <ul>
      <li className='title'>Travel Quest</li>
      <li><a href="#logout">Log Out</a></li>
      <li><a href="#board">Leaderboard</a></li>
      <li><a href="#map">Map</a></li>
      <li><a href="#home">Home</a></li>

    </ul>
    )
  }

}

export default Nav