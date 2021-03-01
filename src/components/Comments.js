import React from 'react';
import { FacebookProvider, Comments as FacebookComments } from 'react-facebook';
import './Comments.css';

import Popup from './Popup.js';

function Comments(props) {
  const { commentsActive, setCommentsActive } = props;
  const handleClose = () => {
    setCommentsActive(!commentsActive);
  };

  return (
    <Popup closeLabel={'Close discussion'} handleClose={handleClose} isActive={commentsActive}>
      <div className="Comments">
        <FacebookProvider appId="1825083474401640">
          <FacebookComments
            href="http://www.pksubbantracker.com/"
            orderBy="reverse_time"
            numPosts="8"
            width="100%"
          />
        </FacebookProvider>
      </div>
    </Popup>
  );
}

export default Comments;
