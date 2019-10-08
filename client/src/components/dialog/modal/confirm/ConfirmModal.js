import React, { useEffect } from 'react';

import { useKeyPress, useLockBodyScroll } from '../../../../hooks/Hooks';

import 'materialize-css/dist/css/materialize.min.css';
import '../Modal.css';

const ConfirmDialog = ({
  title,
  content,
  dataID,
  onClose,
  action1,
  action2
}) => {
  const escPress = useKeyPress('Escape');

  useEffect(() => {
    if (escPress) {
      onClose();
    }
    // eslint-disable-next-line
  }, [escPress]);

  // Hook to lock scrolling
  useLockBodyScroll();

  return (
    <div className='modalEx-overlay'>
      <div className='modalEx'>
        <div className='modal-content'>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
        <div className='modal-footer'>
          {action2.visible && (
            <a
              href='#!'
              className='waves-effect waves-blue btn-flat'
              onClick={() => action2.handle()}
            >
              {action2.title}
            </a>
          )}
          {action1.visible && (
            <a
              href='#!'
              className='waves-effect waves-blue btn-flat'
              onClick={() => action1.handle(dataID)}
            >
              {action1.title}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
