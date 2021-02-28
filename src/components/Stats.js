import React, { useState, useEffect } from 'react';

import { PLAYERS, TEAMS, LATEST_SEASON_ID, PLAYERS_ID } from '../common/data';
import {
  fetchPlayerData,
  fetchTeamsData,
  updatePlayerStats,
  updateTeamStats,
} from '../common/utilities';

import Card from './Card.js';

function Stats(props) {
  const { seasonId } = props;

  const [players, setPlayers] = useState(PLAYERS);
  const [teams, setTeams] = useState(TEAMS);

  useEffect(() => {
    /* Fetch and set latest player and team data from server */
    async function setData() {
      const updatedPlayers = Object.assign({}, PLAYERS);
      const updatedTeams = Object.assign({}, TEAMS);
      await Promise.all(
        PLAYERS_ID.map(async (playerId) => {
          updatedPlayers[playerId] = updatePlayerStats(
            updatedPlayers[playerId],
            await fetchPlayerData(playerId, LATEST_SEASON_ID)
          );
        })
      );
      setPlayers(updatedPlayers);
      const teamData = await fetchTeamsData(LATEST_SEASON_ID);
      PLAYERS_ID.forEach((playerId) => {
        const teamId = updatedPlayers[playerId].stats[LATEST_SEASON_ID].teamId;
        updatedTeams[teamId] = updateTeamStats(updatedTeams[teamId], {
          id: LATEST_SEASON_ID,
          stats: teamData[teamId],
        });
      });
      setTeams(updatedTeams);
    }
    setData();
  }, []);

  return (
    <div className="Stats">
      {PLAYERS_ID.map((playerId) => {
        const player = players[playerId];
        return (
          <Card
            key={playerId}
            player={player}
            team={
              seasonId === 'total' || !player.stats[seasonId]
                ? null
                : teams[player.stats[seasonId].teamId]
            }
            seasonId={seasonId}
          ></Card>
        );
      })}
    </div>
  );
}

export default Stats;
