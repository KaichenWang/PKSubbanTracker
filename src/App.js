import React, { useState, useEffect } from 'react';
import './App.css';

import { SEASONS, LATEST_SEASON_ID } from './common/data';
import { usePrevious, getUpdateType } from './common/utilities';
import { useHistory, useLocation } from 'react-router-dom';
import Stats from './components/Stats.js';
import Comments from './components/Comments.js';

function App() {
  const [seasonId, setSeasonId] = useState();
  const [commentsActive, setCommentsActive] = useState();

  const handleChange = (evt) => {
    setSeasonId(evt.currentTarget.value);
  };

  const handleClick = () => {
    setCommentsActive(!commentsActive);
  };

  const history = useHistory();
  const location = useLocation();
  const paramsPrevious = usePrevious(new URLSearchParams(location.search));
  const seasonIdPrevious = usePrevious(seasonId);
  const commentsActivePrevious = usePrevious(commentsActive);

  useEffect(() => {
    /* Sync seasonId with param */
    const params = new URLSearchParams(history.location.search);
    const paramCurrent = params.get('season')
      ? params.get('season')
      : LATEST_SEASON_ID;
    const paramPrevious =
      typeof paramsPrevious === 'undefined'
        ? null
        : paramsPrevious.get('season')
        ? paramsPrevious.get('season')
        : LATEST_SEASON_ID;
    const stateCurrent = seasonId;
    const statePrevious =
      typeof seasonIdPrevious === 'undefined' ? seasonId : seasonIdPrevious;
    const type = getUpdateType(
      paramPrevious,
      paramCurrent,
      statePrevious,
      stateCurrent
    );

    if (type === 'state') {
      setSeasonId(paramCurrent);
    } else if (type === 'param') {
      if (stateCurrent === LATEST_SEASON_ID) {
        params.delete('season');
      } else {
        params.set('season', stateCurrent);
      }
      history.push({ search: params.toString() });
    }
  }, [paramsPrevious, history, seasonId, seasonIdPrevious]);

  useEffect(() => {
    /* Sync commentsActive with param */
    const params = new URLSearchParams(history.location.search);
    const paramCurrent = params.get('comments') === 'true';
    const paramPrevious = paramsPrevious
      ? paramsPrevious.get('comments') === 'true'
      : !paramCurrent;
    const stateCurrent = commentsActive;
    const statePrevious =
      typeof commentsActivePrevious === 'undefined'
        ? stateCurrent
        : commentsActivePrevious;
    const type = getUpdateType(
      paramPrevious,
      paramCurrent,
      statePrevious,
      stateCurrent
    );
    if (type === 'state') {
      setCommentsActive(paramCurrent);
    } else if (type === 'param') {
      if (stateCurrent) {
        params.set('comments', true);
      } else {
        params.delete('comments');
      }
      history.push({ search: params.toString() });
    }
  }, [paramsPrevious, history, commentsActive, commentsActivePrevious]);

  return (
    <div className="App">
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
      <Stats seasonId={seasonId} />
      <button onClick={handleClick}>Show comments</button>
      <Comments
        commentsActive={commentsActive}
        setCommentsActive={setCommentsActive}
      />
    </div>
  );
}

export default App;
