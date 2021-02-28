import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FacebookProvider, Comments as FacebookComments } from 'react-facebook';

function Comments(props) {
  const { commentsActive, setCommentsActive } = props;
  const handleClick = () => {
    setCommentsActive(!commentsActive);
  };
  return (
    <div
      className="Comments"
      style={commentsActive ? { border: '2px solid red' } : {}}
    >
      <button onClick={handleClick}>Hide comments</button>
      <FacebookProvider appId="1825083474401640">
        <FacebookComments
          href="http://www.pksubbantracker.com/"
          orderBy="reverse_time"
          numPosts="8"
        />
      </FacebookProvider>
    </div>
  );
}

export default Comments;
