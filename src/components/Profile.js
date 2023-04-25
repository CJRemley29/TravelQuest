import React from 'react'

export default function Profile({Rankings}) {
  return (
    <div id = 'profile'>
      {Item(Rankings)}
    </div>
   )
}

function Item(data) {
  return (

    data.map((value,index) => (
      <div className='flex' key = {index}>
      <div className='item'>
        <img src = {value.img} alt =''></img>
        <div className='info'>
          <h3 className='name text-dark'>{value.name}</h3>
          <span>{value.score}</span>
        </div>
      </div>
    </div>
    ))
    
  )
}