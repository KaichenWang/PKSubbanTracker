import React, { useState, useEffect } from 'react';
import Card from './components/Card.js';
import { SEASONS, PLAYERS, TEAMS, CURRENT_SEASON_ID } from './common/data';
import './App.css';

function App() {
  const [seasonId, setSeasonId] = useState(CURRENT_SEASON_ID);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(PLAYERS);
  const [teams, setTeams] = useState(TEAMS);
  const playersIds = [8474056, 8470642];

  const handleChange = (evt) => {
    setSeasonId(evt.currentTarget.value);
  };

  useEffect(() => {
    const fetchPlayerData = async (playerId, seasonId) => {
      const response = await fetch(
        `https://statsapi.web.nhl.com/api/v1/people/${playerId}/stats?stats=yearByYear`
      );
      const json = await response.json();
      const allStats = json.stats[0].splits;
      const seasonStats = allStats.filter((stats) => {
        return stats.season === seasonId;
      });
      if (seasonStats.length < 1) return;
      const stats = seasonStats[0];
      return {
        id: seasonId,
        stats: {
          teamId: stats.team.id,
          games: stats.stat.games,
          goals: stats.stat.goals,
          assists: stats.stat.assists,
          points: stats.stat.points,
          plusMinus: stats.stat.plusMinus,
        },
      };
    };

    async function fetchTeamData(seasonId) {
      const response = await fetch(
        `https://statsapi.web.nhl.com/api/v1/standings?season=${seasonId}`
      );
      const json = await response.json();
      const teamData = {};
      json.records.forEach((divisionRecords) => {
        divisionRecords.teamRecords.forEach((teamRecord) => {
          const leagueRecord = teamRecord.leagueRecord;
          leagueRecord.points = teamRecord.points;
          teamData[teamRecord.team.id] = leagueRecord;
        });
      });
      return teamData;
    }

    async function setTeamData() {
      await Promise.all(
        playersIds.map(async (playerId) => {
          const stats = await fetchPlayerData(playerId, CURRENT_SEASON_ID);
          const updatedPlayers = {
            ...players,
          };
          updatedPlayers[playerId].stats[stats.id] = stats.stats;
          const total = updatedPlayers[playerId].stats['total'];
          updatedPlayers[playerId].stats['total'] = {
            teamId: null,
            games: total.games + stats.stats.games,
            goals: total.goals + stats.stats.goals,
            assists: total.assists + stats.stats.assists,
            points: total.points + stats.stats.points,
            plusMinus: total.plusMinus + stats.stats.plusMinus,
          };
          setPlayers(updatedPlayers);
        })
      );
      const teamData = await fetchTeamData(CURRENT_SEASON_ID);
      playersIds.forEach((playerId) => {
        const updatedTeams = {
          ...teams,
        };
        const teamId = players[playerId].stats[CURRENT_SEASON_ID].teamId;
        updatedTeams[teamId].stats[CURRENT_SEASON_ID] = {
          win: teamData[teamId].wins,
          loss: teamData[teamId].losses,
          overtimeLoss: teamData[teamId].ot,
          isPlayoff: false,
          round: null,
          points: teamData[teamId].points,
        };
        setTeams(updatedTeams);
      });
    }

    setTeamData();
  }, []);

  return (
    <div className="App">
      <header>
        <select onChange={handleChange}>
          {SEASONS.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </select>
      </header>
      {playersIds.map((playerId) => {
        const teamId = players[playerId].stats[seasonId]?.teamId;
        return (
          <Card
            key={playerId}
            player={players[playerId]}
            team={seasonId === 'total' ? null : teams[teamId]}
            seasonId={seasonId}
          ></Card>
        );
      })}
    </div>
  );
}

export default App;
