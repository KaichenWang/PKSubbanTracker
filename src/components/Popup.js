import React, { createContext, useContext, useEffect, createRef } from 'react';
import './Popup.css';

import { trapFocusHandler } from '../common/utilities';

function Popup(props) {
  const { children, isActive, handleClose, closeLabel } = props;

  const modalRef = createRef();
  const contentRef = createRef();
  const closeRef = createRef();

  // useEffect(() => {
  //   function keyListener(e) {
  //     const listener = keyListenersMap.get(e.keyCode);
  //     return listener && listener(e);
  //   }

  //   const handleTabKey = (e) => {
  //     const focusableModalElements = modalRef.current.querySelectorAll(
  //       'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  //     );
  //     const firstElement = focusableModalElements[0];
  //     const lastElement =
  //       focusableModalElements[focusableModalElements.length - 1];

  //     if (!e.shiftKey && document.activeElement !== firstElement) {
  //       firstElement.focus();
  //       return e.preventDefault();
  //     }

  //     if (e.shiftKey && document.activeElement !== lastElement) {
  //       lastElement.focus();
  //       e.preventDefault();
  //     }
  //   };

  //   const keyListenersMap = new Map([
  //     [27, handleClose],
  //     [9, handleTabKey],
  //   ]);

  //   if (isActive) {
  //     document.addEventListener('keydown', keyListener);
  //   } else {
  //     return () => document.removeEventListener('keydown', keyListener);
  //   }
  // }, [isActive, handleClose, modalRef]);

  useEffect(() => {
    if (!modalRef.current) return;
    const onKeydownHandler = trapFocusHandler(modalRef.current);
    if (isActive) {
      closeRef.current.focus();
      document.addEventListener('keydown', onKeydownHandler);
    } else {
      document.removeEventListener('keydown', onKeydownHandler);
    }
  }, [isActive, modalRef, closeRef]);

  return (
    <div
      className={`Popup ${isActive ? 'active' : ''}`}
      role={isActive ? 'dialog' : ''}
      aria-modal={isActive}
      aria-hidden={!isActive}
      tabIndex="-1"
      ref={modalRef}
    >
      <div className="Popup__header">
        <button aria-label={closeLabel} onClick={handleClose} ref={closeRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 329.26933 329"
            width="1.2rem"
            aria-hidden="true"
          >
            <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
          </svg>
          <span>{closeLabel}</span>
        </button>
      </div>
      <div className="Popup__content" ref={contentRef}>{children}</div>
    </div>
  );
}

export default Popup;
