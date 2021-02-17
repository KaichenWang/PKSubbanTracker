import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import { SEASONS } from './common/data';

import Stats from './components/Stats.js';
import Comments from './components/Comments.js';

function App() {
  const [seasonId, setSeasonId] = useState();
  const [showComments, setShowComments] = useState(false);

  const handleChange = (evt) => {
    setSeasonId(evt.currentTarget.value);
  };

  const handleClick = () => {
    setShowComments(!showComments);
  };

  return (
    <Router>
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
        <Stats seasonId={seasonId} setSeasonId={setSeasonId} />
        <button onClick={handleClick}>Show comments</button>
        <Comments showComments={showComments} setShowComments={setShowComments} />
      </div>
    </Router>
  );
}

export default App;
