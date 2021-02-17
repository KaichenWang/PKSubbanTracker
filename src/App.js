import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { LATEST_SEASON_ID } from './common/data';

import Stats from './components/Stats.js';

function App() {
  const [seasonId, setSeasonId] = useState(LATEST_SEASON_ID);

  return (
    <Router>
      <div className="App">
        <Stats seasonId={seasonId} setSeasonId={setSeasonId} />
      </div>
    </Router>
  );
}

export default App;
