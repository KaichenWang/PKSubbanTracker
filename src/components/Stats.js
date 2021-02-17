import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import {
  SEASONS,
  PLAYERS,
  TEAMS,
  LATEST_SEASON_ID,
  PLAYERS_ID,
} from '../common/data';
import {
  fetchPlayerData,
  fetchTeamsData,
  updatePlayerStats,
  updateTeamStats,
  usePrevious,
} from '../common/utilities';

import Card from './Card.js';

function Stats() {
  const history = useHistory();
  const location = useLocation();

  const [seasonId, setSeasonId] = useState();
  const [players, setPlayers] = useState(PLAYERS);
  const [teams, setTeams] = useState(TEAMS);

  const handleChange = (evt) => {
    setSeasonId(evt.currentTarget.value);
  };

  const seasonIdPrevious = usePrevious(seasonId);
  const paramPrevious = usePrevious(
    new URLSearchParams(location.search).get('season')
  );

  useEffect(() => {
    /* Set param in url when season is selected */
    if (seasonId === seasonIdPrevious) return;
    const params = new URLSearchParams(location.search);
    let param = params.get('season');
    param = param ? param : LATEST_SEASON_ID;
    if (seasonId === param) return;
    params.delete('season');
    if (seasonId !== LATEST_SEASON_ID) {
      params.append('season', seasonId);
    }
    history.push({ search: params.toString() });
  }, [seasonId, seasonIdPrevious, location, history]);

  useEffect(() => {
    /* Use url param to set selected season */
    const param = new URLSearchParams(location.search).get('season');
    if (param === paramPrevious) return;
    if (param) {
      const match = SEASONS.filter((season) => {
        return season.id === param;
      });
      if (match.length > 0) {
        setSeasonId(param);
        return;
      }
    }
    setSeasonId(LATEST_SEASON_ID);
  }, [location, paramPrevious]);

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
      <header>
        <select onChange={handleChange} value={seasonId}>
          {SEASONS.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </select>
      </header>
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
