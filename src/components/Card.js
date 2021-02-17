import React from 'react';
import './Card.css';

function Card(props) {
  const { player, team, seasonId } = props;
  const playerStats = player.stats[seasonId];
  const teamStats = team ? team.stats[seasonId] : null;

  return (
    <div className="card">
      <h1>
        {player.firstName} {player.lastName}
      </h1>
      {seasonId !== 'total' && (
        <div>
          {teamStats && (
            <React.Fragment>
              <h2>
                {team.location} {team.name}
              </h2>
              <span>{teamStats.win}-</span>
              <span>{teamStats.loss}</span>
              {teamStats.type === 'league' && (
                <span>-{teamStats.overtimeLoss}</span>
              )}
              {teamStats.type === 'league' && <p>Points: {teamStats.points}</p>}
              {teamStats.type === 'playoff' && <p>Round: {teamStats.round}</p>}
            </React.Fragment>
          )}
          {!teamStats && <p>Loading...</p>}
        </div>
      )}
      {playerStats && (
        <table>
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
      {!playerStats && <p>Loading...</p>}
    </div>
  );
}

export default Card;
