import React, { useState, useEffect } from 'react';
import './App.css';

import { SEASONS, LATEST_SEASON_ID } from './common/data';
import { usePrevious, getUpdateType } from './common/utilities';
import { useHistory, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import Stats from './components/Stats';
import Select from './components/Select';

/* Google Analytics */
const trackingId = 'UA-86116525-1'; // tracking ID
ReactGA.initialize(trackingId);
const history = createBrowserHistory();
history.listen((location) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App() {
  const [seasons, setSeasons] = useState(SEASONS);
  const [seasonId, setSeasonId] = useState();

  const handleChange = (evt) => {
    setSeasonId(evt.currentTarget.value);
  };

  const handleError = () => {
    const updatedSeasons = SEASONS.filter((season) => {
      return season.id !== LATEST_SEASON_ID;
    });
    setSeasons(updatedSeasons);
    setSeasonId(updatedSeasons[0]?.id);
  };

  const history = useHistory();
  const location = useLocation();
  const paramsPrevious = usePrevious(new URLSearchParams(location.search));
  const seasonIdPrevious = usePrevious(seasonId);

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
      history.replace({ search: params.toString() });
    }
  }, [paramsPrevious, history, seasonId, seasonIdPrevious]);

  return (
    <div className="App">
      <main className="App__main">
        <Stats seasonId={seasonId} handleError={handleError} />
      </main>

      <div className="App__actions">
        <Select onChange={handleChange} value={seasonId} id="SeasonId">
          {seasons.map((season) => {
            return (
              <option key={season.id} value={season.id}>
                {season.name}
              </option>
            );
          })}
        </Select>
        <label className="visually-hidden" htmlFor="SeasonId">
          Select season
        </label>
      </div>
    </div>
  );
}

export default App;
