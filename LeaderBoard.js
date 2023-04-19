import React from 'react'
import './Leaderboard.css'
import Profile from './Profile';
import { Data } from './Database';
export default function Leaderboard() {

  const clickHandle = (e) => {
    console.log(e.target);
  }

  return (
    <div className='board main'>
      <h1 className='leaderboard'>Leaderboard</h1>

      <div className='duration'>
        <button onClick = {clickHandle} data-id = '1'>Today</button>
        <button onClick = {clickHandle} data-id = '7'>This Week</button>
        <button onClick = {clickHandle} data-id = '30'>This Month</button>
        <button onClick = {clickHandle} data-id = '0'>This Month</button>
      </div>

      <Profile Rankings = {Data}></Profile>
    </div>
  )
}