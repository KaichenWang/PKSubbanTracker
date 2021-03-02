import React, { useState, useEffect } from 'react';

import { PLAYERS, TEAMS, LATEST_SEASON_ID, PLAYERS_ID } from '../common/data';
import {
  fetchPlayerData,
  fetchTeamsData,
  updatePlayerStats,
  updateTeamStats,
} from '../common/utilities';

import Card from './Card.js';

import './Stats.css';

function Stats(props) {
  const { seasonId } = props;

  const [players, setPlayers] = useState(PLAYERS);
  const [teams, setTeams] = useState(TEAMS);

  useEffect(() => {
    /* Fetch and set latest player and team data from server */
    async function setData() {
      const updatedPlayers = [];
      const updatedTeams = [];
      await Promise.all(
        players.map(async (player) => {
          updatedPlayers.push(
            updatePlayerStats(
              player,
              await fetchPlayerData(player.id, LATEST_SEASON_ID)
            )
          );
        })
      );
      setPlayers(updatedPlayers);
      const teamData = await fetchTeamsData(LATEST_SEASON_ID);
      teams.forEach((team) => {
        updatedTeams.push(
          updateTeamStats(team, {
            id: LATEST_SEASON_ID,
            stats: teamData[team.id],
          })
        );
      });
      setTeams(updatedTeams);
    }
    setData();
  }, []);

  return (
    <div className="Stats">
      {players.map((player) => {
        return (
          <div key={player.id} className="Stats__item">
            <Card              
              player={player}
              team={teams.find(
                (team) => team.id === player.stats[seasonId]?.teamId
              )}
              seasonId={seasonId}
            ></Card>
          </div>
        );
      })}
    </div>
  );
}

export default Stats;
