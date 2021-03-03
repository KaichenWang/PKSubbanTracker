import React from 'react';
import './Card.css';

import Loader from './Loader.js';

function Card(props) {
  const { player, team, seasonId } = props;
  const playerStats = player.stats[seasonId];
  const teamStats = team?.stats[seasonId];

  return (
    <div className="Card">
      <img
        src={`${process.env.PUBLIC_URL}/${player.id}_${team?.id}.jpg`}
        alt={`${player.firstName} ${player.lastName}`}
      ></img>
      <div className="Card__content">
        <h1 className="Card__title">
          {player.firstName} {player.lastName}
        </h1>
        {playerStats && (
          <table className="Card__table">
            <thead>
              <tr>
                <th>GP</th>
                <th>G</th>
                <th>A</th>
                <th>P</th>
                <th>+/-</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{playerStats.games}</td>
                <td>{playerStats.goals}</td>
                <td>{playerStats.assists}</td>
                <td>{playerStats.points}</td>
                <td>{playerStats.plusMinus}</td>
              </tr>
            </tbody>
          </table>
        )}
        {!playerStats && <Loader />}
      </div>
      {seasonId !== 'total' && teamStats && (
        <div className="Card__bubble">
          <span>{team.name}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <span>{teamStats.win}-</span>
            <span>{teamStats.loss}</span>
            {teamStats.type === 'league' && (
              <span>-{teamStats.overtimeLoss}</span>
            )}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {teamStats.type === 'league' && (
            <span>{teamStats.points} Points</span>
          )}
          {teamStats.type === 'playoff' && <span>Round {teamStats.round}</span>}
        </div>
      )}
    </div>
  );
}

export default Card;
