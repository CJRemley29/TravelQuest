import React, { useState, useEffect, setState } from 'react';
import './LeaderBoardStyle.css'
import update from "./imgs/refresh.png"

const List = ({ children }) => (
  <div>{children}</div>
);

const ListItem = ({ rank, username, points }) => (
  <div className='gridLB'>
    <div className='grid-item-user-rank'>{rank}</div>
    <div className='grid-itemLB'>{username}</div>
    <div className='grid-itemLB'>{points}</div>
  </div>
);

const LeaderboardList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    onRefresh();
  }, [])

  const onRefresh = () => {
    const fetchBoard = async () => {
      const response = await fetch('http://localhost:4000/api/leaderboard', {
              method: 'GET',
              headers: {'Content-Type': 'application/json'}
          })
          const json = await response.json() 
          setUsers(json);
        
          if(!response.ok) {
              setIsLoading(false)
              setError(json.error)
          }
        }

      fetchBoard();
    }

  console.log(users);


  return (
    <div className='LB'>
      <img src={update} alt="refresh button" onClick={onRefresh}></img>
      <h2>Byte&#39;s Leaderboard</h2>
      <div className='grid-titleLB'>
        <div className='grid-item-rank'>Rank</div>
        <div className='grid-item-user'>User</div>
        <div className='grid-item-points'>Points</div>
        </div>
        <List>
        {users.map((user, index) => (
          <ListItem
            key={user.id}
            rank={index + 1}
            username={user.username}
            points={user.points}
          />
        ))}
      </List>
    </div>
    
  );
};

export default LeaderboardList;
