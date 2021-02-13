import './Card.css';

function Card(props) {
  const playerStats = props.player.stats[props.seasonId];
  const teamStats = props.team ? props.team?.stats[props.seasonId] : null;
  return (
    <div className="card">
      <h1>
        {props.player.firstName} {props.player.lastName}
      </h1>
      {props.team && teamStats && (
        <div>
          <h2>
            {props.team.location} {props.team.name}
          </h2>
          <span>{teamStats.win}-</span>
          <span>{teamStats.loss}</span>
          {!teamStats.isPlayoff && <span>-{teamStats.overtimeLoss}</span>}
          {!teamStats.isPlayoff && <p>Points: {teamStats.points}</p>}
          {teamStats.isPlayoff && <p>Round: {teamStats.round}</p>}
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
    </div>
  );
}

export default Card;
